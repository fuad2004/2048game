import React from "react";

const Score = ({ score, bestScore }) => {
  return (
    <div className="flex flex-wrap justify-end h-fit gap-1">
      <div className="bg-[#bbada0] py-1 px-3 md:px-6 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-[#eee4da]">SCORE</div>
        <div className="text-xl font-bold text-white">{score}</div>
      </div>
      <div className="bg-[#bbada0] py-1 px-3 md:px-6 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-[#eee4da]">BEST</div>
        <div className="text-xl font-bold text-white">{bestScore}</div>
      </div>
    </div>
  );
};

export default Score;
