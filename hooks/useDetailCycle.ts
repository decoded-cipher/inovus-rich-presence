"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface UseDetailCycleProps {
  people: Array<{ id: number }>
  setActiveDetailIndex: React.Dispatch<React.SetStateAction<number>>
}

export function useDetailCycle({ people, setActiveDetailIndex }: UseDetailCycleProps) {
  const detailQueueRef = useRef<number[]>([])

  useEffect(() => {
    const showNextDetail = () => {
      if (detailQueueRef.current.length === 0) {
        detailQueueRef.current = people.map((_, index) => index)
      }

      const nextIndex = detailQueueRef.current.shift()!
      setActiveDetailIndex(nextIndex)

      setTimeout(() => {
        setActiveDetailIndex(-1)
        setTimeout(showNextDetail, 2000 + Math.random() * 3000)
      }, 4000)
    }

    if (people.length > 0) {
      detailQueueRef.current = people.map((_, index) => index)
      setTimeout(showNextDetail, 3000)
    }
  }, [people.length, setActiveDetailIndex])
}
