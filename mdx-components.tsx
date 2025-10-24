import type { MDXComponents } from 'mdx/types'
import { ComponentPropsWithoutRef } from 'react'
import { highlight } from 'sugar-high'
import { ImpactMetrics } from '@/components/ui/impact-metrics'
import { ImageModal } from '@/components/ui/image-modal'
import { slugify } from '@/lib/utils'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ImpactMetrics,
    h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
      const slug = slugify(children as string)
      return <h2 id={slug} {...props}>{children}</h2>
    },
    Cover: ({
      src,
      alt,
      caption,
    }: {
      src: string
      alt: string
      caption: string
    }) => {
      return <ImageModal src={src} alt={alt} caption={caption} />
    },
    img: ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => {
      return <ImageModal src={src || ''} alt={alt || ''} />
    },
    code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
      const codeHTML = highlight(children as string)
      return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
    },
  }
}
