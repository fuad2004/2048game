import ArrowKeys from "@/svg/ArrowKeys";
import React from "react";

const ArrowKeysUi = () => {
  return (
    <div className="md:block hidden mt-6">
      <div className="flex flex-col items-center">
        <div className="mb-2 text-lg font-medium">Use your arrow keys or WASD to move the tiles</div>
        <div className="w-fit rounded-3xl p-3 bg-[#bbada0]">
          <div className="p-3 bg-[#eee4da59] rounded-2xl">
            <div className="flex justify-center w-full mb-3">
              <div className="relative w-16 aspect-square">
                <div className="bg-[#bbada0] w-full h-full relative z-20 rounded-lg grid place-items-center">
                  <ArrowKeys className="w-10 h-10 stroke-[#776e65]" />
                </div>
                <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-[#aa9888]"></div>
              </div>
            </div>
            <div className="flex justify-between gap-3">
              <div className="relative w-16 aspect-square">
                <div className="bg-[#bbada0] w-full h-full relative z-20 rounded-lg grid place-items-center">
                  <ArrowKeys className="w-10 h-10 -rotate-90 stroke-[#776e65]" />
                </div>
                <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-[#aa9888]"></div>
              </div>
              <div className="relative w-16 aspect-square">
                <div className="bg-[#bbada0] w-full h-full relative z-20 rounded-lg grid place-items-center">
                  <ArrowKeys className="w-10 h-10 rotate-180 stroke-[#776e65]" />
                </div>
                <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-[#aa9888]"></div>
              </div>
              <div className="relative w-16 aspect-square">
                <div className="bg-[#bbada0] w-full h-full relative z-20 rounded-lg grid place-items-center">
                  <ArrowKeys className="w-10 h-10 rotate-90 stroke-[#776e65]" />
                </div>
                <div className="absolute bottom-0 z-10 w-full h-full rounded-lg translate-y-1 bg-[#aa9888]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArrowKeysUi;
