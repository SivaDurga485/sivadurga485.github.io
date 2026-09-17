/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Static export for GitHub Pages. Safe here: no API routes, no middleware,
   * no server-side data fetching — every route already prerendered static. */
  output: 'export',

  /* The Next image optimizer needs a server; there is none on Pages. The site
   * uses no next/image today, but this keeps a future <Image> from breaking
   * the export. */
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: 'https', hostname: '**' }],
  },

  /* Deployed to https://sivadurga485.github.io/ — a GitHub *user* site, served
   * from the domain root, so no basePath/assetPrefix is needed. If this ever
   * moves to a project repo, both must be set to '/<repo-name>'. */
}

module.exports = nextConfig
