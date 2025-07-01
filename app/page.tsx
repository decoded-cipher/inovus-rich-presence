"use client"

import { useEffect, useState } from "react"
import { useResponsiveCanvas } from "@/hooks/useResponsiveCanvas"
import { useNetworkPhysics } from "@/hooks/useNetworkPhysics"
import { useDetailCycle } from "@/hooks/useDetailCycle"
import { BackgroundPattern } from "@/components/ui/BackgroundPattern"
import { CompanyHeader } from "@/components/ui/CompanyHeader"
import { LiveFooter } from "@/components/ui/LiveFooter"
import { ConnectionCanvas } from "@/components/network/ConnectionCanvas"
import { PeopleNetwork } from "@/components/network/PeopleNetwork"
import { AnnouncementTicker } from "@/components/announcements/AnnouncementTicker"
import type { Person, PersonData } from "@/types/person"
import type { Announcement } from "@/types/announcement"
import peopleData from "@/data/people.json"
import announcementsData from "@/data/announcements.json"

export default function InovusNetworkVisualization() {
  const [people, setPeople] = useState<Person[]>([])
  const [activeDetailIndex, setActiveDetailIndex] = useState<number>(-1)
  const dimensions = useResponsiveCanvas()

  useEffect(() => {
    const initialPeople: Person[] = (peopleData as PersonData[]).slice(0, 8).map((person, index) => {
      const size = dimensions.minSize + Math.random() * (dimensions.maxSize - dimensions.minSize)
      const centerX = dimensions.width / 2
      const centerY = dimensions.height / 2
      const angle = (index / 8) * Math.PI * 2
      const radius = 150 + Math.random() * 250

      return {
        ...person,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        size,
        targetSize: size,
        baseSize: size,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        speed: 0.2 + Math.random() * 0.4,
        showDetails: false,
        detailsTimer: 0,
        isColliding: false,
        joinedAt: null,
        isNewJoin: false,
      }
    })

    setPeople(initialPeople)
  }, [dimensions])

  useNetworkPhysics({ people, setPeople, activeDetailIndex, dimensions })
  useDetailCycle({ people, setActiveDetailIndex })

  const activePersonName = activeDetailIndex >= 0 ? people[activeDetailIndex]?.name.split(" ")[0] : undefined

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <BackgroundPattern />
      <CompanyHeader dimensions={dimensions} />
      <ConnectionCanvas people={people} dimensions={dimensions} />
      <PeopleNetwork people={people} dimensions={dimensions} />
      <LiveFooter peopleCount={people.length} activePersonName={activePersonName} dimensions={dimensions} />
      {/* <AnnouncementTicker announcements={announcementsData as Announcement[]} dimensions={dimensions} /> */}
    </div>
  )
}
