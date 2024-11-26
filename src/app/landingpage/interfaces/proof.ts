export interface Question {
    id: number
    question: string;
    answers?: Answer[];
  }
  
  export interface Answer {
    id: number;
    answer: string;
    rightAnswer: boolean;
    isChecked?: boolean;
  }

  export interface User {
    name: string,
    numDoc: string,
    role: string
  }


  