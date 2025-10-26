import Link from 'next/link'
import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/content'
import { processMarkdownSync } from '@/lib/markdown'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export default function BlogPost({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Back to blog link */}
        <div className="mb-8">
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            ← back to blog
          </Link>
        </div>

        {/* Post Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
            {metadata.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
            <span>{metadata.date}</span>
            <span>•</span>
            <span>{metadata.author}</span>
            <span>•</span>
            <span>{metadata.readTime}</span>
            {metadata.featured && (
              <>
                <span>•</span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  featured
                </span>
              </>
            )}
          </div>

          {metadata.description && (
            <p className="text-xl text-gray-700 mb-6">
              {metadata.description}
            </p>
          )}

          {metadata.tags && metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {metadata.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="max-w-3xl mx-auto space-y-4 text-lg text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: processMarkdownSync(content) }} />
        </div>

        {/* Post Footer */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link 
              href="/blog"
              className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              ← back to blog
            </Link>
            
            <div className="text-sm text-gray-500">
              Published on {metadata.date}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

