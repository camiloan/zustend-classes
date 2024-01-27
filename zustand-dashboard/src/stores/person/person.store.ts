import { StateCreator, create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { firebaseStorage } from '..';

interface PersonState {
  firstName: string;
  lastName: string;
}

interface Actions {
  setFirstName: (value: string) => void;
  setLastName: (value: string) => void;
}

const storeApi: StateCreator<
  PersonState & Actions,
  [['zustand/devtools', never]]
> = (set) => ({
  firstName: 'Camilo',
  lastName: 'Bolaños',
  setFirstName: (value: string) =>
    set({ firstName: value }, false, 'setFirstName'),
  setLastName: (value: string) =>
    set({ lastName: value }, false, 'setLastName'),
});

export const usePersonStore = create<PersonState & Actions>()(
  devtools(
    persist(storeApi, {
      name: 'person-storage',
      storage: firebaseStorage,
    })
  )
);
