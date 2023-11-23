import React from 'react'
import { View, Text } from '@/ui'

interface QueryProps {
  query: string
}

export const PrevQueryBox: React.FC<QueryProps> = ({query}) => {
  return (
    <View className='border-primary-600 border-[1px] rounded-full px-2 flex-row justify-between w-[100]'>
      <Text>{query}</Text>
    </View>
  )
}