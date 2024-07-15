"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";

const Grid = ({ arrFromProps }) => {
  const [arr, setArr] = useState([...arrFromProps]);
  const [activeCells, setActiveCells] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  function getRowLeft(arr) {
    let temp = -2;
    arr.forEach((item, index) => {
      item.isNew = false;
      if (index != 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (
            arr[i].value == 0 &&
            arr[i + 1] != undefined &&
            arr[i + 1].value != 0
          ) {
            arr[i] = arr[i + 1];
            arr[i + 1] = { value: 0, id: null, isNew: null };
          } else if (
            arr[i].value == arr[i + 1].value &&
            arr[i].value != 0 &&
            temp != i
          ) {
            temp = i;
            arr[i].value = arr[i].value + arr[i + 1].value;
            arr[i].id = uuidv4();
            arr[i].isNew = true;
            arr[i + 1] = { value: 0, id: null, isNew: null };
            break;
          } else {
            break;
          }
        }
      }
    });
    return arr;
  }

  function getRowRight(arr) {
    arr.reverse();
    const resultArr = getRowLeft(arr);
    resultArr.reverse();
    return resultArr;
  }

  function goTop() {
    let tempArr = [];
    let tempArrV2 = [];
    arr.forEach((item, index) => {
      let tempArrIn = [];
      for (let i = 0; i < item.length; i++) {
        tempArrIn.push(arr[i][index]);
      }
      tempArr.push(tempArrIn);
    });

    tempArr.forEach((item, index) => {
      tempArr[index] = getRowLeft(item);
    });

    tempArr.forEach((item, index) => {
      let tempArrIn = [];
      for (let i = 0; i < item.length; i++) {
        tempArrIn.push(tempArr[i][index]);
      }
      tempArrV2.push(tempArrIn);
    });

    if (JSON.stringify(tempArrV2) != JSON.stringify(arr)) {
      let newArr = setNewTile(tempArrV2);
      setArr([...newArr]);
    }

    return tempArrV2;
  }

  function goBottom() {
    let tempArr = [];
    let tempArrV2 = [];
    arr.forEach((item, index) => {
      let tempArrIn = [];
      for (let i = 0; i < item.length; i++) {
        tempArrIn.push(arr[i][index]);
      }
      tempArr.push(tempArrIn);
    });

    tempArr.forEach((item, index) => {
      tempArr[index] = getRowRight(item);
    });

    tempArr.forEach((item, index) => {
      let tempArrIn = [];
      for (let i = 0; i < item.length; i++) {
        tempArrIn.push(tempArr[i][index]);
      }
      tempArrV2.push(tempArrIn);
    });

    if (JSON.stringify(tempArrV2) != JSON.stringify(arr)) {
      let newArr = setNewTile(tempArrV2);
      setArr([...newArr]);
    }
    return tempArrV2;
  }

  function goLeft() {
    let tempArr = structuredClone(arr);
    tempArr.forEach((item, index) => {
      tempArr[index] = getRowLeft(item);
    });
    if (JSON.stringify(tempArr) != JSON.stringify(arr)) {
      let newArr = setNewTile(tempArr);
      setArr([...newArr]);
    }
  }

  function goRight() {
    let tempArr = structuredClone(arr);
    tempArr.forEach((item, index) => {
      tempArr[index] = getRowRight(item);
    });
    if (JSON.stringify(tempArr) != JSON.stringify(arr)) {
      let newArr = setNewTile(tempArr);
      setArr([...newArr]);
    }
  }

  function setNewTile(arr) {
    const emptyTiles = [];
    arr.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item.value == 0) {
          emptyTiles.push([rowIndex, colIndex]);
        }
      });
    });
    const emptyTilesLength = emptyTiles.length;
    if (emptyTilesLength != 0) {
      const randomTile =
        emptyTiles[Math.floor(Math.random() * emptyTilesLength)];
      if (Math.floor(Math.random() * 10) == 9) {
        arr[randomTile[0]][randomTile[1]] = {
          value: 4,
          id: uuidv4(),
          isNew: true,
        };
      } else {
        arr[randomTile[0]][randomTile[1]] = {
          value: 2,
          id: uuidv4(),
          isNew: true,
        };
      }
    }
    return arr;
  }

  function restartGame() {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(new Array(4).fill({ value: 0, id: null }));
    }
    let newArr = setNewTile(arr);
    let newArrV2 = setNewTile(newArr);
    setArr(newArrV2);
    setIsGameOver(false);
  }

  function isGameOverFunc() {
    setArr((arr) => {
      let isFull = true;

      arr.forEach((row) => {
        row.forEach((item) => {
          if (item.value == 0) {
            isFull = false;
          }
        });
      });

      let isSimilar = true;
      arr.forEach((row, rowIndex) => {
        row.forEach((_, colIndex) => {
          if (
            arr[rowIndex][colIndex + 1] != undefined &&
            arr[rowIndex][colIndex].value == arr[rowIndex][colIndex + 1].value
          ) {
            isSimilar = false;
          } else if (
            arr.length >= rowIndex + 2 &&
            arr[rowIndex][colIndex].value == arr[rowIndex + 1][colIndex].value
          ) {
            isSimilar = false;
          }
        });
      });

      if (isSimilar && isFull) {
        setIsGameOver(true);
      }

      return arr;
    });
  }

  useEffect(() => {
    function keyDownEvent(e) {
      if (e.code == "ArrowUp") {
        goTop();
        isGameOverFunc();
      } else if (e.code == "ArrowDown") {
        goBottom();
        isGameOverFunc();
      } else if (e.code == "ArrowRight") {
        goRight();
        isGameOverFunc();
      } else if (e.code == "ArrowLeft") {
        goLeft();
        isGameOverFunc();
      } else if (e.code == "KeyR") {
        restartGame();
      }
    }
    let touchStartX = null;
    let touchStartY = null;
    let touchEndX = null;
    let touchEndY = null;
    function touchStartEvent(e) {
      touchStartX = e.targetTouches[0].clientX;
      touchStartY = e.targetTouches[0].clientY;
    }
    function touchEndEvent(e) {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      if (
        Math.abs(touchStartX - touchEndX) >= Math.abs(touchStartY - touchEndY)
      ) {
        if (touchStartX - touchEndX > 0) {
          goLeft();
          isGameOverFunc();
        } else {
          goRight();
          isGameOverFunc();
        }
      } else {
        if (touchStartY - touchEndY > 0) {
          goTop();
          isGameOverFunc();
        } else {
          goBottom();
          isGameOverFunc();
        }
      }
    }

    window.addEventListener("keydown", keyDownEvent);
    window.addEventListener("touchstart", touchStartEvent);
    window.addEventListener("touchend", touchEndEvent);

    return () => {
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchend", touchEndEvent);
    };
  }, [arr]);

  useEffect(() => {
    const tempActiveCells = [];
    arr.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item.value != 0) {
          tempActiveCells.push({
            value: item.value,
            id: item.id,
            rowIndex,
            colIndex,
            isNew: item.isNew,
          });
        }
      });
      setActiveCells(tempActiveCells);
    });
  }, [arr]);

  return (
    <>
      <div className="h-screen grid place-items-center container mx-auto">
        <div className="bg-[#bbada0] relative rounded-xl grid grid-cols-4 grid-rows-4 p-4 gap-4">
          {isGameOver && (
            <div className="gameOver absolute z-20 top-0 bg-white/50 left-0 w-full h-full grid place-items-center">
              <div className="flex flex-col items-center gap-4">
                <div className="text-6xl font-semibold">Game Over!</div>
                <button
                  onClick={restartGame}
                  className="text-xl text-white w-fit hover:bg-[#776555] bg-[#8f7a66] font-semibold rounded py-1 px-4"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {arr.map((row, rowIndex) => {
            return row.map((_, index) => {
              return (
                <div
                  key={rowIndex + "" + index}
                  className="w-24 h-24 bg-[#eee4da59] rounded-lg grid transition-all place-items-center font-bold"
                ></div>
              );
            });
          })}

          {activeCells.map((item) => {
            let backgroundColor = "#eee4da59";
            let color = "#776e65";
            let fontSize = "48px";
            let translateX = item.colIndex * 112;
            let translateY = item.rowIndex * 112;
            const initial = {
              x: translateX,
              y: translateY,
            };
            let scaleDuration = item.isNew ? 0.4 : 0.2;
            switch (item.value) {
              case 2:
                backgroundColor = "#eee4da";
                break;
              case 4:
                backgroundColor = "#eee1c9";
                break;
              case 8:
                backgroundColor = "#f3b27a";
                color = "#f9f6f2";
                break;
              case 16:
                backgroundColor = "#f69664";
                color = "#f9f6f2";
                fontSize = "44px";
                break;
              case 32:
                backgroundColor = "#f77c5f";
                color = "#f9f6f2";
                fontSize = "44px";
                break;
              case 64:
                backgroundColor = "#f75f3b";
                color = "#f9f6f2";
                fontSize = "44px";
                break;
              case 128:
                backgroundColor = "#edd073";
                color = "#f9f6f2";
                fontSize = "40px";
                break;
              case 256:
                backgroundColor = "#edd073";
                color = "#f9f6f2";
                fontSize = "40px";
                break;
              case 512:
                backgroundColor = "#edd073";
                color = "#f9f6f2";
                fontSize = "40px";
                break;
              case 1024:
                backgroundColor = "#edd073";
                color = "#f9f6f2";
                fontSize = "36px";
                break;
              case 2048:
                backgroundColor = "#edd073";
                color = "#f9f6f2";
                fontSize = "36px";
                break;
              default:
                break;
            }
            if (item.value != 0) {
              return (
                <motion.div
                  key={item.id}
                  style={{
                    backgroundColor,
                    color,
                    fontSize,
                  }}
                  initial={initial}
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale: [0.8, 1.1, 1],
                    transition: {
                      scale: {
                        duration: scaleDuration,
                        ease: "easeIn",
                      },
                      x: { duration: 0.1 },
                      y: { duration: 0.1 },
                    },
                  }}
                  className={`w-24 absolute z-10 left-4 top-4 h-24 rounded-lg grid place-items-center font-bold`}
                >
                  {item.value}
                </motion.div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Grid;
