export interface LoginResponse {
  message: string;
  data: {
    user: {
      id: string;
      lineUserId: string;
      displayName: string;
      pictureUrl?: string;
      createdAt: string;
      updatedAt: string;
    };
    sessionKey: string;
  };
}
