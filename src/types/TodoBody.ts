export type TodoBody = {
  title: string;
  description?: string;
  priority?: number;
  tag?: string[];
  date?: number;
  userId: string;
  // isCompleted: boolean;
};
