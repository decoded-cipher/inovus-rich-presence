"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useResponsiveCanvas } from "@/hooks/useResponsiveCanvas"
import peopleData from "@/data/people.json"

interface Person {
  id: number
  name: string
  role: string
  photo: string
  x: number
  y: number
  size: number
  targetSize: number
  baseSize: number
  vx: number
  vy: number
  speed: number
  showDetails: boolean
  detailsTimer: number
  isColliding: boolean
}

export default function EnhancedResponsiveNetworkVisualization() {
  const [people, setPeople] = useState<Person[]>([])
  const [activeDetailIndex, setActiveDetailIndex] = useState<number>(-1)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const detailQueueRef = useRef<number[]>([])
  const dimensions = useResponsiveCanvas()

  // Initialize people with responsive positioning
  useEffect(() => {
    const initialPeople: Person[] = []

    peopleData.forEach((person, index) => {
      let attempts = 0
      let validPosition = false
      let x, y, size

      while (!validPosition && attempts < 100) {
        size = dimensions.minSize + Math.random() * (dimensions.maxSize - dimensions.minSize)
        x = dimensions.margin + size + Math.random() * (dimensions.width - 2 * dimensions.margin - 2 * size)
        y =
          dimensions.headerHeight +
          dimensions.margin +
          size +
          Math.random() *
            (dimensions.height - dimensions.headerHeight - dimensions.footerHeight - 2 * dimensions.margin - 2 * size)

        validPosition = initialPeople.every((existingPerson) => {
          const distance = Math.sqrt(Math.pow(x - existingPerson.x, 2) + Math.pow(y - existingPerson.y, 2))
          return distance > (size + existingPerson.size) / 2 + (dimensions.isMobile ? 20 : 25)
        })

        attempts++
      }

      if (!validPosition) {
        const cols = dimensions.isMobile ? 2 : dimensions.isTablet ? 3 : 3
        const rows = Math.ceil(peopleData.length / cols)
        const col = index % cols
        const row = Math.floor(index / cols)

        size = dimensions.minSize
        x = dimensions.margin + size + col * ((dimensions.width - 2 * dimensions.margin) / cols)
        y =
          dimensions.headerHeight +
          dimensions.margin +
          size +
          row * ((dimensions.height - dimensions.headerHeight - dimensions.footerHeight - 2 * dimensions.margin) / rows)
      }

      const speed = dimensions.isMobile ? 0.15 + Math.random() * 0.25 : 0.2 + Math.random() * 0.4
      const angle = Math.random() * Math.PI * 2

      initialPeople.push({
        ...person,
        x,
        y,
        size,
        targetSize: size,
        baseSize: size,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        speed,
        showDetails: false,
        detailsTimer: 0,
        isColliding: false,
      })
    })

    setPeople(initialPeople)
    detailQueueRef.current = initialPeople.map((_, index) => index)

    const showNextDetail = () => {
      if (detailQueueRef.current.length === 0) {
        detailQueueRef.current = initialPeople.map((_, index) => index)
      }

      const nextIndex = detailQueueRef.current.shift()!
      setActiveDetailIndex(nextIndex)

      setTimeout(() => {
        setActiveDetailIndex(-1)
        setTimeout(showNextDetail, 1000 + Math.random() * 2000)
      }, 3000)
    }

    setTimeout(showNextDetail, 2000)
  }, [dimensions])

  // Enhanced physics animation loop
  useEffect(() => {
    const animate = () => {
      setPeople((prevPeople) => {
        const newPeople = prevPeople.map((person) => ({ ...person }))

        newPeople.forEach((person) => {
          person.x += person.vx
          person.y += person.vy

          const radius = person.size / 2

          if (person.x <= dimensions.margin + radius || person.x >= dimensions.width - dimensions.margin - radius) {
            person.vx = -person.vx * 0.85
            person.x = Math.max(
              dimensions.margin + radius,
              Math.min(dimensions.width - dimensions.margin - radius, person.x),
            )
            person.vy += (Math.random() - 0.5) * 0.1
          }

          if (
            person.y <= dimensions.headerHeight + dimensions.margin + radius ||
            person.y >= dimensions.height - dimensions.footerHeight - dimensions.margin - radius
          ) {
            person.vy = -person.vy * 0.85
            person.y = Math.max(
              dimensions.headerHeight + dimensions.margin + radius,
              Math.min(dimensions.height - dimensions.footerHeight - dimensions.margin - radius, person.y),
            )
            person.vx += (Math.random() - 0.5) * 0.1
          }

          const maxVelocity = person.speed
          const currentVelocity = Math.sqrt(person.vx * person.vx + person.vy * person.vy)
          if (currentVelocity > maxVelocity) {
            person.vx = (person.vx / currentVelocity) * maxVelocity
            person.vy = (person.vy / currentVelocity) * maxVelocity
          }

          if (Math.random() < 0.002) {
            const angle = Math.random() * Math.PI * 2
            person.vx = Math.cos(angle) * person.speed
            person.vy = Math.sin(angle) * person.speed
          }
        })

        // Enhanced collision detection
        for (let i = 0; i < newPeople.length; i++) {
          for (let j = i + 1; j < newPeople.length; j++) {
            const person1 = newPeople[i]
            const person2 = newPeople[j]

            const dx = person2.x - person1.x
            const dy = person2.y - person1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (person1.size + person2.size) / 2 + (dimensions.isMobile ? 5 : 8)

            if (distance < minDistance && distance > 0) {
              person1.isColliding = true
              person2.isColliding = true

              const overlap = minDistance - distance
              const separateX = (dx / distance) * overlap * 0.5
              const separateY = (dy / distance) * overlap * 0.5

              person1.x -= separateX
              person1.y -= separateY
              person2.x += separateX
              person2.y += separateY

              const relativeVelocityX = person2.vx - person1.vx
              const relativeVelocityY = person2.vy - person1.vy
              const speed = relativeVelocityX * (dx / distance) + relativeVelocityY * (dy / distance)

              if (speed < 0) continue

              const impulse = (2 * speed) / 2
              person1.vx += impulse * (dx / distance) * 0.6
              person1.vy += impulse * (dy / distance) * 0.6
              person2.vx -= impulse * (dx / distance) * 0.6
              person2.vy -= impulse * (dy / distance) * 0.6
            } else {
              person1.isColliding = false
              person2.isColliding = false
            }
          }
        }

        newPeople.forEach((person, index) => {
          if (index === activeDetailIndex) {
            person.targetSize = person.baseSize * (dimensions.isMobile ? 1.3 : 1.5)
            person.showDetails = true
          } else {
            person.targetSize = person.baseSize
            person.showDetails = false
          }

          const sizeDiff = person.targetSize - person.size
          person.size += sizeDiff * 0.1
        })

        return newPeople
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    if (people.length > 0) {
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [people.length, activeDetailIndex, dimensions])

  // Enhanced connection lines
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || people.length === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawConnections = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)

      const maxDistance = dimensions.isMobile ? 280 : dimensions.isTablet ? 320 : 380
      const lineWidth = dimensions.isMobile ? 2 : dimensions.isTablet ? 2.5 : 3

      for (let i = 0; i < people.length; i++) {
        for (let j = i + 1; j < people.length; j++) {
          const person1 = people[i]
          const person2 = people[j]

          const distance = Math.sqrt(Math.pow(person2.x - person1.x, 2) + Math.pow(person2.y - person1.y, 2))

          if (distance < maxDistance) {
            const opacity = Math.max(0.2, ((maxDistance - distance) / maxDistance) * 0.7)

            const gradient = ctx.createLinearGradient(person1.x, person1.y, person2.x, person2.y)
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`)
            gradient.addColorStop(0.5, `rgba(147, 51, 234, ${opacity * 1.4})`)
            gradient.addColorStop(1, `rgba(59, 130, 246, ${opacity})`)

            ctx.strokeStyle = gradient
            ctx.lineWidth = lineWidth
            ctx.lineCap = "round"
            ctx.shadowColor = `rgba(147, 51, 234, ${opacity * 0.4})`
            ctx.shadowBlur = dimensions.isMobile ? 3 : 4

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
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.08)_0%,transparent_50%)]" />

        {/* Enhanced animated particles */}
        {[...Array(dimensions.isMobile ? 6 : dimensions.isTablet ? 10 : 12)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute bg-blue-200/20 rounded-full ${
              dimensions.isMobile ? "w-1.5 h-1.5" : dimensions.isTablet ? "w-2 h-2" : "w-2.5 h-2.5"
            }`}
            style={{
              left: Math.random() * dimensions.width,
              top: Math.random() * dimensions.height,
            }}
            animate={{
              x: [0, Math.random() * 60 - 30],
              y: [0, Math.random() * 60 - 30],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Enhanced responsive header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center"
        >
          <h1
            className={`font-thin text-slate-900 mb-3 tracking-tight ${
              dimensions.isMobile ? "text-4xl" : dimensions.isTablet ? "text-6xl" : "text-7xl"
            }`}
          >
            Live Team Network
          </h1>
          <p
            className={`text-slate-600 font-light mb-2 ${
              dimensions.isMobile ? "text-xl" : dimensions.isTablet ? "text-2xl" : "text-3xl"
            }`}
          >
            Real-time collaboration visualization
          </p>
          <p
            className={`text-slate-500 font-light ${
              dimensions.isMobile ? "text-lg" : dimensions.isTablet ? "text-xl" : "text-2xl"
            }`}
          >
            Watch team members interact and connect
          </p>
          <div
            className={`mt-6 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full ${
              dimensions.isMobile ? "w-16 h-0.5" : dimensions.isTablet ? "w-24 h-0.5" : "w-32 h-1"
            }`}
          />
        </motion.div>
      </div>

      {/* Enhanced connection lines canvas */}
      <canvas ref={canvasRef} width={dimensions.width} height={dimensions.height} className="absolute inset-0 z-10" />

      {/* Enhanced people bubbles */}
      <div className="absolute inset-0 z-10">
        <AnimatePresence>
          {people.map((person, index) => (
            <motion.div
              key={person.id}
              className="absolute"
              style={{
                left: person.x - person.size / 2,
                top: person.y - person.size / 2,
                width: person.size,
                height: person.size,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.8,
                delay: index * 0.12,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {/* Enhanced collision glow */}
              <motion.div
                className={`absolute rounded-full bg-red-400/25 blur-xl ${
                  dimensions.isMobile ? "-inset-2" : dimensions.isTablet ? "-inset-3" : "-inset-4"
                }`}
                animate={{
                  opacity: person.isColliding ? 0.9 : 0,
                  scale: person.isColliding ? 1.4 : 1,
                }}
                transition={{ duration: 0.4 }}
              />

              {/* Enhanced detail glow */}
              <motion.div
                className={`absolute rounded-full bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-pink-500/25 blur-2xl ${
                  dimensions.isMobile ? "-inset-3" : dimensions.isTablet ? "-inset-4" : "-inset-5"
                }`}
                animate={{
                  opacity: person.showDetails ? 1 : 0,
                  scale: person.showDetails ? 1.3 : 0.8,
                }}
                transition={{ duration: 1 }}
              />

              {/* Enhanced main bubble */}
              <motion.div
                className={`relative w-full h-full rounded-full bg-white/90 backdrop-blur-xl shadow-2xl shadow-slate-900/20 ${
                  dimensions.isMobile ? "border-2 border-white/80" : "border-3 border-white/80"
                }`}
                animate={{
                  borderColor: person.showDetails ? "rgba(147, 51, 234, 0.5)" : "rgba(255, 255, 255, 0.8)",
                  boxShadow: person.showDetails
                    ? "0 30px 60px -12px rgba(0, 0, 0, 0.3)"
                    : "0 30px 60px -12px rgba(0, 0, 0, 0.2)",
                }}
                transition={{ duration: 0.8 }}
              >
                <div
                  className={`absolute rounded-full bg-gradient-to-br from-white/60 to-transparent ${
                    dimensions.isMobile ? "inset-1" : "inset-2"
                  }`}
                />

                {/* Enhanced photo */}
                <div
                  className={`absolute rounded-full overflow-hidden ${
                    dimensions.isMobile ? "inset-2" : dimensions.isTablet ? "inset-3" : "inset-4"
                  }`}
                >
                  <Image
                    src={person.photo || "/placeholder.svg"}
                    alt={person.name}
                    fill
                    className="object-cover"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 via-transparent to-white/20" />
                </div>

                {/* Enhanced details display */}
                <AnimatePresence>
                  {person.showDetails && (
                    <motion.div
                      className={`absolute left-1/2 transform -translate-x-1/2 z-30 ${
                        dimensions.isMobile ? "-bottom-14" : dimensions.isTablet ? "-bottom-18" : "-bottom-22"
                      }`}
                      initial={{ opacity: 0, y: 15, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 15, scale: 0.9 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div
                        className={`bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl shadow-slate-900/25 border-2 border-purple-200/50 ${
                          dimensions.isMobile ? "px-4 py-2" : dimensions.isTablet ? "px-5 py-3" : "px-6 py-4"
                        }`}
                      >
                        <p
                          className={`text-slate-900 font-semibold whitespace-nowrap ${
                            dimensions.isMobile ? "text-lg" : dimensions.isTablet ? "text-xl" : "text-2xl"
                          }`}
                        >
                          {person.name}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Enhanced active indicator */}
                <motion.div
                  className={`absolute rounded-full ${
                    dimensions.isMobile
                      ? "-inset-1 border-2 border-purple-400/60"
                      : "-inset-2 border-3 border-purple-400/60"
                  }`}
                  animate={{
                    scale: person.showDetails ? [1, 1.08, 1] : 1,
                    opacity: person.showDetails ? [0.6, 0.9, 0.6] : 0,
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: person.showDetails ? Number.POSITIVE_INFINITY : 0,
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Enhanced footer */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className={`flex justify-center items-center ${dimensions.isMobile ? "space-x-8" : "space-x-16"}`}
        >
          <div className="text-center">
            <div
              className={`font-thin text-slate-900 mb-2 ${
                dimensions.isMobile ? "text-4xl" : dimensions.isTablet ? "text-5xl" : "text-6xl"
              }`}
            >
              {people.length}
            </div>
            <div
              className={`text-slate-500 font-light uppercase tracking-widest ${
                dimensions.isMobile ? "text-sm" : dimensions.isTablet ? "text-base" : "text-lg"
              }`}
            >
              Team Members
            </div>
          </div>

          <div
            className={`bg-gradient-to-b from-transparent via-slate-300 to-transparent ${
              dimensions.isMobile ? "w-px h-12" : dimensions.isTablet ? "w-px h-16" : "w-px h-20"
            }`}
          />

          <div className="text-center">
            <motion.div
              className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 ${
                dimensions.isMobile ? "w-3 h-3" : dimensions.isTablet ? "w-4 h-4" : "w-5 h-5"
              }`}
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
            <div
              className={`text-slate-500 font-light uppercase tracking-widest ${
                dimensions.isMobile ? "text-sm" : dimensions.isTablet ? "text-base" : "text-lg"
              }`}
            >
              Physics Active
            </div>
          </div>

          {!dimensions.isMobile && (
            <>
              <div
                className={`bg-gradient-to-b from-transparent via-slate-300 to-transparent ${
                  dimensions.isTablet ? "w-px h-16" : "w-px h-20"
                }`}
              />
              <div className="text-center">
                <div className={`font-thin text-slate-900 mb-2 ${dimensions.isTablet ? "text-2xl" : "text-3xl"}`}>
                  {activeDetailIndex >= 0 ? people[activeDetailIndex]?.name.split(" ")[0] : "—"}
                </div>
                <div
                  className={`text-slate-500 font-light uppercase tracking-widest ${
                    dimensions.isTablet ? "text-base" : "text-lg"
                  }`}
                >
                  Spotlight
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
