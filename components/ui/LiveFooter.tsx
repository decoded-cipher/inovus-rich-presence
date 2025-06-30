"use client"

import { motion } from "framer-motion"

interface LiveFooterProps {
  peopleCount: number
  activePersonName?: string
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function LiveFooter({ peopleCount, activePersonName, dimensions }: LiveFooterProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, delay: 1 }}
        className="text-center"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-10 shadow-xl border border-white/60 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-12">
            <div className="text-center">
              <motion.div
                className={`font-bold text-slate-900 mb-3 ${
                  dimensions.isMobile ? "text-5xl" : dimensions.isTablet ? "text-7xl" : "text-8xl"
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                {peopleCount}
              </motion.div>
              <div
                className={`text-slate-600 font-semibold uppercase tracking-wider ${
                  dimensions.isMobile ? "text-sm" : dimensions.isTablet ? "text-lg" : "text-xl"
                }`}
              >
                People Present
              </div>
            </div>

            <div
              className={`bg-gradient-to-b from-transparent via-slate-400 to-transparent ${
                dimensions.isMobile ? "w-px h-16" : dimensions.isTablet ? "w-px h-20" : "w-px h-24"
              }`}
            />

            <div className="text-center">
              <motion.div
                className={`bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 ${
                  dimensions.isMobile ? "w-5 h-5" : dimensions.isTablet ? "w-7 h-7" : "w-8 h-8"
                }`}
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div
                className={`text-slate-600 font-semibold uppercase tracking-wider ${
                  dimensions.isMobile ? "text-sm" : dimensions.isTablet ? "text-lg" : "text-xl"
                }`}
              >
                Live Network
              </div>
            </div>

            {!dimensions.isMobile && (
              <>
                <div
                  className={`bg-gradient-to-b from-transparent via-slate-400 to-transparent ${
                    dimensions.isTablet ? "w-px h-20" : "w-px h-24"
                  }`}
                />
                <div className="text-center">
                  <div className={`font-bold text-slate-900 mb-3 ${dimensions.isTablet ? "text-3xl" : "text-4xl"}`}>
                    {activePersonName || "—"}
                  </div>
                  <div
                    className={`text-slate-600 font-semibold uppercase tracking-wider ${
                      dimensions.isTablet ? "text-lg" : "text-xl"
                    }`}
                  >
                    Spotlight
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
