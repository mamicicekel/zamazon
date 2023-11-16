import { View } from 'react-native'
import React from 'react'
import { SafeAreaView, Text } from '@/ui'
import { Item } from '../settings/item';
import { ItemsContainer } from '../settings/items-container';
import { useAuth } from '@/core';
export const Profile = () => {
  const signOut = useAuth.use.signOut();
  return (
    <SafeAreaView>
      <Text>Profile</Text>
      <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
    </SafeAreaView>
  )
}