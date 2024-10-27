export interface Medal {
  id: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
}

export interface SportDetail {
  id: number;
  sportName: string;
  rankPosition: number;  // Change rank to rankPosition
  medalsUrl: string;
}

export interface Country {
  id: number;
  name: string;
  nocCode: string;
  flagUrl: string;
  basicInfo: string;  // Updated from description
  ownSports: SportDetail[];  // Changed from 'detail' to 'ownSports'
  medals: Medal[];  // Changed from 'medal' to 'medals'
}
// src/types/index.ts
export interface User {
  id: number
  username: string
  firstName: string
  lastName: string
  email: string
  roles: string[]
  password: string
  profileImage?: string | null
}




export interface Comment {}



