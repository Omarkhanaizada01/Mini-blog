import React, { useState, useEffect } from "react";

export default function StarRating({ initialRating = 0, onRate, readOnly = false }) {
  const [rating, setRating] = useState(0);
  const maxStars = 5;

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (starNumber) => {
    if (readOnly) return;
    setRating(starNumber);
    if (onRate) onRate(starNumber);
  };

  return (
    <div className="flex space-x-1 select-none">
      {[...Array(maxStars)].map((_, i) => {
        const starNumber = i + 1;
        const isFilled = starNumber <= rating;

        return (
          <span
            key={starNumber}
            onClick={() => handleClick(starNumber)}
            className={`text-2xl transition-colors duration-200 cursor-${readOnly ? "default" : "pointer"} ${
              isFilled ? "text-yellow-400" : "text-gray-400"
            }`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
