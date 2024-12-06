import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage'

export const useUserStore = create(persist((set) => ({
    storage: {},
    updateUserState: (payload) =>
        set(() => ({
            storage: { ...payload },
        })),
}),
    {
        name: 'use-store',
        storage: createJSONStorage(() => AsyncStorage),
        getStorage: () => require('@react-native-async-storage/async-storage').default
    }
))