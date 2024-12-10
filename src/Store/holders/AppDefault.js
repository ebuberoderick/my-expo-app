import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAppDefaulstore = create(
  persist(
    (set) => ({
      storage: {
        location: '',
        getStarted: false,
      },
      hydrated: false,
      updateAppState: (payload) =>
        set((state) => ({
          storage: { ...state.storage, ...payload },
        })),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'app-default',
      storage: createJSONStorage(() => AsyncStorage),
      getStorage: () => require('@react-native-async-storage/async-storage').default,
      onRehydrateStorage: () => (state) => {
        return (state?.setHydrated(true));
      },
    }
  )
);
