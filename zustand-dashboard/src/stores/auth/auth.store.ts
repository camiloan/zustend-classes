import { StateCreator, create } from 'zustand';
import { AuthStatus, User } from '../../interfaces';
import { AuthService } from '../../services/auth.service';
import { devtools, persist } from 'zustand/middleware';

export interface AuthState {
  status: AuthStatus;
  token?: string;
  user?: User;
  loginUser: (email: string, password: string) => Promise<void>;
  checkAuthStatus: () => void;
  logoutUser: () => void;
}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: undefined,
  user: undefined,
  loginUser: async (email: string, password: string) => {
    try {
      const { token, ...user } = await AuthService.login(email, password);
      set({ status: 'authorized', token: token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
      throw 'Unauthorized';
    }
  },
  checkAuthStatus: async () => {
    try {
      const { token, ...user } = await AuthService.checkStatus();
      set({ status: 'authorized', token, user });
    } catch (error) {
      set({ status: 'unauthorized', token: undefined, user: undefined });
    }
  },
  logoutUser: () => {
    set({ status: 'unauthorized', token: undefined, user: undefined });
  },
});

export const useAuthStore = create<AuthState>()(
  persist(devtools(storeApi), { name: 'auth-storage' })
);
