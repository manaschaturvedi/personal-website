import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

/**
 * Process markdown content and convert it to HTML
 * @param markdown - The markdown content to process
 * @returns HTML string
 */
export async function processMarkdown(markdown: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown support
    .use(remarkHtml) // Convert to HTML
    .process(markdown)

  return result.toString()
}

/**
 * Synchronous version of processMarkdown for use in components
 * Note: This is a simplified version that handles basic markdown syntax
 * For full markdown processing, use the async version
 */
export function processMarkdownSync(markdown: string): string {
  // Basic markdown processing for common syntax
  let html = markdown

  // Headers
  html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mb-2 mt-4">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mb-3 mt-6">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mb-4 mt-8">$1</h1>')

  // Bold text
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')

  // Italic text
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-black hover:text-gray-600 underline">$1</a>')

  // Unordered lists
  html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
  html = html.replace(/(<li class="ml-4 mb-1">[^<]*<\/li>)/g, '<ul class="list-disc ml-6 mb-3">$1</ul>')

  // Ordered lists
  html = html.replace(/^\d+\. (.*$)/gim, '<li class="ml-4 mb-1">$1</li>')
  html = html.replace(/(<li class="ml-4 mb-1">[^<]*<\/li>)/g, '<ol class="list-decimal ml-6 mb-3">$1</ol>')

  // Paragraphs - reduce margin and handle multiple paragraphs properly
  html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li)(.*$)/gim, '<p class="mb-3">$1</p>')

  // Remove excessive line breaks and clean up
  html = html.replace(/\n\n+/g, '\n')
  html = html.replace(/\n/g, ' ')

  return html
}

