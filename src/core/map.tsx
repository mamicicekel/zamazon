export const mapCategoryName = (category: string) => {
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

export const mapReverseCategoryName = (category: string) => {
  const categoryMappings: Record<string, string> = {
    'Smart Phones': 'smartphones',
    'Laptops': 'laptops',
    'Fragrances': 'fragrances',
    'Skincare': 'skincare',
    'Groceries': 'groceries',
    'Home Decoration': 'home-decoration',
    'Furniture': 'furniture',
    'Tops': 'tops',
    'Womens Dresses': 'womens-dresses',
    'Womens Shoes': 'womens-shoes',
    'Mens Shirts': 'mens-shirts',
    'Mens Shoes': 'mens-shoes',
    'Mens Watches': 'mens-watches',
    'Womens Watches': 'womens-watches',
    'Womens Bags': 'womens-bags',
    'Womens Jewellery': 'womens-jewellery',
    'Sunglasses': 'sunglasses',
    'Automotive': 'automotive',
    'Motorcycle': 'motorcycle',
    'Lighting': 'lighting',
  };

  return categoryMappings[category] || category;
};