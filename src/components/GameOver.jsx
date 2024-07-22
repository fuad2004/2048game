import React from "react";

const GameOver = ({ restartGame }) => {
  return (
    <div className="gameOver absolute z-20 top-0 bg-white/50 left-0 w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-3xl md:text-6xl font-semibold">Game Over!</div>
        <button
          onClick={restartGame}
          className="text-xl text-white w-fit hover:bg-secondCement bg-cement font-semibold rounded py-1 px-4">
          Try again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
