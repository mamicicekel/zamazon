import { Dimensions, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { View, Text, Image } from '@/ui'
import { QuadrupleBox } from './quadruple-box';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { fetchSmartPhones } from '@/api';

interface Product {
  id: number;
  title: string;
  description: string
  price: number;
  discountPercentage: number
  rating: number;
  stock:number
  brand: string
  category: string
  thumbnail: string;
  images: string[];
}

export const QuadrupleBoxGroup = () => {
  const width = Dimensions.get('window').width;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSmartPhones = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/category/smartphones');
        
        const productsWithImages = response.data.products.map((product: Product) => {
          const reversedImages = product.images.slice().reverse(); // Create a copy and reverse it
          const thumbnail = reversedImages.length > 0 ? reversedImages[0] : '';
          return {
            ...product,
            thumbnail,
            images: reversedImages,
          };
        });
  
        setProducts(productsWithImages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
  
    fetchSmartPhones();
  }, []);
  

  const renderItem = ({ item }: { item: Product }) => (
    <QuadrupleBox title={item.title} price={item.price} thumbnail={item.thumbnail} rating={item.rating} images={item.images} description={item.description} brand={item.brand} stock={item.stock} discountPercentage={item.discountPercentage} id={0} category={item.category}/>
  );

  return (
    <View className=''>
      <Text className='self-start text-xl font-semibold mt-10 mb-3 ml-4 text-gray-700'>Opportunities for you</Text>
      {loading ? <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            {[0, 1, 2, 3].map((_, index) => (
              <View key={index} style={{ marginHorizontal: 10 }}>
                <View style={{ width: Dimensions.get('screen').width/2, height: 160, borderRadius: 10 }} />
                <View style={{ marginTop: 8, width: 100, height: 16, borderRadius: 8 }} />
                <View style={{ marginTop: 4, width: 80, height: 16, borderRadius: 8 }} />
                <View style={{ marginTop: 4, width: 60, height: 16, borderRadius: 8 }} />
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>: 
      <FlatList
      data={products.slice(0,4)}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      horizontal={false}
      numColumns={2}
      scrollEnabled={false}
      columnWrapperStyle={{ gap: 10 }}
    />}
    </View>
  )
}
