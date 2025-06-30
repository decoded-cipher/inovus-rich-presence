"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import type { Person } from "@/types/person"

interface UseNetworkPhysicsProps {
  people: Person[]
  setPeople: React.Dispatch<React.SetStateAction<Person[]>>
  activeDetailIndex: number
  dimensions: {
    width: number
    height: number
    headerHeight: number
    footerHeight: number
    margin: number
  }
}

export function useNetworkPhysics({ people, setPeople, activeDetailIndex, dimensions }: UseNetworkPhysicsProps) {
  const animationRef = useRef<number>()

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
          }
        })

        // Collision detection
        for (let i = 0; i < newPeople.length; i++) {
          for (let j = i + 1; j < newPeople.length; j++) {
            const person1 = newPeople[i]
            const person2 = newPeople[j]

            const dx = person2.x - person1.x
            const dy = person2.y - person1.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            const minDistance = (person1.size + person2.size) / 2 + 20

            if (distance < minDistance && distance > 0) {
              const overlap = minDistance - distance
              const separateX = (dx / distance) * overlap * 0.5
              const separateY = (dy / distance) * overlap * 0.5

              person1.x -= separateX
              person1.y -= separateY
              person2.x += separateX
              person2.y += separateY

              const impulse = 0.3
              person1.vx -= (dx / distance) * impulse
              person1.vy -= (dy / distance) * impulse
              person2.vx += (dx / distance) * impulse
              person2.vy += (dy / distance) * impulse
            }
          }
        }

        // Size updates
        newPeople.forEach((person, index) => {
          if (index === activeDetailIndex) {
            person.targetSize = person.baseSize * 1.4
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
  }, [people.length, activeDetailIndex, dimensions, setPeople])

  return animationRef
}
