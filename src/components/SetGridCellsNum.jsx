import SvgArrow from "@/svg/Arrow";
import React, { useState } from "react";

const SetGridCellsNum = ({ cellsNum, setCellsNum }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:flex hidden justify-end">
      <div className="group relative">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className="py-2 gap-1 cursor-pointer flex items-center ps-2 pe-5 bg-cement rounded">
          <SvgArrow className={`${isOpen ? "rotate-0" : "-rotate-90"} fill-mainWhite transition-transform w-5 h-5`} />
          <span className="text-mainWhite text-base font-medium">
            {cellsNum}x{cellsNum}
          </span>
        </div>
        <div
          className={`${
            isOpen ? "visible opacity-100" : " invisible opacity-0"
          } w-[300px] absolute z-50 shadow-lg top-full translate-y-2 right-0 transition-all bg-cement rounded flex flex-col gap-1 p-2`}>
          {new Array(5).fill(0).map((_, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setIsOpen(false);
                  setCellsNum(4 + index);
                }}
                className="text-mainWhite text-base font-medium py-1 px-3 hover:bg-white/10 rounded cursor-pointer">
                {4 + index}x{4 + index}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetGridCellsNum;
