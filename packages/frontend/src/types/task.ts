export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
