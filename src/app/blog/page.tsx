import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/content'

export default function Blog() {
  const blogPosts = getAllBlogPosts()
  
  // Extract unique tags from all posts
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.metadata.tags))
  ).sort()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4">blog</h1>
          <p className="text-xl text-gray-600">Ideas. Small. Big. Mine.</p>
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {allTags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Posts List */}
        <div className="space-y-2">
          {blogPosts.map((post) => (
            <div key={post.slug} className="flex items-center justify-between py-2 hover:bg-gray-50 px-2 rounded transition-colors">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500 w-24">{post.metadata.date}</span>
                <span className="text-gray-400">-</span>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {post.metadata.title}
                </Link>
                {post.metadata.featured && (
                  <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                    featured
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Back to home link */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
          >
            - back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
