import React from "react";

const Score = ({ score, bestScore }) => {
  return (
    <div className="flex flex-wrap justify-end h-fit gap-1">
      <div className="bg-secondColor py-1 px-3 md:px-6 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-secondWhite">SCORE</div>
        <div className="text-xl font-bold text-white">{score}</div>
      </div>
      <div className="bg-secondColor py-1 px-3 md:px-6 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-secondWhite">BEST</div>
        <div className="text-xl font-bold text-white">{bestScore}</div>
      </div>
    </div>
  );
};

export default Score;
