"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFavorites } from "../../hooks/useFavorites";

interface ItemCardProps {
  name: string;
  id: string | number;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, id }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);

  const [animate, setAnimate] = useState(false);

  const handleFavClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
    setAnimate(true);
  };

  // Remove animation class after it plays
  useEffect(() => {
    if (animate) {
      const timer = setTimeout(() => setAnimate(false), 300); 
      return () => clearTimeout(timer);
    }
  }, [animate]);

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;

  return (
    <div className="relative">
      <button
        onClick={handleFavClick}
        aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={fav}
        className={`absolute z-10 top-2 right-2 p-1 rounded-full focus:outline-none cursor-pointer
          ${fav ? "bg-yellow-50 hover:scale-105" : "bg-white hover:bg-gray-100"}
          transition-transform duration-200`}
        title={fav ? "Remove from favorites" : "Add to favorites"}
      >
        <Image
          src={fav ? "/icons/star_filled.png" : "/icons/star_outline.png"}
          alt={fav ? "Favorited" : "Not favorited"}
          width={30}
          height={30}
          className={`${animate ? "scale-125" : "scale-100"} transition-transform duration-200`}
        />
      </button>

      <Link href={`/items/${id}`} className="block">
        <div className="bg-white p-4 cursor-pointer rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-200">
          <div className="img-wrap flex justify-center items-center h-28">
            <Image
              width={500}
              height={500}
              src={imageUrl}
              alt={name}
              className="max-h-28 object-contain"
            />
          </div>
          <h2 className="text-center text-lg font-medium capitalize mt-5">
            {name}
          </h2>
        </div>
      </Link>
    </div>
  );
};

export default ItemCard;
