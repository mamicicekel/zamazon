import { setItem, getItem, removeItem } from '../storage';

const USERNAME_KEY = 'userName';
const SELECTED_IMAGE_KEY = 'selectedImage';

export const setUserNameToStorage = (userName: string) => {
  setItem<string>(USERNAME_KEY, userName);
};

export const getUserNameFromStorage = (): string | null => {
  return getItem<string>(USERNAME_KEY);
};

export const setSelectedImageToStorage = (imageUri: string | null) => {
  setItem<string | null>(SELECTED_IMAGE_KEY, imageUri);
};

export const getSelectedImageFromStorage = (): string | undefined => {
  const uri = getItem<string | null>(SELECTED_IMAGE_KEY);
  return uri !== null ? uri : undefined;
};

export const removeUserNameFromStorage = () => {
  removeItem(USERNAME_KEY);
};

export const removeSelectedImageFromStorage = () => {
  removeItem(SELECTED_IMAGE_KEY);
};
