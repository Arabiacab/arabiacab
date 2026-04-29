/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.arabiacab.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/booking/success'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://www.arabiacab.com/server-sitemap.xml',
    ],
  },
}
