import fs from "fs"
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"

function localDriveApiPlugin(): Plugin {
  return {
    name: "local-drive-api",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith("/api/projects")) {
          try {
            const base = path.resolve(__dirname, "./public/test-drive")
            if (!fs.existsSync(base)) {
              res.setHeader("Content-Type", "application/json")
              res.end(JSON.stringify({ mode: "local", categories: [], projects: [] }))
              return
            }

            const cleanName = (raw: string) => raw.replace(/^[0-9]+[\s_–-]+/, "").trim()
            const getOrder = (raw: string) => {
              const match = raw.match(/^([0-9]+)/)
              return match ? parseInt(match[1], 10) : 999
            }
            const isImage = (f: string) => /\.(jpe?g|png|webp|avif)$/i.test(f)

            const categoryDirs = fs.readdirSync(base, { withFileTypes: true })
              .filter(d => d.isDirectory() && !d.name.startsWith("_") && !d.name.toLowerCase().includes("archief"))
              .sort((a, b) => getOrder(a.name) - getOrder(b.name))

            const categories = categoryDirs.map(d => cleanName(d.name))
            const projects: any[] = []

            categoryDirs.forEach((catDir, catIndex) => {
              const catPath = path.join(base, catDir.name)
              const categoryName = cleanName(catDir.name)
              const items = fs.readdirSync(catPath, { withFileTypes: true })
                .filter(i => !i.name.startsWith("_"))
                .sort((a, b) => getOrder(a.name) - getOrder(b.name))

              items.forEach((item) => {
                const itemPath = path.join(catPath, item.name)
                const order = (catIndex + 1) * 100 + getOrder(item.name)

                if (item.isFile() && isImage(item.name)) {
                  const ext = path.extname(item.name)
                  const title = cleanName(path.basename(item.name, ext))
                  const url = `/test-drive/${encodeURIComponent(catDir.name)}/${encodeURIComponent(item.name)}`
                  projects.push({
                    id: `local-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                    title,
                    category: categoryName,
                    coverImage: url,
                    images: [url],
                    description: "Handgemaakt in het atelier te Wilsele. Maatwerk in massief hout en staal.",
                    order
                  })
                } else if (item.isDirectory()) {
                  const title = cleanName(item.name)
                  const subFiles = fs.readdirSync(itemPath)
                    .filter(f => !f.startsWith("_"))
                    .sort()

                  const imageFiles = subFiles.filter(isImage)
                  if (imageFiles.length > 0) {
                    const urls = imageFiles.map(img =>
                      `/test-drive/${encodeURIComponent(catDir.name)}/${encodeURIComponent(item.name)}/${encodeURIComponent(img)}`
                    )
                    let description = "Handgemaakt in het atelier te Wilsele. Maatwerk in massief hout en staal."
                    if (subFiles.includes("info.txt")) {
                      description = fs.readFileSync(path.join(itemPath, "info.txt"), "utf8").trim()
                    }

                    projects.push({
                      id: `local-${item.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                      title,
                      category: categoryName,
                      coverImage: urls[0],
                      images: urls,
                      description,
                      order
                    })
                  }
                }
              })
            })

            projects.sort((a, b) => a.order - b.order)

            res.setHeader("Content-Type", "application/json")
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.end(JSON.stringify({
              mode: "local",
              categories,
              projects,
              lastUpdated: new Date().toISOString()
            }))
            return
          } catch (err: any) {
            res.statusCode = 500
            res.setHeader("Content-Type", "application/json")
            res.end(JSON.stringify({ error: err.message }))
            return
          }
        }
        next()
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), localDriveApiPlugin()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
