"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useEffect, useState } from "react"
import { getDepartmentTheme } from "@/lib/departmentColors"

interface JoinAnnouncementProps {
  person: {
    name: string
    photo: string
    department: string
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

  if (!person) return null

  const departmentTheme = getDepartmentTheme(person.department)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
        >
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border-2 max-w-lg"
            style={{ borderColor: departmentTheme.border }}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4"
                style={{ borderColor: departmentTheme.primary }}
              >
                <Image
                  src={person.photo || "/placeholder.svg"}
                  alt={person.name}
                  width={128}
                  height={128}
                  className="object-cover w-full h-full"
                  crossOrigin="anonymous"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <div className="text-2xl font-medium mb-3" style={{ color: departmentTheme.text }}>
                  Just Arrived!
                </div>
                <div className="text-4xl font-bold text-slate-900 mb-2">{person.name}</div>
                <div
                  className="inline-flex items-center px-4 py-2 rounded-full text-lg font-medium mb-3"
                  style={{
                    backgroundColor: departmentTheme.background,
                    color: departmentTheme.text,
                  }}
                >
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: departmentTheme.primary }} />
                  {person.department}
                </div>
                <div className="text-xl text-slate-600">has joined Inovus Labs</div>
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="mt-6 flex justify-center"
              >
                <div
                  className="w-4 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: departmentTheme.primary }}
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
