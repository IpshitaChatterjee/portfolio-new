'use client'
import { TextMorph } from '@/components/ui/text-morph'
import { ScrollProgress } from '@/components/ui/scroll-progress'
import { useEffect, useState } from 'react'
import { Analytics } from "@vercel/analytics/next"
import { motion, AnimatePresence } from 'framer-motion'
import { Link, Check } from 'lucide-react'


function CopyButton() {
  const [isCopied, setIsCopied] = useState(false)
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
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
      type="button"
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
            <Link size={16} color="#222" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}


export default function LayoutBlogPost({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollProgress
        className="fixed top-0 z-20 h-0.5 bg-gray-300 dark:bg-zinc-600"
        springOptions={{
          bounce: 0,
        }}
      />

      <div className="absolute right-4 top-24">
        <CopyButton />
      </div>
      <main className="prose prose-gray mt-24 pb-20 prose-h4:prose-base dark:prose-invert prose-h1:text-xl prose-h1:font-medium prose-h2:mt-12 prose-h2:scroll-m-20 prose-h2:text-lg prose-h2:font-medium prose-h3:text-base prose-h3:font-medium prose-h4:font-medium prose-h5:text-base prose-h5:font-medium prose-h6:text-base prose-h6:font-medium prose-strong:font-medium">
        {children}
      </main>
    </>
  )
}
