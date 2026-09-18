// Cloudflare Pages Function: /api/projects
// Seamlessly switches between 'google' (live Google Drive API v3) and 'local' (test-drive offline mode)

interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL?: string
  GOOGLE_PRIVATE_KEY?: string
  GOOGLE_DRIVE_FOLDER_ID?: string
  DRIVE_MODE?: string
  ASSETS: {
    fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
  }
}

interface DriveProject {
  id: string
  title: string
  category: string
  coverImage: string
  images: string[]
  description: string
  order: number
}

interface DriveGalleryResponse {
  mode: 'local' | 'google'
  categories: string[]
  projects: DriveProject[]
  lastUpdated: string
}

function cleanName(raw: string): string {
  return raw.replace(/^[0-9]+[\s_–-]+/, '').trim()
}

function getOrder(raw: string): number {
  const match = raw.match(/^([0-9]+)/)
  return match ? parseInt(match[1], 10) : 999
}

// Convert PEM PKCS8 key to binary ArrayBuffer for Web Crypto
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const cleanKey = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/-----BEGIN RSA PRIVATE KEY-----/, '')
    .replace(/-----END RSA PRIVATE KEY-----/, '')
    .replace(/\\n/g, '')
    .replace(/\s+/g, '')

  const binaryString = atob(cleanKey)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes.buffer
}

function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '')
}

function arrayBufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return base64UrlEncode(binary)
}

// Mint a Google OAuth token via native Web Crypto (zero NPM dependencies)
async function getGoogleAccessToken(email: string, privateKeyPem: string): Promise<string> {
  const header = {
    alg: 'RS256',
    typ: 'JWT',
  }

  const now = Math.floor(Date.now() / 1000)
  const claimSet = {
    iss: email,
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }

  const encodedHeader = base64UrlEncode(JSON.stringify(header))
  const encodedClaimSet = base64UrlEncode(JSON.stringify(claimSet))
  const unsignedToken = `${encodedHeader}.${encodedClaimSet}`

  const binaryKey = pemToArrayBuffer(privateKeyPem)
  const key = await crypto.subtle.importKey(
    'pkcs8',
    binaryKey,
    { name: 'RSASSA-PKKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const encoder = new TextEncoder()
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    encoder.encode(unsignedToken)
  )

  const signedJwt = `${unsignedToken}.${arrayBufferToBase64Url(signature)}`

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: signedJwt,
    }),
  })

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text()
    throw new Error(`Google OAuth failed: ${tokenResponse.status} - ${errorText}`)
  }

  const tokenData = (await tokenResponse.json()) as { access_token: string }
  return tokenData.access_token
}

