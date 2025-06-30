"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface CompanyHeaderProps {
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function CompanyHeader({ dimensions }: CompanyHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-20 p-8 md:p-12 lg:p-16">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="text-center"
      >
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8 mb-6">
            <Image
              src="/placeholder.svg?height=120&width=120"
              alt="Inovus Labs"
              width={120}
              height={120}
              className="opacity-90"
            />
            <div className="text-left">
              <h1
                className={`font-bold text-slate-900 tracking-tight ${
                  dimensions.isMobile ? "text-4xl" : dimensions.isTablet ? "text-7xl" : "text-8xl"
                }`}
              >
                INOVUS LABS
              </h1>
              <div
                className={`text-slate-600 font-light ${
                  dimensions.isMobile ? "text-lg" : dimensions.isTablet ? "text-3xl" : "text-4xl"
                }`}
              >
                Innovation • Collaboration • Excellence
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-center space-x-6 mb-4">
            <motion.div
              className={`bg-emerald-500 rounded-full ${dimensions.isMobile ? "w-4 h-4" : dimensions.isTablet ? "w-7 h-7" : "w-8 h-8"}`}
              animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
            <span
              className={`text-slate-900 font-semibold ${
                dimensions.isMobile ? "text-2xl" : dimensions.isTablet ? "text-4xl" : "text-5xl"
              }`}
            >
              LIVE PRESENCE
            </span>
          </div>
          <p
            className={`text-slate-700 font-medium ${
              dimensions.isMobile ? "text-xl" : dimensions.isTablet ? "text-3xl" : "text-4xl"
            }`}
          >
            Our Team • Right Now • Making It Happen
          </p>
        </div>

        <div
          className={`text-slate-500 font-light space-y-2 ${
            dimensions.isMobile ? "text-base" : dimensions.isTablet ? "text-xl" : "text-2xl"
          }`}
        >
          <p>Welcome to Our Innovation Hub</p>
          <p className="text-slate-400">Ground Floor • Follow the Steps • Turn Left</p>
        </div>

        <div className="mt-8 flex justify-center">
          <div
            className={`bg-gradient-to-r from-transparent via-slate-300 to-transparent ${
              dimensions.isMobile ? "w-32 h-px" : dimensions.isTablet ? "w-56 h-px" : "w-64 h-px"
            }`}
          />
        </div>
      </motion.div>
    </div>
  )
}
