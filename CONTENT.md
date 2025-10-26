# Content Management System

This website uses a markdown-based content management system where all content is stored in separate markdown files and the HTML pages are generated from these files.

## Content Structure

```
content/
├── pages/           # Static pages content
│   ├── home.md      # Homepage content
│   └── about.md     # About page content
└── blog/           # Blog posts
    ├── getting-started-with-nextjs.md
    └── building-modern-web-apps.md
```

## How to Add Content

### Adding a New Page

1. Create a new markdown file in `content/pages/`
2. Add frontmatter with metadata:

```markdown
---
title: "Page Title"
description: "Page description for SEO"
---

# Your content here

This is the main content of your page.
```

### Adding a New Blog Post

1. Create a new markdown file in `content/blog/`
2. Add frontmatter with required metadata:

```markdown
---
title: "Blog Post Title"
description: "Brief description of the post"
date: "2024-01-15"
author: "Your Name"
tags: ["tag1", "tag2", "tag3"]
readTime: "5 min read"
featured: false
---

# Your blog post content

Write your blog post content here using markdown.
```

### Frontmatter Fields

#### For Pages:
- `title` (required): Page title
- `description` (optional): Page description
- `hero` (optional): Hero section data
  - `title`: Hero title
  - `subtitle`: Hero subtitle
  - `description`: Hero description
  - `cta`: Call-to-action button
    - `text`: Button text
    - `href`: Button link

#### For Blog Posts:
- `title` (required): Post title
- `description` (optional): Post description
- `date` (required): Publication date (YYYY-MM-DD format)
- `author` (optional): Author name (defaults to "Anonymous")
- `tags` (optional): Array of tags
- `readTime` (optional): Estimated reading time
- `featured` (optional): Whether the post is featured (boolean)

## Content Features

### Automatic Features
- **Blog Post Listing**: All blog posts are automatically listed on `/blog`
- **Recent Posts**: Recent posts are shown on the homepage
- **Tag System**: Tags are automatically extracted and displayed
- **Featured Posts**: Featured posts are highlighted
- **SEO**: Meta descriptions and titles are automatically used

### Content Processing
- Markdown content is processed and rendered as HTML
- Line breaks are preserved
- Frontmatter is parsed and made available to components

## File Naming Convention

- **Pages**: Use kebab-case (e.g., `about.md`, `contact.md`)
- **Blog Posts**: Use kebab-case with descriptive names (e.g., `getting-started-with-nextjs.md`)

## Development

The content system is built with:
- **gray-matter**: For parsing frontmatter
- **fs**: For reading files from the content directory
- **TypeScript**: For type safety

## Adding New Content Types

To add new content types (e.g., projects, portfolio items):

1. Create a new directory in `content/` (e.g., `content/projects/`)
2. Add utility functions in `src/lib/content.ts`
3. Create pages to display the content
4. Update the content utilities as needed

## Example: Adding a Project

1. Create `content/projects/example-project.md`:

```markdown
---
title: "Example Project"
description: "A sample project description"
technologies: ["React", "Node.js", "MongoDB"]
github: "https://github.com/username/project"
demo: "https://project-demo.com"
featured: true
---

# Project Description

This is a detailed description of the project...
```

2. Add utility functions to `src/lib/content.ts`:

```typescript
export function getAllProjects(): Project[] {
  return getContentFromDirectory('projects')
    .map(project => ({
      ...project,
      metadata: {
        ...project.metadata,
        technologies: project.metadata.technologies || [],
        featured: project.metadata.featured || false
      }
    }))
    .sort((a, b) => new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime())
}
```

3. Create a projects page to display the content.

## Tips

- Use descriptive filenames for better organization
- Keep frontmatter consistent across similar content types
- Use tags to categorize content effectively
- Include descriptions for better SEO
- Use featured flags to highlight important content


