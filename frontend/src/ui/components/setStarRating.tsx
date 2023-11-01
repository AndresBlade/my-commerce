import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarProps {
  initialRating?: number;
}

export const SetStar: React.FC<StarProps> = ({ initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);

  const handleStarClick = (currentRating: number) => {
    setRating(currentRating);
  };

  return (
    <div className='flex mt-4 justify-center'>
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              onClick={() => handleStarClick(currentRating)}
              className='hidden'
            />
            <FaStar
              className={`color_icono cursor-pointer ${currentRating <= (hover || rating) ? 'color_icono' : 'color_icono-noSelected'}`}
              size={40}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};
