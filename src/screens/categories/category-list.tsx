import React, { useEffect, useState } from 'react';
import {  FlatList, Dimensions } from 'react-native';
import { Container } from './container';
import { fetchCategories } from '@/api';
import { View, Text, TouchableOpacity } from '@/ui';
import { categoryImages } from './images';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { mapCategoryName, mapReverseCategoryName } from '@/core';
import { useNavigation } from '@react-navigation/native';

export const CategoryList = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

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


  const renderItem = ({ item }: { item: string }) => {
    const categoryIndex = categories.findIndex(category => category === item);
    const categoryImage = categoryIndex !== -1 ? categoryImages[categoryIndex]?.url : undefined;

    const handleCategoryPress = () => {
      const mappedCategory = mapReverseCategoryName(item);
      const displayCategory = mapCategoryName(mappedCategory); 
      navigation.navigate('ProductsList', { selectedCategory: mappedCategory, displayCategory });
    };

    return (
      <TouchableOpacity onPress={handleCategoryPress}>
        <Container category={item} image={categoryImage} />
      </TouchableOpacity>
    );
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
