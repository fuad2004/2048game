import React from "react";

const EmptyCells = ({ arr }) => {
  return (
    <>
      {arr.map((row, rowIndex) => {
        return row.map((_, index) => {
          return (
            <div
              key={rowIndex + "" + index}
              className="w-16 h-16 md:w-24 md:h-24 bg-[#eee4da59] rounded-lg grid transition-all place-items-center font-bold"
            ></div>
          );
        });
      })}
    </>
  );
};

export default EmptyCells;
