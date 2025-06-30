"use client"

import { useState, useEffect } from "react"

interface CanvasDimensions {
  width: number
  height: number
  minSize: number
  maxSize: number
  headerHeight: number
  footerHeight: number
  margin: number
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  scaleFactor: number
}

export function useResponsiveCanvas(): CanvasDimensions {
  const [dimensions, setDimensions] = useState<CanvasDimensions>({
    width: 1080,
    height: 1920,
    minSize: 100,
    maxSize: 160,
    headerHeight: 180,
    footerHeight: 140,
    margin: 60,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    scaleFactor: 1.4,
  })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      // Enhanced sizes for distance viewing while maintaining elegance
      let minSize, maxSize, headerHeight, footerHeight, margin, scaleFactor

      if (isMobile) {
        minSize = 70
        maxSize = 120
        headerHeight = 120
        footerHeight = 100
        margin = 25
        scaleFactor = 1.2
      } else if (isTablet) {
        minSize = 85
        maxSize = 140
        headerHeight = 150
        footerHeight = 120
        margin = 35
        scaleFactor = 1.3
      } else {
        minSize = 100
        maxSize = 160
        headerHeight = 180
        footerHeight = 140
        margin = 60
        scaleFactor = 1.4
      }

      setDimensions({
        width,
        height,
        minSize,
        maxSize,
        headerHeight,
        footerHeight,
        margin,
        isMobile,
        isTablet,
        isDesktop,
        scaleFactor,
      })
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return dimensions
}
