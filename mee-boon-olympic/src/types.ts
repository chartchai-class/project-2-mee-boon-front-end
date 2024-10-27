// src/types/index.ts

export interface Medal {
  id: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
}

export interface SportDetail {
  id: number;
  sportName: string;
  rank: number;
  medalUrl: string;
}

export interface Country {
  id: number;
  name: string;
  nocCode: string;
  flagUrl: string;
  description: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
  detail: SportDetail[];
  medal: Medal[];
}

export interface Sport {
  id: number;
  sportName: string;
  rank: number;
  medalUrl: string;
}