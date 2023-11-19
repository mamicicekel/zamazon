import React from 'react'
import { View, Input, SafeAreaView, Text, ScrollView } from '@/ui'
import { CategoryList } from './category-list'

export const Categories = () => {
  return (
    <SafeAreaView>
      <ScrollView>
      <View className='mx-4'>
        <Input
          placeholder='Search products'
        />
        </View>
      <CategoryList/>
      </ScrollView>
    </SafeAreaView>
  )
}