import { Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@/ui'
import { QuadrupleBox } from './quadruple-box';
import axios from 'axios';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export const QuadrupleBoxGroup = () => {
  const width = Dimensions.get('window').width;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/category/smartphones');
        setProducts(response.data.products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <QuadrupleBox title={item.title} price={item.price} thumbnail={item.thumbnail} rating={item.rating}/>
  );

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='self-start text-xl font-semibold mt-10 mb-3 ml-4 text-gray-700'>Opportunities for you</Text>
      <FlatList
      data={products.slice(0,4)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 10 }}
    />
    </View>
  )
}
