export interface LoginResponse {
  token: string,
  roles: string[],
  userId: number
}