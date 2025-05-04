import React from 'react';
import Image from 'next/image';

type CardProps = {
  ID: string;
  img: string;
};

const Card = ({ ID, img }: CardProps) => {
  return (
    <div
      className="flex flex-col items-center justify-center rounded-lg shadow-lg p-4 w-64 h-64"
      id={ID}
    >
      <Image
        src={img}
        alt={`Card ${ID}`}
        width={300}
        height={300}
        className="rounded-lg mb-4 object-cover"
      />
    </div>
  );
};

export default Card;
