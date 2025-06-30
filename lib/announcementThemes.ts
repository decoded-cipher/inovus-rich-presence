import type { AnnouncementTheme } from "@/types/announcement"

export const announcementThemes: Record<string, AnnouncementTheme> = {
  achievement: {
    background: "rgba(245, 158, 11, 0.1)", // Amber
    border: "rgba(245, 158, 11, 0.3)",
    icon: "rgb(245, 158, 11)",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  project: {
    background: "rgba(59, 130, 246, 0.1)", // Blue
    border: "rgba(59, 130, 246, 0.3)",
    icon: "rgb(59, 130, 246)",
    glow: "rgba(59, 130, 246, 0.2)",
  },
  blog: {
    background: "rgba(168, 85, 247, 0.1)", // Purple
    border: "rgba(168, 85, 247, 0.3)",
    icon: "rgb(168, 85, 247)",
    glow: "rgba(168, 85, 247, 0.2)",
  },
  event: {
    background: "rgba(34, 197, 94, 0.1)", // Green
    border: "rgba(34, 197, 94, 0.3)",
    icon: "rgb(34, 197, 94)",
    glow: "rgba(34, 197, 94, 0.2)",
  },
  milestone: {
    background: "rgba(236, 72, 153, 0.1)", // Pink
    border: "rgba(236, 72, 153, 0.3)",
    icon: "rgb(236, 72, 153)",
    glow: "rgba(236, 72, 153, 0.2)",
  },
  partnership: {
    background: "rgba(99, 102, 241, 0.1)", // Indigo
    border: "rgba(99, 102, 241, 0.3)",
    icon: "rgb(99, 102, 241)",
    glow: "rgba(99, 102, 241, 0.2)",
  },
  recognition: {
    background: "rgba(245, 158, 11, 0.1)", // Amber
    border: "rgba(245, 158, 11, 0.3)",
    icon: "rgb(245, 158, 11)",
    glow: "rgba(245, 158, 11, 0.2)",
  },
  product: {
    background: "rgba(20, 184, 166, 0.1)", // Teal
    border: "rgba(20, 184, 166, 0.3)",
    icon: "rgb(20, 184, 166)",
    glow: "rgba(20, 184, 166, 0.2)",
  },
}

export function getAnnouncementTheme(type: string): AnnouncementTheme {
  return announcementThemes[type] || announcementThemes.project
}
