import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const cardImages = [
  "/images/upi-card.png",
  "/images/DebitCard.png",
  "/images/creditCard.png",
  "/images/wallet.png",
  "/images/bnpl.png",
];

const CardSwiper = () => {
  const [cards, setCards] = useState(cardImages);

  const rotateCards = () => {
    setCards((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  // Auto swipe logic
  useEffect(() => {
    const interval = setInterval(() => {
      rotateCards();
    }, 1000); // Rotate every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="bg-green-50 p-6 mb-2 rounded-2xl text-gray-800 shadow-lg w-[500px] h-[300px] mx-auto mt-10 relative overflow-hidden">
      {cards.map((img, i) => {
        const offset = i * 10;
        const scale = 1 - i * 0.05;
        const zIndex = cards.length - i;

        return (
          <motion.img
            key={img}
            src={img}
            alt={`Card ${i}`}
            onClick={rotateCards}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-xl shadow-xl cursor-pointer"
            style={{
              zIndex,
              transform: `translateX(${offset}px) scale(${scale})`,
            }}
            animate={{
              x: offset,
              scale: scale,
              rotate: i === 0 ? [0, 15, -10, 0] : 0,
              opacity: 1,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        );
      })}
    </div>
  );
};

export default CardSwiper;
