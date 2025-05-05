// import React from 'react';
// import Image from 'next/image';

// type CardProps = {
//   ID: string;
//   img: string;
//   flipped: boolean;
// };

// const Card = ({ ID, img, flipped  }: CardProps) => {
//   return (
//     <div
//       className="flex flex-col items-center justify-center rounded-lg shadow-lg p-4 w-64 h-64"
//       id={ID}
//     >
//         {flipped ? (
//             <Image
//               src={img}
//               alt={`Card ${ID}`}
//               width={180}
//               height={300}
//               className="rounded-lg mb-4 object-cover"
//             />
//         ) : (
//             <Image
//               src={"/images/Flipped.svg"}
//               alt={`Card ${ID}`}
//               width={180}
//               height={300}
//               className="rounded-lg mb-4 object-cover"
//             />
//         )}
//     </div>
//   );
// };


import React from 'react';
import Image from 'next/image';
// import { Image as LucideImage } from 'lucide-react';
// import './Card.css';

type CardProps = {
  ID: string;
  img: string;
  flipped: boolean;
  onClick: () => void;
};

const Card = ({ ID, img, flipped, onClick }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className="card-container"
      id={ID}
    >
      <div className={`card ${flipped ? "flipped" : ""}`}>
        <div className="card-face card-front">
          <div className="card-content">
          <Image src="/images/Flipped.svg" className="card-image" alt={`Card ${ID}`} width={180} height={300} />

          </div>
        </div>
        <div className="card-face card-back">
          <Image src={img} alt={`Card ${ID}`} className="card-image" width={180} height={300} />
        </div>
      </div>
    </div>
  );
};

export default Card;