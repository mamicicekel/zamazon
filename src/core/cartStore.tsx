import {create} from 'zustand';

interface ProductItemProps {
  title: string;
  price: number;
  thumbnail: string;
}

interface CartItem extends ProductItemProps {
  quantity: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: ProductItemProps) => void;
  removeFromCart: (item: ProductItemProps) => void;
  increaseQuantity: (item: ProductItemProps) => void;
  decreaseQuantity: (item: ProductItemProps) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  addToCart: (item) =>
    set((state) => {
      const existingItem = state.cartItems.find((cartItem) => cartItem.title === item.title);

      if (existingItem) {
        return {
          cartItems: state.cartItems.map((cartItem) =>
            cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
          ),
        };
      } else {
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
      }
    }),
  removeFromCart: (item) =>
    set((state) => ({
      cartItems: state.cartItems.filter((cartItem) => cartItem.title !== item.title),
    })),
  increaseQuantity: (item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.title === item.title ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ),
    })),
  decreaseQuantity: (item) =>
    set((state) => ({
      cartItems: state.cartItems.map((cartItem) =>
        cartItem.title === item.title ? { ...cartItem, quantity: Math.max(1, cartItem.quantity - 1) } : cartItem
      ),
    })),
}));

export const useQuantity = (title: string) => useCartStore((state) => state.cartItems.find((item) => item.title === title)?.quantity || 0);
