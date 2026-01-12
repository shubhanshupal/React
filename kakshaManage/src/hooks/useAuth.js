export const useAuth = () => ({ isAuthenticated: !!localStorage.getItem("token") });
