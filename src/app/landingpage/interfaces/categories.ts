export interface Category {
  id: number
  tittle: string;
  image: string;
  items?: Item[];
}

export interface Item {
  id: number;
  tittle: string;
  description?: string;
  image: string; 
}