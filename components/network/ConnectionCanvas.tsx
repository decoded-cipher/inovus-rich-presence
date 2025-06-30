"use client"

import { useEffect, useRef } from "react"
import { getDepartmentTheme } from "@/lib/departmentColors"
import type { Person } from "@/types/person"

interface ConnectionCanvasProps {
  people: Person[]
  dimensions: {
    width: number
    height: number
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function ConnectionCanvas({ people, dimensions }: ConnectionCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || people.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawConnections = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const maxDistance = dimensions.isMobile ? 300 : dimensions.isTablet ? 400 : 500
      const lineWidth = dimensions.isMobile ? 2 : dimensions.isTablet ? 3 : 4

      for (let i = 0; i < people.length; i++) {
        for (let j = i + 1; j < people.length; j++) {
          const person1 = people[i]
          const person2 = people[j]

          const distance = Math.sqrt(Math.pow(person2.x - person1.x, 2) + Math.pow(person2.y - person1.y, 2))

          if (distance < maxDistance) {
            const opacity = Math.max(0.2, ((maxDistance - distance) / maxDistance) * 0.8)

            const theme1 = getDepartmentTheme(person1.department)
            const theme2 = getDepartmentTheme(person2.department)

            const gradient = ctx.createLinearGradient(person1.x, person1.y, person2.x, person2.y)
            gradient.addColorStop(0, `${theme1.primary.replace("rgb", "rgba").replace(")", `, ${opacity})`)}`)
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 1.3})`)
            gradient.addColorStop(1, `${theme2.primary.replace("rgb", "rgba").replace(")", `, ${opacity})`)}`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = lineWidth
            ctx.lineCap = "round"
            ctx.shadowColor = `${theme1.glow.replace(")", `, ${opacity * 0.4})`).replace("rgba", "rgba")}`
            ctx.shadowBlur = dimensions.isMobile ? 4 : dimensions.isTablet ? 5 : 6

            ctx.beginPath()
            ctx.moveTo(person1.x, person1.y)
            ctx.lineTo(person2.x, person2.y)
            ctx.stroke()

            ctx.shadowBlur = 0
          }
        }
      }
    }

    const animateCanvas = () => {
      drawConnections()
      requestAnimationFrame(animateCanvas)
    }

    animateCanvas()
  }, [people, dimensions])

  return (
    <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="absolute inset-0 z-10" />
  )
}
