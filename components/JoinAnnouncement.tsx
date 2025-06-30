"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"

interface JoinAnnouncementProps {
  person: {
    name: string
    photo: string
  } | null
  onComplete: () => void
}

export function JoinAnnouncement({ person, onComplete }: JoinAnnouncementProps) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (person) {
      setShow(true)
      const timer = setTimeout(() => {
        setShow(false)
        setTimeout(onComplete, 500)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [person, onComplete])

  return (
    <AnimatePresence>
      {show && person && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-emerald-200/50 max-w-md">
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-emerald-300"
              >
                <Image
                  src={person.photo || "/placeholder.svg"}
                  alt={person.name}
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                  crossOrigin="anonymous"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="text-emerald-600 text-lg font-medium mb-2">Just Arrived!</div>
                <div className="text-2xl font-bold text-slate-900 mb-2">{person.name}</div>
                <div className="text-slate-600">has joined Inovus Labs</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-4 flex justify-center"
              >
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
