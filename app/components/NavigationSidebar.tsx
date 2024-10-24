'use client'

import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface NavigationSidebarProps {
  scrollTo: (sectionId: string) => void
  currentSection: string
}

const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'library', label: 'Library' },
  { id: 'games', label: 'Games' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'spotlight', label: 'Spotlight' },
]

export default function NavigationSidebar({ scrollTo, currentSection }: NavigationSidebarProps) {
  useEffect(() => {
    console.log('NavigationSidebar: Current section changed to:', currentSection)
  }, [currentSection])

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50">
      <nav className="flex flex-col space-y-2">
        {navigationItems.map((item) => (
          <div
            key={item.id}
            className={`relative ${
              currentSection === item.id ? 'bg-plum bg-opacity-50 rounded-md' : ''
            }`}
          >
            <Button
              variant="ghost"
              className={`justify-start text-white hover:text-white hover:bg-transparent w-full ${
                currentSection === item.id ? 'font-bold' : 'font-normal'
              }`}
              onClick={() => {
                console.log('NavigationSidebar: Button clicked for section:', item.id)
                scrollTo(item.id)
              }}
            >
              {item.label}
            </Button>
          </div>
        ))}
      </nav>
    </div>
  )
}