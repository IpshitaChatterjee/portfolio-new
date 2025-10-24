'use client'

import { useEffect, useState, useRef } from 'react'

interface Heading {
  id: string
  text: string
  element: HTMLElement
}

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>('')
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Slugify function to convert text to URL-safe ID
  const slugify = (text: string): string => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
      .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
  }

  // Extract headings from DOM
  useEffect(() => {
    const extractHeadings = () => {
      const h2Elements = document.querySelectorAll('h2')
      const headingList: Heading[] = []

      h2Elements.forEach((element) => {
        const text = element.textContent || ''
        const id = slugify(text)
        
        // Set the ID on the element if it doesn't have one
        if (!element.id) {
          element.id = id
        }

        headingList.push({
          id: element.id,
          text,
          element: element as HTMLElement,
        })
      })

      setHeadings(headingList)
    }

    // Extract headings after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(extractHeadings, 100)

    // Also set up a MutationObserver to watch for DOM changes (like password-protected content)
    const observer = new MutationObserver(() => {
      extractHeadings()
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [])

  // Set up Intersection Observer
  useEffect(() => {
    if (headings.length === 0) return

    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    // Create new observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        let maxRatio = 0
        let activeEntry: IntersectionObserverEntry | null = null

        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
            maxRatio = entry.intersectionRatio
            activeEntry = entry
          }
        })

        if (activeEntry && activeEntry.target) {
          setActiveId((activeEntry.target as HTMLElement).id)
        }
      },
      {
        rootMargin: '-20% 0% -80% 0%', // Trigger when heading is in top 20% of viewport
        threshold: 0.1,
      }
    )

    // Observe all headings
    headings.forEach((heading) => {
      observerRef.current?.observe(heading.element)
    })

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [headings])

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100 // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  if (headings.length === 0) {
    return null
  }

  return (
    <div className="hidden lg:block fixed right-8 top-32 w-64 z-10 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <div className="bg-white/90 dark:bg-zinc-950/90 backdrop-blur-sm rounded-lg p-4 shadow-sm">
        <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-3">
          Table of Contents
        </h3>
        <nav className="space-y-1">
          {headings.map((heading) => (
            <button
              key={heading.id}
              onClick={() => scrollToSection(heading.id)}
              className={`block w-full text-left text-sm transition-colors duration-200 hover:text-zinc-900 dark:hover:text-zinc-100 ${
                activeId === heading.id
                  ? 'text-zinc-900 dark:text-zinc-100 font-medium border-l-2 border-zinc-900 dark:border-zinc-100 pl-3 -ml-1'
                  : 'text-zinc-600 dark:text-zinc-400 pl-1'
              }`}
            >
              {heading.text}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
