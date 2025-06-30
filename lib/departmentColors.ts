export interface DepartmentTheme {
  name: string
  primary: string
  secondary: string
  accent: string
  border: string
  glow: string
  text: string
  background: string
}

export const departmentThemes: Record<string, DepartmentTheme> = {
  Engineering: {
    name: "Engineering",
    primary: "rgb(59, 130, 246)", // Blue
    secondary: "rgb(37, 99, 235)",
    accent: "rgb(147, 197, 253)",
    border: "rgba(59, 130, 246, 0.5)",
    glow: "rgba(59, 130, 246, 0.3)",
    text: "rgb(30, 64, 175)",
    background: "rgba(59, 130, 246, 0.1)",
  },
  Design: {
    name: "Design",
    primary: "rgb(236, 72, 153)", // Pink
    secondary: "rgb(219, 39, 119)",
    accent: "rgb(251, 182, 206)",
    border: "rgba(236, 72, 153, 0.5)",
    glow: "rgba(236, 72, 153, 0.3)",
    text: "rgb(157, 23, 77)",
    background: "rgba(236, 72, 153, 0.1)",
  },
  Product: {
    name: "Product",
    primary: "rgb(168, 85, 247)", // Purple
    secondary: "rgb(147, 51, 234)",
    accent: "rgb(196, 181, 253)",
    border: "rgba(168, 85, 247, 0.5)",
    glow: "rgba(168, 85, 247, 0.3)",
    text: "rgb(109, 40, 217)",
    background: "rgba(168, 85, 247, 0.1)",
  },
  Data: {
    name: "Data",
    primary: "rgb(34, 197, 94)", // Green
    secondary: "rgb(22, 163, 74)",
    accent: "rgb(134, 239, 172)",
    border: "rgba(34, 197, 94, 0.5)",
    glow: "rgba(34, 197, 94, 0.3)",
    text: "rgb(21, 128, 61)",
    background: "rgba(34, 197, 94, 0.1)",
  },
  Security: {
    name: "Security",
    primary: "rgb(239, 68, 68)", // Red
    secondary: "rgb(220, 38, 38)",
    accent: "rgb(252, 165, 165)",
    border: "rgba(239, 68, 68, 0.5)",
    glow: "rgba(239, 68, 68, 0.3)",
    text: "rgb(185, 28, 28)",
    background: "rgba(239, 68, 68, 0.1)",
  },
}

export function getDepartmentTheme(department: string): DepartmentTheme {
  return departmentThemes[department] || departmentThemes.Engineering
}
