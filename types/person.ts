export interface Person {
  id: number
  name: string
  role: string
  department: string
  photo: string
  x: number
  y: number
  size: number
  targetSize: number
  baseSize: number
  vx: number
  vy: number
  speed: number
  showDetails: boolean
  detailsTimer: number
  isColliding: boolean
  joinedAt: number | null
  isNewJoin: boolean
}

export interface PersonData {
  id: number
  name: string
  role: string
  department: string
  photo: string
  joinedAt?: number | null
}
