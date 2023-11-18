import { Dimensions, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image } from '@/ui';
import { QuadrupleBox } from './quadruple-box';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  rating: number;
}

export const HorizontalBoxGroup = () => {
  const width = Dimensions.get('window').width;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products/');
        const shuffledProducts = response.data.products.sort(() => Math.random() - 0.5);
        setProducts(shuffledProducts);
        setLoading(false); // Veriler yüklendiğinde loading durumunu false yap
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Hata durumunda da loading durumunu false yap
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Product }) => (
    <QuadrupleBox title={item.title} price={item.price} thumbnail={item.thumbnail} rating={item.rating} />
  );

  return (
    <View className='flex-1 justify-center items-center'>
      <Text className='self-start text-xl font-semibold mt-10 mb-3 ml-4 text-gray-700'>May interest you</Text>

      {loading ? (
        <SkeletonPlaceholder>
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
        </SkeletonPlaceholder>
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          scrollEnabled={true}
        />
      )}
    </View>
  );
};
