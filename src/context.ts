import React from "react";
import { Item } from "./redux/slices/itemsSlice";

interface IAppContext {
  cartItems: Item[];
  favoriteItems: Item[];
  isLoading: boolean;
  cartItemCheck: (string: string) => boolean;
  favoriteItemCheck: (string: string) => boolean;
  onAddToCart: (obj: Item) => void;
  onAddToFavorites: (obj: Item) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AppContext = React.createContext<IAppContext>({
  cartItems: [],
  favoriteItems: [],
  isLoading: true,
  cartItemCheck: () => false,
  favoriteItemCheck: () => false,
  onAddToCart: () => {},
  onAddToFavorites: () => {},
  setCartItems: () => {},
  setIsLoading: () => {}
});

export default AppContext;