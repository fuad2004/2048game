import React from "react";

const YouWin = ({ restartGame }) => {
  return (
    <div className="gameOver absolute z-30 top-0 bg-white/50 left-0 w-full h-full grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="text-xl text-center md:text-4xl font-semibold">
          You Won! Congratulations
        </div>
        <button
          onClick={restartGame}
          className="text-xl text-white w-fit hover:bg-[#776555] bg-[#8f7a66] font-semibold rounded py-1 px-4"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default YouWin;