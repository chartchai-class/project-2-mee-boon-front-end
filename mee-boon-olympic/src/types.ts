export interface Sport {
    name: string;
    gold: number;
    silver: number;
    bronze: number;
  }
  
  export interface Country {
    id: number;
    name: string;
    flag: string;
    gold: number;
    silver: number;
    bronze: number;
    total: number;
    sports: Sport[];
    showDetails: boolean;  // This tracks whether the details are shown
  }
  