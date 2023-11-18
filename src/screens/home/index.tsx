import React from 'react'
import { Dimensions } from 'react-native';
import { SafeAreaView, Text, Input, ScrollView, View, Image } from '@/ui'
import { NCarousel } from './carousel';
import { QuadrupleBoxGroup } from './quadruple-box-group';

export const Home = () => {
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View className='mx-4'>
        <Input
          placeholder='Search products'
        />
        </View>
        <NCarousel/>
        <QuadrupleBoxGroup/>
      </ScrollView>
    </SafeAreaView>
  )
}