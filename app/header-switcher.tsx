'use client'
import React from 'react'
import { Header } from './header'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Link as LinkIcon, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function HeaderSwitcher() {
  const pathname = usePathname()
  const router = useRouter()

  const isBlog = pathname?.startsWith('/blog')

  if (!isBlog) {
    return <Header />
  }

  function CopyButton() {
    const [isCopied, setIsCopied] = React.useState(false)
    const currentUrl = typeof window !== 'undefined' ? window.location.href : ''

    const handleCopy = async () => {
      setIsCopied(true)
      await navigator.clipboard.writeText(currentUrl)
      setTimeout(() => setIsCopied(false), 1500)
    }

    return (
      <button
        onClick={handleCopy}
        style={{
          background: '#F4F4F4',
          borderRadius: '50%',
          border: 'none',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
        type="button"
        aria-label="Copy URL"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isCopied ? (
            <motion.span
              key="check"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <Check size={16} color="#222" />
            </motion.span>
          ) : (
            <motion.span
              key="link"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <LinkIcon size={16} color="#222" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    )
  }

  return (
    <header className="mb-8 flex items-center justify-between">
      <motion.button
        type="button"
        aria-label="Go back"
        onClick={() => router.back()}
        whileTap={{ scale: 0.92 }}
        style={{
          background: '#F4F4F4',
          borderRadius: '50%',
          border: 'none',
          width: 36,
          height: 36,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key="arrow"
            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <ArrowLeft size={16} color="#222" />
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <CopyButton />

      <span className="sr-only">
        <Link href="/">Home</Link>
      </span>
    </header>
  )
}


