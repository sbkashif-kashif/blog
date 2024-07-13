export interface UserState {
    loading: boolean;
    error: string | null;
    success: string | null;
}
  
export interface RootState {
    user: UserState;
}