export interface IQuestion {
  id: number;
  question: string;
  answer: string;
  point: number;
  isSolved: boolean;
  themeId: number;
  createdAt: Date;
  updatedAt: Date;
  // Themes: ITheme[]
}

export interface ITheme {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  Questions: IQuestion[]
}
