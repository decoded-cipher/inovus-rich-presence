"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useAnnouncementCycle } from "@/hooks/useAnnouncementCycle"
import { getAnnouncementTheme } from "@/lib/announcementThemes"
import type { Announcement } from "@/types/announcement"

interface AnnouncementTickerProps {
  announcements: Announcement[]
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function AnnouncementTicker({ announcements, dimensions }: AnnouncementTickerProps) {
  const { currentAnnouncement, isVisible, currentIndex, totalCount } = useAnnouncementCycle({
    announcements,
    intervalMs: 6000,
  })

  if (!currentAnnouncement) return null

  const theme = getAnnouncementTheme(currentAnnouncement.type)
  const timeAgo = getTimeAgo(currentAnnouncement.timestamp)

  return (
    <div className="absolute bottom-4 left-4 right-4 z-30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="max-w-6xl mx-auto"
      >
        <AnimatePresence mode="wait">
          {isVisible && (
            <motion.div
              key={currentAnnouncement.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              <motion.div
                className="absolute inset-0 rounded-2xl blur-xl"
                style={{ backgroundColor: theme.glow }}
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />

              <div
                className={`relative bg-white/90 backdrop-blur-xl rounded-2xl border-2 shadow-xl ${
                  dimensions.isMobile ? "p-4" : dimensions.isTablet ? "p-6" : "p-8"
                }`}
                style={{
                  borderColor: theme.border,
                  backgroundColor: `rgba(255, 255, 255, 0.95)`,
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-4 mb-2">
                      <motion.div
                        className={`rounded-full ${
                          dimensions.isMobile ? "w-3 h-3" : dimensions.isTablet ? "w-4 h-4" : "w-5 h-5"
                        }`}
                        style={{ backgroundColor: theme.icon }}
                        animate={{
                          scale: currentAnnouncement.priority === "high" ? [1, 1.3, 1] : 1,
                          opacity: currentAnnouncement.priority === "high" ? [0.7, 1, 0.7] : 1,
                        }}
                        transition={{
                          duration: 2,
                          repeat: currentAnnouncement.priority === "high" ? Number.POSITIVE_INFINITY : 0,
                        }}
                      />

                      <h3
                        className={`font-bold text-slate-900 ${
                          dimensions.isMobile ? "text-lg" : dimensions.isTablet ? "text-xl" : "text-2xl"
                        }`}
                      >
                        {currentAnnouncement.title}
                      </h3>

                      <span
                        className={`text-slate-500 font-medium ${
                          dimensions.isMobile ? "text-xs" : dimensions.isTablet ? "text-sm" : "text-base"
                        }`}
                      >
                        {timeAgo}
                      </span>
                    </div>

                    <p
                      className={`text-slate-700 leading-relaxed ${
                        dimensions.isMobile ? "text-sm" : dimensions.isTablet ? "text-base" : "text-lg"
                      }`}
                    >
                      {currentAnnouncement.message}
                    </p>
                  </div>

                  <div className="ml-6 flex flex-col items-center space-y-2">
                    <div className={`text-slate-500 font-medium ${dimensions.isMobile ? "text-xs" : "text-sm"}`}>
                      {currentIndex + 1} / {totalCount}
                    </div>

                    <div className="flex space-x-1">
                      {Array.from({ length: Math.min(totalCount, 5) }).map((_, index) => (
                        <motion.div
                          key={index}
                          className={`rounded-full ${dimensions.isMobile ? "w-2 h-2" : "w-3 h-3"}`}
                          style={{
                            backgroundColor: index === currentIndex % 5 ? theme.icon : "rgba(148, 163, 184, 0.3)",
                          }}
                          animate={{
                            scale: index === currentIndex % 5 ? [1, 1.2, 1] : 1,
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 pointer-events-none"
                  style={{ borderColor: theme.border }}
                  animate={{
                    borderColor: [theme.border, theme.icon.replace("rgb", "rgba").replace(")", ", 0.6)"), theme.border],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

function getTimeAgo(timestamp: string): string {
  const now = new Date()
  const past = new Date(timestamp)
  const diffInHours = Math.floor((now.getTime() - past.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return "Just now"
  if (diffInHours < 24) return `${diffInHours}h ago`

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 7) return `${diffInDays}d ago`

  const diffInWeeks = Math.floor(diffInDays / 7)
  return `${diffInWeeks}w ago`
}
