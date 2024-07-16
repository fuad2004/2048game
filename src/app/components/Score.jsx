import React from "react";

const Score = ({ score, bestScore }) => {
  return (
    <div className="flex justify-end h-fit gap-4">
      <div className="bg-[#bbada0] py-1 px-6 md:px-10 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-[#eee4da]">SCORE</div>
        <div className="text-3xl font-bold text-white">{score}</div>
      </div>
      <div className="bg-[#bbada0] py-1 px-6 md:px-10 rounded-md flex flex-col items-center">
        <div className="text-base font-semibold text-[#eee4da]">BEST</div>
        <div className="text-3xl font-bold text-white">{bestScore}</div>
      </div>
    </div>
  );
};

export default Score;
