import React from "react";

const NewGame = ({ restartGame }) => {
  return (
    <div className="flex justify-end w-full">
      <button
        className="bg-[#8f7a66] py-2 px-4 font-bold text-[#f9f6f2] rounded"
        onClick={restartGame}
      >
        New Game
      </button>
    </div>
  );
};

export default NewGame;
