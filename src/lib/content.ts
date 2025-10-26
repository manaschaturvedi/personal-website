import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// Type definitions for gray-matter
interface MatterResult {
  data: Record<string, unknown>
  content: string
}

const contentDirectory = path.join(process.cwd(), 'content')

export interface ContentMetadata {
  title: string
  description?: string
  date?: string
  author?: string
  tags?: string[]
  readTime?: string
  featured?: boolean
  hero?: {
    title: string
    subtitle: string
    description: string
    cta?: {
      text: string
      href: string
    }
  }
}

export interface ContentItem {
  slug: string
  metadata: ContentMetadata
  content: string
}

export interface BlogPost extends ContentItem {
  metadata: ContentMetadata & {
    date: string
    author: string
    tags: string[]
    readTime: string
    featured: boolean
  }
}

// Get all content from a specific directory
export function getContentFromDirectory(directory: string): ContentItem[] {
  const fullPath = path.join(contentDirectory, directory)
  
  if (!fs.existsSync(fullPath)) {
    return []
  }

  const fileNames = fs.readdirSync(fullPath)
  const allContent = fileNames
    .filter(name => name.endsWith('.md'))
    .map(fileName => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(contentDirectory, directory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents) as MatterResult

      return {
        slug,
        metadata: data as unknown as ContentMetadata,
        content
      }
    })

  return allContent
}

// Get a specific content item by slug
export function getContentBySlug(directory: string, slug: string): ContentItem | null {
  const fullPath = path.join(contentDirectory, directory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents) as MatterResult

  return {
    slug,
    metadata: data as unknown as ContentMetadata,
    content
  }
}

// Get all blog posts
export function getAllBlogPosts(): BlogPost[] {
  const posts = getContentFromDirectory('blog')
  
  return posts
    .filter(post => post.metadata.date) // Only include posts with dates
    .map(post => ({
      ...post,
      metadata: {
        ...post.metadata,
        date: post.metadata.date!,
        author: post.metadata.author || 'Anonymous',
        tags: post.metadata.tags || [],
        readTime: post.metadata.readTime || '5 min read',
        featured: post.metadata.featured || false
      }
    }))
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
}

// Get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.metadata.featured)
}

// Get recent blog posts
export function getRecentBlogPosts(limit: number = 3): BlogPost[] {
  return getAllBlogPosts().slice(0, limit)
}

// Get blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | null {
  const post = getContentBySlug('blog', slug)
  
  if (!post || !post.metadata.date) {
    return null
  }

  return {
    ...post,
    metadata: {
      ...post.metadata,
      date: post.metadata.date,
      author: post.metadata.author || 'Anonymous',
      tags: post.metadata.tags || [],
      readTime: post.metadata.readTime || '5 min read',
      featured: post.metadata.featured || false
    }
  }
}

// Get page content
export function getPageContent(slug: string): ContentItem | null {
  return getContentBySlug('pages', slug)
}

// Get all page slugs for static generation
export function getAllPageSlugs(): string[] {
  const pages = getContentFromDirectory('pages')
  return pages.map(page => page.slug)
}

// Get all blog post slugs for static generation
export function getAllBlogPostSlugs(): string[] {
  const posts = getAllBlogPosts()
  return posts.map(post => post.slug)
}
