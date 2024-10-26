export interface Country {
  id: number
  name: string
  nocCode: string //National olympic committee code like USA
  flagUrl:string
  description: string
  gold: number
  silver: number
  bronze: number
  total: number
  detail: Detail[];
}
export interface Detail {
  sportName: string
  rank: number
  medalsUrl: string
}
export interface Sport {
  sportName: string
  rank: number
  medelUrl: string

}
// src/types/index.ts
export interface User {
  id?: number
  firstName: string
  lastName: string
  email: string
  password: string
  profileImage?: string | null
}



