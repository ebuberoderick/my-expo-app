import React from 'react'
import { Tabs, useRouter } from 'expo-router'
import TabBar from '../../components/organisms/TabBar'

const _layout = () => {
  const router = useRouter()
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={props => <TabBar {...props} />}>
      <Tabs.Screen name='index' />
      <Tabs.Screen name='group' />
      <Tabs.Screen name='post' listeners={() => ({
        tabPress: (e) => {
          e.preventDefault()
          router.push("/extars/post")
        }
      })} />
      <Tabs.Screen name='chat' />
      <Tabs.Screen name='profile' />
    </Tabs>
  )
}

export default _layout