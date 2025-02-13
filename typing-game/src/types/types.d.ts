export interface CodeFunctionText {
  id: number;
  codeString: string;
  language: string;
  description: string;
}

export enum CodeType {
  JS = "JavaScript",
  REACT = "React",
  TS = "TypeScript",
}
