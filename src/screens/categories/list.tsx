import React, { useEffect, useState } from 'react';
import {  FlatList, Dimensions } from 'react-native';
import { Container } from './container';
import { fetchCategories } from '@/api';
import { View, Text } from '@/ui';
import { categoryImages } from './images';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const List = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategories()
        const NewData = response.map(mapCategoryName)
        setCategories(NewData);
        setLoading(false);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const mapCategoryName = (category: string) => {
    const categoryMappings: Record<string, string> = {
      'smartphones': 'Smart Phones',
      'laptops': 'Laptops',
      'fragrances': 'Fragrances',
      'skincare': 'Skincare',
      'groceries': 'Groceries',
      'home-decoration': 'Home Decoration',
      'furniture': 'Furniture',
      'tops': 'Tops',
      'womens-dresses': 'Womens Dresses',
      'womens-shoes': 'Womens Shoes',
      'mens-shirts': 'Mens Shirts',
      'mens-shoes': 'Mens Shoes',
      'mens-watches': 'Mens Watches',
      'womens-watches': 'Womens Watches',
      'womens-bags': 'Womens Bags',
      'womens-jewellery': 'Womens Jewellery',
      'sunglasses': 'Sunglasses',
      'automotive': 'Automotive',
      'motorcycle': 'Motorcycle',
      'lighting': 'Lighting',
    };

    return categoryMappings[category] || category;
  };

  const renderItem = ({ item }: { item: string }) => {
    const categoryIndex = categories.findIndex(category => category === item);

    // Get the corresponding image if the index is valid
    const categoryImage = categoryIndex !== -1 ? categoryImages[categoryIndex]?.url : undefined;

    return <Container category={item} image={categoryImage}/>
  };

  return (
      <View className=' px-4'>
        
        {loading ? <SkeletonPlaceholder>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap:'wrap'}}>
            {categories.map((_, index) => (
              <View key={index} style={{ marginHorizontal: 10 }}>
                <View style={{ width: Dimensions.get('screen').width/3.9, height: 126, borderRadius: 10 , marginBottom:10}} />
              </View>
            ))}
          </View>
        </SkeletonPlaceholder>: 
      <FlatList
      data={categories}
      renderItem={renderItem}
      keyExtractor={(item) => item}
      horizontal={false}
    numColumns={3}
    scrollEnabled={false}
    columnWrapperStyle={{ gap: 10 }}
    contentContainerStyle={{ gap: 10 }}
    />}
      </View>
  );
};
