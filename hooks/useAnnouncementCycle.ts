"use client"

import { useState, useEffect } from "react"
import type { Announcement } from "@/types/announcement"

interface UseAnnouncementCycleProps {
  announcements: Announcement[]
  intervalMs?: number
}

export function useAnnouncementCycle({ announcements, intervalMs = 6000 }: UseAnnouncementCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (announcements.length === 0) return

    const cycle = () => {
      setIsVisible(false)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length)
        setIsVisible(true)
      }, 500)
    }

    const interval = setInterval(cycle, intervalMs)
    return () => clearInterval(interval)
  }, [announcements.length, intervalMs])

  const currentAnnouncement = announcements[currentIndex] || null

  return {
    currentAnnouncement,
    isVisible,
    currentIndex,
    totalCount: announcements.length,
  }
}
