'use client'

import React, { useState, useEffect } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300)
    }

    // Initial check
    toggleVisibility()

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      className="fixed bottom-8 right-8 z-[9999] p-3 bg-black dark:bg-white text-white dark:text-black rounded-full shadow-lg"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaArrowUp size={24} />
    </button>
  )
}