import React from "react";
import { Item } from "./redux/slices/itemsSlice";

interface IAppContext {
  items: Item[];
  cartItems: Item[];
  favoriteItems: Item[];
  isLoading: boolean;
  cartItemCheck: (string: string) => boolean;
  favoriteItemCheck: (string: string) => boolean;
  onAddToCart: (obj: Item) => void;
  onAddToFavorites: (obj: Item) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Item[]>>;
};

const AppContext = React.createContext<IAppContext>({
  items: [],
  cartItems: [],
  favoriteItems: [],
  isLoading: true,
  cartItemCheck: () => false,
  favoriteItemCheck: () => false,
  onAddToCart: () => {},
  onAddToFavorites: () => {},
  setCartItems: () => {},
});

export default AppContext;