export interface Category {
  id: number
  tittle: string;
  image: string;
  description?: string;
  items?: Item[];
}

export interface Item {
  id: number;
  tittle: string;
  description?: string;
  image: string; 
  state: number;
  figure: number;
}

export interface figure {
  // id: number;
  temperature: string;
  state: number;
  figure: number;
}