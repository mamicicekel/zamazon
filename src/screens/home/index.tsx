import React, {useState} from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView, Text, Input, ScrollView, View, Image, TouchableOpacity } from '@/ui'
import { NCarousel } from './carousel';
import { QuadrupleBoxGroup } from './quadruple-box-group';
import { HorizontalBoxGroup } from './horizontal-box-group';
import { useNavigation } from '@react-navigation/native';
import { Website } from '@/ui/icons';

export const Home = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <ScrollView>
        <View className='mx-4 '>
          <Input
            placeholder='Search products'
            onFocus={() => navigation.navigate('Search')}
          />
        </View>
        <NCarousel/>
        <HorizontalBoxGroup/>
        <QuadrupleBoxGroup/>
      </ScrollView>
    </SafeAreaView>
  )
}