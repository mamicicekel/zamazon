import { Dimensions } from 'react-native'
import React from 'react'
import { SafeAreaView, Text, Image, View, ScrollView, Button } from '@/ui'
import { Item } from './item';
import { ItemsContainer } from './items-container';
import { useAuth } from '@/core';
import LinearGradient from 'react-native-linear-gradient';
import { useColorScheme } from 'nativewind';
import colors from '@/ui/theme/colors';
import { Env } from '@env';
import { Website } from '@/ui/icons';
import { supabase } from '@/api';

export const Profile = () => {
  const signOut = useAuth.use.signOut();
  const signOutt = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      signOut()
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Sign Out error:', error);
    }
  };
  const { colorScheme } = useColorScheme();
  const iconColor =
    colorScheme === 'dark' ? colors.neutral[400] : colors.neutral[500];
  return (
    <SafeAreaView>
      <ScrollView>
      <LinearGradient colors={['#ffb100', '#fa714d']} style={{height:Dimensions.get('screen').height/3.5}} >
        <View className='flex-1 justify-center items-center'>
        <Image 
          className="h-20 w-20 rounded-full"
          source={require('../../../assets/default-profile.jpg')}
        />
        <Text className='text-white font-semibold text-2xl mt-5'>Username</Text>
        </View>
      </LinearGradient>
      <View className="flex-1 px-2 pt-10">
      <ItemsContainer>
        <Item icon={<Website/>} text="Siparişlerim"/>
        <Item icon={<Website/>} text="Sana Özel Fırsatlar"/>
        <Item icon={<Website/>} text="Kuponlarım"/>
        <Item icon={<Website/>} text="Beğendiklerim"/>
        <Item icon={<Website/>} text="Değerlendirmelerim"/>
        <Item icon={<Website/>} text="Ayarlarım"/>
        <Item icon={<Website/>} text="Adreslerim"/>
        <Item icon={<Website/>} text="Uygulama Geri Bildirmi"/>
        <Item icon={<Website/>} text="Müşteri Hizmetleri"/>
      </ItemsContainer>
      <Button variant='signOut' label='Çıkış yap' onPress={signOutt}/>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}