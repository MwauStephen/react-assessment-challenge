import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ItemCardProps {
  name: string;
  id: string | number;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, id }) => {
  const imageUrl =`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`
  return (
    <Link href={`/items/${id}`}>
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
  );
};

export default ItemCard;
