"use client"

import { motion } from "framer-motion"

interface LiveFooterProps {
  peopleCount: number
  activePersonName?: string
  dimensions: {
    isMobile: boolean
  }
}

export function LiveFooter({ peopleCount, activePersonName, dimensions }: LiveFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 1 }}
        className="text-center"
      >
        <div className="bg-white/85 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-white/60 max-w-5xl mx-auto">
          {/* Stats Row */}
          <div
            className={`flex items-center justify-center mb-6 ${dimensions.isMobile ? "flex-col space-y-4" : "space-x-12"}`}
          >
            <div className="text-center">
              <motion.div
                className={`font-bold text-slate-900 mb-2 ${dimensions.isMobile ? "text-4xl" : "text-6xl"}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {peopleCount}
              </motion.div>
              <div
                className={`text-slate-600 font-semibold uppercase tracking-wider ${dimensions.isMobile ? "text-sm" : "text-base"}`}
              >
                People Here Now
              </div>
            </div>

            {!dimensions.isMobile && (
              <>
                <div className="bg-gradient-to-b from-transparent via-slate-400 to-transparent w-px h-20" />
                <div className="text-center">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-3 w-6 h-6 shadow-lg"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <div className="text-slate-600 font-semibold uppercase tracking-wider text-base">Live Updates</div>
                </div>
                <div className="bg-gradient-to-b from-transparent via-slate-400 to-transparent w-px h-20" />
                <div className="text-center w-1/3">
                  <div className="font-bold text-slate-900 mb-2 text-3xl">{activePersonName || "?"}</div>
                  <div className="text-slate-600 font-semibold uppercase tracking-wider text-base">In Focus</div>
                </div>
              </>
            )}
          </div>

          {!dimensions.isMobile && (
            <>
              <div className="border-t border-slate-200 pt-6 text-center">
                <p className={`text-slate-700 leading-relaxed w-full mx-auto text-sm`}>
                  This is a <strong>live visualization</strong> of everyone currently at Inovus Labs. Each bubble
                  represents a real person - students working on projects, mentors providing guidance, entrepreneurs
                  building startups, and visitors exploring ideas. As you watch, bubbles may grow or shrink as people
                  join or leave the space. The active person bubble highlights someone currently in focus, showing their
                  name and role. This dynamic display captures the vibrant, collaborative energy of our innovation hub in
                  real-time.
                </p>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
