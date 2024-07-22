import ArrowKeys from "@/svg/ArrowKeys";
import React from "react";

const ArrowKeysUi = ({ isKeyActive }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="mb-4">
        <span className="text-lg font-normal md:inline hidden">
          <span className="font-bold">HOW TO PLAY: </span>
          Use your <span className="font-bold">arrow keys</span> or <span className="font-bold">WASD keys</span> to move
          the tiles. Tiles with the same number merge into one when they touch. Add them up to reach{" "}
          <span className="font-bold">2048!</span>
        </span>
        <span className="text-lg font-normal md:hidden inline">
          <span className="font-bold">HOW TO PLAY: </span>
          Swipe with <span className="font-bold">your fingers</span> to move the tiles. Tiles with the same number merge
          into one when they touch. Add them up to reach <span className="font-bold">2048!</span>
        </span>
      </div>
      <div className="w-fit md:block hidden rounded-2xl p-3 bg-secondColor">
        <div className="p-3 bg-thirdCement rounded-xl">
          <div className="flex justify-center w-full mb-3">
            <div className="relative w-16 aspect-square">
              <div
                className={`${
                  isKeyActive.key == "ArrowUp" && isKeyActive.active ? "translate-y-1" : "translate-y-0"
                } bg-secondWhite w-full h-full relative z-20 rounded-lg transition-transform grid place-items-center`}>
                <ArrowKeys className="w-10 h-10 stroke-mainColor" />
              </div>
              <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-bgCement"></div>
            </div>
          </div>
          <div className="flex justify-between gap-3">
            <div className="relative w-16 aspect-square">
              <div
                className={`${
                  isKeyActive.key == "ArrowLeft" && isKeyActive.active ? "translate-y-1" : "translate-y-0"
                } bg-secondWhite w-full h-full relative z-20 rounded-lg transition-transform grid place-items-center`}>
                <ArrowKeys className="w-10 h-10 -rotate-90 stroke-mainColor" />
              </div>
              <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-bgCement"></div>
            </div>
            <div className="relative w-16 aspect-square">
              <div
                className={`${
                  isKeyActive.key == "ArrowDown" && isKeyActive.active ? "translate-y-1" : "translate-y-0"
                } bg-secondWhite w-full h-full relative z-20 rounded-lg transition-transform grid place-items-center`}>
                <ArrowKeys className="w-10 h-10 rotate-180 stroke-mainColor" />
              </div>
              <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-bgCement"></div>
            </div>
            <div className="relative w-16 aspect-square">
              <div
                className={`${
                  isKeyActive.key == "ArrowRight" && isKeyActive.active ? "translate-y-1" : "translate-y-0"
                } bg-secondWhite w-full h-full relative z-20 rounded-lg transition-transform grid place-items-center`}>
                <ArrowKeys className="w-10 h-10 rotate-90 stroke-mainColor" />
              </div>
              <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-bgCement"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrowKeysUi;
