import { getPageContent } from '@/lib/content'
import { processMarkdownSync } from '@/lib/markdown'
import Image from 'next/image'

export default function Home() {
  const homeContent = getPageContent('home')

  if (!homeContent) {
    return <div>Content not found</div>
  }

  const { metadata, content } = homeContent

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-20">
        {/* Profile Picture */}
        <div className="text-center mb-8">
          <div className="inline-block">
            <div className="w-80 h-80 rounded-full overflow-hidden bg-gray-200 mx-auto mb-6">
              <Image
                src="/profile.jpg"
                alt="Profile picture"
                width={320}
                height={320}
                className="w-full h-full object-cover"
                priority
              />
            </div>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-8">
            {metadata.hero?.title || metadata.title}
          </h1>
        </div>

        {/* Content from markdown */}
        <div className="max-w-3xl mx-auto space-y-6 text-lg text-gray-700 leading-relaxed">
          <div dangerouslySetInnerHTML={{ __html: processMarkdownSync(content) }} />
        </div>
      </div>
    </div>
  )
}
