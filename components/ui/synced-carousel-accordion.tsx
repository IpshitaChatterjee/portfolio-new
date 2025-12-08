'use client'

import { useState, useEffect } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ImageModal } from '@/components/ui/image-modal'

interface CarouselImage {
  src: string
  alt: string
}

interface AccordionItem {
  value: string
  trigger: string
  content: string
}

interface SyncedCarouselAccordionProps {
  images: CarouselImage[]
  accordionItems: AccordionItem[]
  // Map of carousel index to accordion item indices to show
  mapping: {
    [carouselIndex: number]: number[]
  }
}

export function SyncedCarouselAccordion({
  images,
  accordionItems,
  mapping,
}: SyncedCarouselAccordionProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  // Get which accordion items to show based on current carousel slide
  const visibleItems = mapping[current] || []

  return (
    <div className="w-full space-y-6">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="w-full">
                <ImageModal src={image.src} alt={image.alt} caption="" />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <Accordion type="single" collapsible className="w-full">
        {accordionItems.map((item, index) => {
          const isVisible = visibleItems.includes(index)
          if (!isVisible) return null

          return (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}

