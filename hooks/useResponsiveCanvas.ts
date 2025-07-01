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
    minSize: 140,
    maxSize: 220,
    headerHeight: 280,
    footerHeight: 220,
    margin: 80,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    scaleFactor: 1.8,
  })

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      let minSize, maxSize, headerHeight, footerHeight, margin, scaleFactor

      if (isMobile) {
        minSize = 80
        maxSize = 140
        headerHeight = 140
        footerHeight = 120
        margin = 30
        scaleFactor = 1.2
      } else if (isTablet) {
        minSize = 110
        maxSize = 180
        headerHeight = 200
        footerHeight = 170
        margin = 50
        scaleFactor = 1.4
      } else {
        minSize = 140
        maxSize = 220
        headerHeight = 150
        footerHeight = 320
        margin = 80
        scaleFactor = 1.8
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
