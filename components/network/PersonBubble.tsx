"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { getDepartmentTheme } from "@/lib/departmentColors"
import type { Person } from "@/types/person"

interface PersonBubbleProps {
  person: Person
  index: number
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function PersonBubble({ person, index, dimensions }: PersonBubbleProps) {
  const departmentTheme = getDepartmentTheme(person.department)

  return (
    <motion.div
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
        duration: 1.5,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      <motion.div
        className={`absolute rounded-full blur-2xl ${
          dimensions.isMobile ? "-inset-4" : dimensions.isTablet ? "-inset-6" : "-inset-8"
        }`}
        style={{ backgroundColor: person.showDetails ? departmentTheme.glow : "transparent" }}
        animate={{
          opacity: person.showDetails ? 1 : 0,
          scale: person.showDetails ? 1.3 : 0.8,
        }}
        transition={{ duration: 1 }}
      />

      <motion.div
        className={`relative w-full h-full rounded-full backdrop-blur-xl shadow-2xl shadow-slate-900/20 ${
          dimensions.isMobile ? "border-3" : dimensions.isTablet ? "border-4" : "border-4"
        }`}
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderColor: person.showDetails ? departmentTheme.border : departmentTheme.border.replace("0.5", "0.3"),
        }}
        animate={{
          boxShadow: person.showDetails
            ? `0 40px 80px -12px rgba(0, 0, 0, 0.3), 0 0 0 2px ${departmentTheme.border}`
            : "0 40px 80px -12px rgba(0, 0, 0, 0.2)",
        }}
        transition={{ duration: 0.8 }}
      >
        <div
          className={`absolute rounded-full border ${
            // dimensions.isMobile ? "inset-2" : dimensions.isTablet ? "inset-3" : "inset-4"
            "inset-2"
          }`}
          style={{
            background: `linear-gradient(135deg, ${departmentTheme.background}, rgba(255, 255, 255, 0.3))`,
            borderColor: departmentTheme.border.replace("0.5", "0.2"),
          }}
        />

        <div
          className={`absolute rounded-full overflow-hidden border-2 ${
            // dimensions.isMobile ? "inset-4" : dimensions.isTablet ? "inset-6" : "inset-8"
            "inset-4"
          }`}
          style={{ borderColor: departmentTheme.border.replace("0.5", "0.3") }}
        >
          <Image
            src={person?.photo || "/placeholder.svg"}
            alt={person.name}
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, ${departmentTheme.glow.replace("0.3", "0.1")}, transparent 60%, ${departmentTheme.background.replace("0.1", "0.05")})`,
            }}
          />
        </div>

        <AnimatePresence>
          {person.showDetails && (
            <motion.div
              className={`absolute left-1/2 transform -translate-x-1/2 z-40 ${
                dimensions.isMobile ? "-bottom-10" : dimensions.isTablet ? "-bottom-24" : "-bottom-28"
              }`}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div
                className={`
                  z-40 bg-white/95 backdrop-blur-xl shadow-2xl border-2 ${
                  dimensions.isMobile ? "px-4 py-2 rounded" : 
                  // dimensions.isTablet ? "px-8 py-6 rounded-xl" : 
                  // "px-10 py-8 rounded-2xl"
                  "px-8 py-6 rounded-xl"
                }`}
                style={{ borderColor: departmentTheme.border }}
              >

                <p className={`font-bold whitespace-nowrap mb-1 ${
                  dimensions.isMobile ? "text-base" : 
                  dimensions.isTablet ? "text-2xl" : "text-3xl"
                }`} style={{ color: departmentTheme.text }}
                >
                  {person.name}
                </p>

                <p className={`text-slate-600 text-center ${ 
                  dimensions.isMobile ? "text-xs" : 
                  dimensions.isTablet ? "text-base" : "text-lg"
                }`}>
                  {person.role}
                </p>
                
                {/* <div
                  className={`flex items-center justify-center mt-2 px-3 py-1 rounded-full ${
                    dimensions.isMobile ? "text-xs" : dimensions.isTablet ? "text-sm" : "text-base"
                  }`}
                  style={{
                    backgroundColor: departmentTheme.background,
                    color: departmentTheme.text,
                  }}
                >
                  <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: departmentTheme.primary }} />
                  {person.department}
                </div> */}

              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className={`absolute rounded-full -z-10 ${
            dimensions.isMobile ? "-inset-2 border-3" : dimensions.isTablet ? "-inset-3 border-4" : "-inset-4 border-4"
          }`}
          style={{ borderColor: departmentTheme.border }}
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
  )
}