// Fetch dynamic portfolio structure from Google Drive v3 REST API
async function fetchFromGoogleDrive(
  token: string,
  rootFolderId: string
): Promise<DriveGalleryResponse> {
  const headers = { Authorization: `Bearer ${token}` }

  // 1. Fetch category subfolders inside Root Folder
  const foldersQuery = encodeURIComponent(
    `'${rootFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and trashed = false`
  )
  const foldersRes = await fetch(
    `https://www.googleapis.com/drive/v3/files?q=${foldersQuery}&fields=files(id,name)&orderBy=name`,
    { headers }
  )

  if (!foldersRes.ok) {
    throw new Error(`Failed to list category folders: ${await foldersRes.text()}`)
  }

  const foldersData = (await foldersRes.json()) as { files: Array<{ id: string; name: string }> }
  const categoryFolders = foldersData.files
    .filter((f) => !f.name.startsWith('_') && !f.name.toLowerCase().includes('archief'))
    .sort((a, b) => getOrder(a.name) - getOrder(b.name))

  const categories = categoryFolders.map((f) => cleanName(f.name))
  const projects: DriveProject[] = []

  // 2. Fetch items for each category
  for (let cIdx = 0; cIdx < categoryFolders.length; cIdx++) {
    const cat = categoryFolders[cIdx]
    const categoryName = cleanName(cat.name)

    const itemsQuery = encodeURIComponent(`'${cat.id}' in parents and trashed = false`)
    const itemsRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=${itemsQuery}&fields=files(id,name,mimeType,description,createdTime)&orderBy=name`,
      { headers }
    )

    if (!itemsRes.ok) continue

    const itemsData = (await itemsRes.json()) as {
      files: Array<{ id: string; name: string; mimeType: string; description?: string }>
    }

    const items = itemsData.files
      .filter((item) => !item.name.startsWith('_'))
      .sort((a, b) => getOrder(a.name) - getOrder(b.name))

    for (const item of items) {
      const order = (cIdx + 1) * 100 + getOrder(item.name)

      if (item.mimeType.startsWith('image/')) {
        // Single image project
        const title = cleanName(item.name.replace(/\.[^/.]+$/, ''))
        const cdnUrl = `https://lh3.googleusercontent.com/d/${item.id}=s1600`

        projects.push({
          id: `gdrive-${item.id}`,
          title,
          category: categoryName,
          coverImage: cdnUrl,
          images: [cdnUrl],
          description:
            item.description ||
            'Handgemaakt in het atelier te Wilsele. Maatwerk in massief hout en staal.',
          order,
        })
      } else if (item.mimeType === 'application/vnd.google-apps.folder') {
        // Multi-image project folder
        const subFilesQuery = encodeURIComponent(`'${item.id}' in parents and trashed = false`)
        const subRes = await fetch(
          `https://www.googleapis.com/drive/v3/files?q=${subFilesQuery}&fields=files(id,name,mimeType,description)&orderBy=name`,
          { headers }
        )

        if (!subRes.ok) continue
        const subData = (await subRes.json()) as {
          files: Array<{ id: string; name: string; mimeType: string; description?: string }>
        }

        const imageFiles = subData.files.filter(
          (sf) => sf.mimeType.startsWith('image/') && !sf.name.startsWith('_')
        )

        if (imageFiles.length > 0) {
          const title = cleanName(item.name)
          const urls = imageFiles.map((sf) => `https://lh3.googleusercontent.com/d/${sf.id}=s1600`)

          projects.push({
            id: `gdrive-${item.id}`,
            title,
            category: categoryName,
            coverImage: urls[0],
            images: urls,
            description:
              item.description ||
              'Handgemaakt in het atelier te Wilsele. Maatwerk in massief hout en staal.',
            order,
          })
        }
      }
    }
  }

  projects.sort((a, b) => a.order - b.order)

  return {
    mode: 'google',
    categories,
    projects,
    lastUpdated: new Date().toISOString(),
  }
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context

  const email = env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const privateKey = env.GOOGLE_PRIVATE_KEY
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID
  const mode = env.DRIVE_MODE || 'auto'

  const hasGoogleCreds = email && privateKey && folderId && mode !== 'local'

  if (hasGoogleCreds) {
    try {
      // 1. Try cache
      const cacheUrl = new URL(request.url)
      cacheUrl.searchParams.delete('refresh')
      const cacheKey = new Request(cacheUrl.toString(), request)
      const cache = caches.default
      const cachedRes = await cache.match(cacheKey)

      const forceRefresh = new URL(request.url).searchParams.has('refresh')
      if (cachedRes && !forceRefresh) {
        return cachedRes
      }

      // 2. Fetch from Google Drive
      const token = await getGoogleAccessToken(email, privateKey)
      const data = await fetchFromGoogleDrive(token, folderId)

      const response = new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=86400',
        },
      })

      // Store in edge cache
      context.waitUntil(cache.put(cacheKey, response.clone()))
      return response
    } catch (err: any) {
      // Gracefully fall back to local test data if Google API fails
      console.error('Google Drive fetch failed, falling back to local:', err)
    }
  }

  // Fallback: Read local static test-drive data
  try {
    const localDataUrl = new URL('/test-drive/portfolio-data.json', request.url)
    const localRes = await env.ASSETS.fetch(localDataUrl)
    if (localRes.ok) {
      const data = (await localRes.json()) as DriveGalleryResponse
      data.mode = 'local'
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=60',
        },
      })
    }
  } catch (localErr: any) {
    console.error('Failed to load local test data:', localErr)
  }

  // Final emergency response
  return new Response(
    JSON.stringify({
      mode: 'local',
      categories: ['Tafels', 'Kasten', 'Interieur'],
      projects: [],
      error: 'No projects loaded yet',
    }),
    {
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
