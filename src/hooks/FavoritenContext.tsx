import {createContext, useContext, useEffect, useState, ReactNode} from "react";
import { AngebotFormValues } from "../models/AngebotType.ts";

interface FavoritesCtx {
  favorites: AngebotFormValues[];
  toggleFavorite: (offer: AngebotFormValues) => void;
  isFavorite: (id: number | string) => boolean;
}

const FavoritesContext = createContext<FavoritesCtx | null>(null);

export const FavoritenContext = ({children}: {children: ReactNode}) => {
  const [favorites, setFavorites] = useState<AngebotFormValues[]>(() => {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (offer: AngebotFormValues) => {
    setFavorites(prev =>
      prev.some(o => o.offerId === offer.offerId)
        ? prev.filter(o => o.offerId !== offer.offerId) // remove
        : [...prev, offer]                              // add
    );
  };

  const isFavorite = (id: number | string) =>
    favorites.some(o => o.offerId === id);

   return (
    <FavoritesContext.Provider value={{favorites, toggleFavorite, isFavorite}}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be inside <FavoritesProvider>");
  return ctx;
};