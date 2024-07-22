import React from "react";

const NewGame = ({ restartGame }) => {
  return (
    <div className="flex justify-end w-full">
      <button className="bg-cement py-2 px-4 font-bold text-mainWhite rounded" onClick={restartGame}>
        New Game
      </button>
    </div>
  );
};

export default NewGame;
