import { create } from 'zustand';

export type LoginMethod = 'google' | 'email' | 'github' | 'metamask' | 'avatar';

interface User {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  loginMethod: LoginMethod;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  login: (method: LoginMethod, userData?: Partial<User>) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  user: null,

  login: (method, userData) => {
    const defaultUser: User = {
      id: `user-${Date.now()}`,
      name: 
        method === 'google' ? 'Google User' 
        : method === 'email' ? 'Email User' 
        : method === 'github' ? 'GitHub User'
        : method === 'metamask' ? 'MetaMask User' 
        : 'Metaverse Avatar',
      email: method === 'email' ? 'user@example.com' : method === 'github' ? 'user@github.com' : undefined,
      loginMethod: method,
      ...userData,
    };
    set({ isAuthenticated: true, user: defaultUser });
  },

  logout: () => {
    set({ isAuthenticated: false, user: null });
  },
}));

