"use client"

import { motion } from "framer-motion"
import { getDepartmentStats } from "@/lib/departmentColors"

interface DepartmentLegendProps {
  people: Array<{ department: string }>
  dimensions: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
  }
}

export function DepartmentLegend({ people, dimensions }: DepartmentLegendProps) {
  const departmentStats = getDepartmentStats(people)

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, delay: 2 }}
      className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-30 ${dimensions.isMobile ? "hidden" : ""}`}
    >
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/60 min-w-[200px]">
        <h3 className={`font-semibold text-slate-900 mb-4 text-center ${dimensions.isTablet ? "text-lg" : "text-xl"}`}>
          Departments
        </h3>

        <div className="space-y-3">
          {departmentStats.map(({ department, count, theme }) => (
            <motion.div
              key={department}
              className="flex items-center justify-between"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center space-x-3">
                <motion.div
                  className={`rounded-full ${dimensions.isTablet ? "w-4 h-4" : "w-5 h-5"}`}
                  style={{ backgroundColor: theme.primary }}
                  animate={{
                    boxShadow: [`0 0 0 0 ${theme.glow}`, `0 0 0 4px ${theme.glow}`, `0 0 0 0 ${theme.glow}`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: Math.random() * 2,
                  }}
                />
                <span className={`font-medium text-slate-700 ${dimensions.isTablet ? "text-sm" : "text-base"}`}>
                  {department}
                </span>
              </div>

              <motion.span
                className={`font-bold rounded-full px-2 py-1 text-white ${dimensions.isTablet ? "text-xs" : "text-sm"}`}
                style={{ backgroundColor: theme.primary }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: Math.random() * 3,
                }}
              >
                {count}
              </motion.span>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="flex justify-between items-center">
            <span className={`text-slate-600 font-medium ${dimensions.isTablet ? "text-sm" : "text-base"}`}>Total</span>
            <span className={`font-bold text-slate-900 ${dimensions.isTablet ? "text-lg" : "text-xl"}`}>
              {people.length}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
