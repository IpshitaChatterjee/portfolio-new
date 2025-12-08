'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { XIcon } from 'lucide-react'

interface ImageModalProps {
  src: string
  alt: string
  caption?: string
}

export function ImageModal({ src, alt, caption }: ImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)
  const openedByPointerRef = useRef(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const handlePointerDown = (e: React.PointerEvent) => {
    dragStartRef.current = { x: e.clientX, y: e.clientY }
    openedByPointerRef.current = false
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!dragStartRef.current) return

    const deltaX = Math.abs(e.clientX - dragStartRef.current.x)
    const deltaY = Math.abs(e.clientY - dragStartRef.current.y)
    const isClick = deltaX < 5 && deltaY < 5 // Threshold for click vs drag

    if (isClick) {
      e.stopPropagation()
      setIsOpen(true)
      openedByPointerRef.current = true
    }

    dragStartRef.current = null
  }

  const handleClick = (e: React.MouseEvent) => {
    // Only handle click if pointer events didn't already open it
    if (!openedByPointerRef.current) {
      e.stopPropagation()
      setIsOpen(true)
    }
    openedByPointerRef.current = false
  }

  return (
    <>
      <figure 
        className="cursor-zoom-in w-full"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onClick={handleClick}
      >
        <img src={src} alt={alt} className="rounded-xl w-full h-auto object-contain" />
        {caption && (
          <figcaption className="text-center">{caption}</figcaption>
        )}
      </figure>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative max-h-[100vh] max-w-[100vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={src}
                    alt={alt}
                    className="max-h-[90vh] max-w-[90vw] rounded-2xl object-contain"
                  />
                  <button
                    onClick={() => setIsOpen(false)}
                    className="fixed right-4 top-[16px] rounded-full bg-white/90 p-2 text-gray-600 hover:bg-white hover:text-gray-800"
                    style={{ right: '16px' }}
                  >
                    <XIcon className="h-3 w-3" />
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
