"use client"

import { AnimatePresence } from "framer-motion"
import { PersonBubble } from "./PersonBubble"
import type { Person } from "@/types/person"

interface PeopleNetworkProps {
  people: Person[]
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function PeopleNetwork({ people, dimensions }: PeopleNetworkProps) {
  return (
    <div className="absolute inset-0 z-10">
      <AnimatePresence>
        {people.map((person, index) => (
          <PersonBubble key={person.id} person={person} index={index} dimensions={dimensions} />
        ))}
      </AnimatePresence>
    </div>
  )
}
