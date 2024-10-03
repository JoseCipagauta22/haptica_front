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


  