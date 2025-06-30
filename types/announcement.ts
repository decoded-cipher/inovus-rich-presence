export interface Announcement {
  id: number
  type: "achievement" | "project" | "blog" | "event" | "milestone" | "partnership" | "recognition" | "product" | "alert"
  title: string
  message: string
  timestamp: string
  priority: "low" | "medium" | "high"
}

export interface AnnouncementTheme {
  background: string
  border: string
  icon: string
  glow: string
}
