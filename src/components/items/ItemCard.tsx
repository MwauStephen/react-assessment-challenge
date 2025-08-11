import Image from "next/image";
import React from "react";

interface ItemCardProps {
  name: string;
  id: string | number;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, id }) => {
  const imageUrl =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  return (
    <div
      className="bg-white p-4 rounded-lg shadow hover:shadow-lg hover:scale-105"
    >
      <div className="img-wrap flex justify-center items-center h-28">
        <Image
          width={500}
          height={500}
          src={imageUrl}
          alt={name}
          className="max-h-28 object-contain"
        />
      </div>
      <h2 className="text-center text-lg font-medium capitalize mt-5">{name}</h2>
    </div>
  );
};

export default ItemCard;
