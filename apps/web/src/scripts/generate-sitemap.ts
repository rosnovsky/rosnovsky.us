import {SanityClient} from '@/lib/Sanity';
import fs from 'fs';

import prettier from 'prettier';
export async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js')
  
  const pages = await SanityClient.fetch(`*[_type == "page"]  {..., "slug": slug.current}`)

  const posts = await SanityClient.fetch(`*[_type == "post"] {..., "slug": slug.current}`)

  const books = await SanityClient.fetch(`*[_type == "book"] {..., "slug": slug.current}`)

  const authors = await SanityClient.fetch(`*[_type == "author"] {..., "slug": slug.current}`)

  const publishers = await SanityClient.fetch(`*[_type == "publisher"] {..., "slug": slug.current}`)
  
  const genre = await SanityClient.fetch(`*[_type == "genre"] {..., "slug": slug.current}`)

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://rosnovsky.us/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>
    ${pages
      
    .map((page) => {
      return `

        <url>
          <loc>https://rosnovsky.us/${page.slug}</loc>
          <lastmod>${new Date(page._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
    })
    
    .join('')}
    ${posts
    .map((post) => {
      return `
        <url>
          <loc>https://rosnovsky.us/blog/${post.slug}</loc>
          <lastmod>${new Date(post._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
    })
    .join('')}
    ${books
    .map((book) => {
      return `
        <url>
          <loc>https://rosnovsky.us/library/${book.slug}</loc>
          <lastmod>${new Date(book._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
    })
    .join('')}
    ${authors
    .map((author) => {
      return `
        <url>
          <loc>https://rosnovsky.us/library/author/${author.slug}</loc>
          <lastmod>${new Date(author._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
    })
    .join('')}
    ${publishers
    .map((publisher) => {
      return `
        <url>
          <loc>https://rosnovsky.us/library/publisher/${publisher.slug}</loc>
          <lastmod>${new Date(publisher._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `
    })
    .join('')}
    ${genre
    .map((genre) => {
      return `
        <url>
          <loc>https://rosnovsky.us/library/genre/${genre.slug}</loc>
          <lastmod>${new Date(genre._updatedAt).toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>

      `
    })
    .join('')}
  </urlset>
  `
  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })
  return fs.writeFileSync('public/sitemap.xml', formatted)
}
