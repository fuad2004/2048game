"use client";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import useWindowDimensions from "../hooks/windowDimensions";
import GameOver from "./GameOver";
import YouWin from "./YouWin";
import EmptyCells from "./EmptyCells";

const Grid = () => {
  const windowDimensions = useWindowDimensions();

  const [arr, setArr] = useState([]);
  const [activeCells, setActiveCells] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isUserWin, setIsUserWin] = useState(false);

  function getRowLeft(arr) {
    let temp = -2;
    arr.forEach((_, index) => {
      if (index != 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (
            arr[i].value == 0 &&
            arr[i + 1] != undefined &&
            arr[i + 1].value != 0
          ) {
            arr[i] = arr[i + 1];
            arr[i + 1] = { value: 0, id: null };
          } else if (
            arr[i].value == arr[i + 1].value &&
            arr[i].value != 0 &&
            temp != i
          ) {
            temp = i;
            arr[i].value = arr[i].value + arr[i + 1].value;
            arr[i].id = uuidv4();
            arr[i + 1] = { value: 0, id: null };
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
      setArr([...tempArrV2]);
      setNewTile();
    } else {
      setArr([...tempArrV2]);
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
      setArr([...tempArrV2]);
      setNewTile();
    } else {
      setArr([...tempArrV2]);
    }
    return tempArrV2;
  }

  function goLeft() {
    let tempArr = structuredClone(arr);
    tempArr.forEach((item, index) => {
      tempArr[index] = getRowLeft(item);
    });
    if (JSON.stringify(tempArr) != JSON.stringify(arr)) {
      setArr([...tempArr]);
      setNewTile();
    } else {
      setArr([...tempArr]);
    }
  }

  function goRight() {
    let tempArr = structuredClone(arr);
    tempArr.forEach((item, index) => {
      tempArr[index] = getRowRight(item);
    });
    if (JSON.stringify(tempArr) != JSON.stringify(arr)) {
      setArr([...tempArr]);
      setNewTile();
    } else {
      setArr([...tempArr]);
    }
  }

  function setNewTile() {
    setArr((arr) => {
      const tempArr = structuredClone(arr);
      const emptyTiles = [];
      tempArr.forEach((row, rowIndex) => {
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
          tempArr[randomTile[0]][randomTile[1]] = {
            value: 4,
            id: uuidv4(),
          };
        } else {
          tempArr[randomTile[0]][randomTile[1]] = {
            value: 2,
            id: uuidv4(),
          };
        }
      }
      return tempArr;
    });
  }

  function restartGame() {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(new Array(4).fill({ value: 0, id: null }));
    }
    setArr(arr);
    setNewTile();
    setNewTile();
    setIsGameOver(false);
    setIsUserWin(false);
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
          if (arr[rowIndex][colIndex].value == 2048) {
            setIsUserWin(true);
          }
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

  function getStyles(value) {
    let fontSize = 48;
    if (windowDimensions.width < 768) {
      fontSize = 40;
    }
    let backgroundColor = "#eee4da59";
    let color = "#776e65";
    switch (value) {
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
        fontSize = fontSize - 4;
        break;
      case 32:
        backgroundColor = "#f77c5f";
        color = "#f9f6f2";
        fontSize = fontSize - 4;
        break;
      case 64:
        backgroundColor = "#f75f3b";
        color = "#f9f6f2";
        fontSize = fontSize - 4;
        break;
      case 128:
        backgroundColor = "#edd073";
        color = "#f9f6f2";
        fontSize = fontSize - 10;
        break;
      case 256:
        backgroundColor = "#edd073";
        color = "#f9f6f2";
        fontSize = fontSize - 10;
        break;
      case 512:
        backgroundColor = "#edd073";
        color = "#f9f6f2";
        fontSize = fontSize - 10;
        break;
      case 1024:
        backgroundColor = "#edd073";
        color = "#f9f6f2";
        fontSize = fontSize - 16;
        break;
      case 2048:
        backgroundColor = "#edd073";
        color = "#f9f6f2";
        fontSize = fontSize - 16;
        break;
      default:
        break;
    }
    fontSize += "px";
    return {
      backgroundColor,
      color,
      fontSize,
    };
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

    if (isUserWin == false && isGameOver == false) {
      window.addEventListener("keydown", keyDownEvent);
      window.addEventListener("touchstart", touchStartEvent);
      window.addEventListener("touchend", touchEndEvent);
    }

    const tempActiveCells = [];
    arr.forEach((row, rowIndex) => {
      row.forEach((item, colIndex) => {
        if (item.value != 0) {
          tempActiveCells.push({
            value: item.value,
            id: item.id,
            rowIndex,
            colIndex,
          });
        }
      });
      setActiveCells(tempActiveCells);
    });

    return () => {
      window.removeEventListener("keydown", keyDownEvent);
      window.removeEventListener("touchstart", touchStartEvent);
      window.removeEventListener("touchend", touchEndEvent);
    };
  }, [arr]);

  useEffect(() => {
    restartGame();
  }, []);

  return (
    <>
      <div className="h-screen grid place-items-center container mx-auto">
        <div className="bg-[#bbada0] touch-none relative rounded-xl grid grid-cols-4 grid-rows-4 p-4 gap-2 md:gap-4">
          {isGameOver && <GameOver restartGame={restartGame} />}
          {isUserWin && <YouWin restartGame={restartGame} />}

          <EmptyCells arr={arr} />

          {activeCells.map((item) => {
            const styles = getStyles(item.value);

            let translateX = item.colIndex * 112;
            let translateY = item.rowIndex * 112;
            if (windowDimensions.width < 768) {
              translateX = item.colIndex * 72;
              translateY = item.rowIndex * 72;
            }
            const initial = {
              x: translateX,
              y: translateY,
            };

            if (item.value != 0) {
              return (
                <motion.div
                  key={item.id}
                  style={styles}
                  initial={initial}
                  animate={{
                    x: translateX,
                    y: translateY,
                    scale: [0.8, 1.1, 1],
                    transition: {
                      scale: {
                        duration: 0.3,
                        ease: "easeIn",
                      },
                      x: { duration: 0.1 },
                      y: { duration: 0.1 },
                    },
                  }}
                  className={`md:w-24 w-16 h-16 absolute z-10 left-4 top-4 md:h-24 rounded-lg grid place-items-center font-bold`}
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
