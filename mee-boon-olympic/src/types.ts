export interface Medal {
  id: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
}
export interface SportDetail {
  id: number;
  sportName: string;
  rankPosition: number;
  medalsUrl: string;
}
export interface Country {
  id: number;
  name: string;
  nocCode: string; // National Olympic Committee code เช่น "USA"
  flagUrl: string;
  basicInfo: string; // เดิมคุณใช้ description
  ownSports: SportDetail[];
  medals: Medal[];
}