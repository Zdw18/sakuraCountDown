export interface User {
  id: string;
  lineUserId: string;
  displayName: string;
  pictureUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpsertUserInput {
  lineUserId: string;
  displayName: string;
  pictureUrl?: string;
}
