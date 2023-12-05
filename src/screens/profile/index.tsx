import { Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, Image, View, ScrollView, Button, TouchableOpacity } from '@/ui'
import { Item } from './item';
import { ItemsContainer } from './items-container';
import { useAuth } from '@/core';
import LinearGradient from 'react-native-linear-gradient';
import { Website } from '@/ui/icons';
import { supabase } from '@/api';
import { launchImageLibrary, ImagePickerResponse, MediaType } from 'react-native-image-picker';
import { decode } from "base64-arraybuffer";
import RNFS from 'react-native-fs';
import { setUserNameToStorage, getUserNameFromStorage, setSelectedImageToStorage, getSelectedImageFromStorage } from '@/core/hooks/user-storage'; // Eklenen satır

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
  
        if (error) {
          console.error('Hata:', error);
        } else if (data) {
          const userId = data.session?.user.id;
          const { data: userData, error: userError } = await supabase
            .from('Users')
            .select('name')
            .eq('id', userId)
            .limit(1);
  
          if (userError) {
            console.error('Hata:', userError);
          } else if (userData && userData.length > 0) {
            const fetchedUserName = userData[0].name;
            setUserNameToStorage(fetchedUserName); 
          }
        }
      } catch (error) {
        console.error('Hata:', error);
      }
    };

    fetchData()
  }, []);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const options = {
      mediaType: 'photo' as MediaType,
    };

    await launchImageLibrary(options, async (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedUri = response.assets[0]?.uri || null;
        setSelectedImage(selectedUri);
        setSelectedImageToStorage(selectedUri)
        await uploadImageToSupabase(selectedUri);
      }
    });
  };

  const uploadImageToSupabase = async (uri: string | null) => {
    if (uri) {
      const extension = uri.split('.').pop()
      const fileName = `${Date.now()}.${extension}`
      const base64 = await RNFS.readFile(uri, 'base64')
      const { data: uploadData, error } = await supabase.storage.from('images').upload(`profile-images/${fileName}`, decode(base64), {
        cacheControl: '3600',
        upsert: false,
        contentType: 'image/*',
      });
  
      if (error) {
        console.error('Error uploading image to Supabase:', error);
      } else {
        console.log('Image uploaded successfully:', uploadData);
      }
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <LinearGradient colors={['#ffb100', '#fa714d']} style={{ height: Dimensions.get('screen').height / 3.5 }} >
          <View className='flex-1 justify-center items-center'>
            <TouchableOpacity onPress={pickImage} >
              {getSelectedImageFromStorage() ? (
                <Image
                  className="h-20 w-20 rounded-full"
                  source={{ uri: getSelectedImageFromStorage() }}
                />
              ) : (
                <Image
                  className="h-20 w-20 rounded-full"
                  source={require('../../../assets/default-profile.jpg')}
                />
              )}

            </TouchableOpacity>
            <Text className='text-white font-semibold text-2xl mt-5'>{getUserNameFromStorage()}</Text>
          </View>
        </LinearGradient>
        <View className="flex-1 px-2 pt-10">
          <ItemsContainer>
            <Item icon={<Website />} text="Siparişlerim" />
            <Item icon={<Website />} text="Sana Özel Fırsatlar" />
            <Item icon={<Website />} text="Kuponlarım" />
            <Item icon={<Website />} text="Beğendiklerim" />
            <Item icon={<Website />} text="Değerlendirmelerim" />
            <Item icon={<Website />} text="Ayarlarım" />
            <Item icon={<Website />} text="Adreslerim" />
            <Item icon={<Website />} text="Uygulama Geri Bildirmi" />
            <Item icon={<Website />} text="Müşteri Hizmetleri" />
          </ItemsContainer>
          <Button variant='signOut' label='Çıkış yap' onPress={signOutt} />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
