import { View } from 'react-native';
import React, { useEffect } from 'react';
import SplashScreen from '../components/organisms/SplashScreen';
import { useRouter } from 'expo-router';
import { Session } from '../hooks/Auth';
import { useAppDefaulstore } from '~/Store/holders/AppDefault';
import { useUserStore } from '~/Store/holders/UserStore';

const Index = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.storage);
  const appState = useAppDefaulstore((state) => state.storage);
  const hydrated = useAppDefaulstore((state) => state.hydrated);
  const isAuthenticated = Session(user);

  useEffect(() => {
    setTimeout(() => {
      if (hydrated) {
        if (appState?.getStarted) {
          if (appState.location === "") {
            if (isAuthenticated.status === "authenticated") {
              router.replace("/(screen)");
            } else {
              router.replace("/(auth)/login");
            }
          } else {
            router.replace(appState.location);
          }
        } else {
          router.replace("/(auth)/getStarted");
        }
      }
    }, 3000);
  }, [hydrated, appState, isAuthenticated, router]);

  return (
    <View className="bg-white flex-1">
      <SplashScreen />
    </View>
  );  
};

export default Index;
