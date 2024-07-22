"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import useWindowDimensions from "../hooks/windowDimensions";
import GameOver from "./GameOver";
import YouWin from "./YouWin";
import EmptyCells from "./EmptyCells";
import { getStyles } from "@/app/helper";
import Score from "./Score";
import NewGame from "./NewGame";
import SetGridCellsNum from "./SetGridCellsNum";
import ArrowKeysUi from "./ArrowKeysUi";

const Board = () => {
  const [cellsNum, setCellsNum] = useState(4);
  const windowDimensions = useWindowDimensions();

  const firstArr = [];
  for (let i = 0; i < cellsNum; i++) {
    firstArr.push(new Array(cellsNum).fill({ value: 0, id: null }));
  }
  const [arr, setArr] = useState(firstArr);
  const [activeCells, setActiveCells] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isUserWin, setIsUserWin] = useState({ limit: 2048, isWin: false });
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [isKeyActive, setIsKeyActive] = useState({ key: "", active: false });

  function getRowLeft(arr) {
    let temp = -2;
    arr.forEach((_, index) => {
      if (index != 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (arr[i].value == 0 && arr[i + 1] != undefined && arr[i + 1].value != 0) {
            arr[i] = arr[i + 1];
            arr[i + 1] = { value: 0, id: null };
          } else if (arr[i].value == arr[i + 1].value && arr[i].value != 0 && temp != i) {
            temp = i;
            arr[i].value = arr[i].value + arr[i + 1].value;
            setScore((prevValue) => prevValue + arr[i].value);
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
        const randomTile = emptyTiles[Math.floor(Math.random() * emptyTilesLength)];
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
    for (let i = 0; i < cellsNum; i++) {
      arr.push(new Array(cellsNum).fill({ value: 0, id: null }));
    }
    setArr(arr);
    setNewTile();
    setNewTile();
    setIsGameOver(false);
    setIsUserWin({ limit: 2048, isWin: false });
    setScore(0);
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
          if (arr[rowIndex][colIndex].value == isUserWin.limit) {
            setIsUserWin({ limit: isUserWin.limit, isWin: true });
          }
          if (
            arr[rowIndex][colIndex + 1] != undefined &&
            arr[rowIndex][colIndex].value == arr[rowIndex][colIndex + 1].value
          ) {
            isSimilar = false;
          } else if (arr.length >= rowIndex + 2 && arr[rowIndex][colIndex].value == arr[rowIndex + 1][colIndex].value) {
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
    const board = document.getElementById("board");

    function keyDownEvent(e) {
      if (e.code == "ArrowUp" || e.code == "ArrowDown") {
        e.preventDefault();
      }
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
      } else if (e.code == "KeyW") {
        goTop();
        isGameOverFunc();
      } else if (e.code == "KeyS") {
        goBottom();
        isGameOverFunc();
      } else if (e.code == "KeyA") {
        goLeft();
        isGameOverFunc();
      } else if (e.code == "KeyD") {
        goRight();
        isGameOverFunc();
      } else if (e.code == "KeyR" && !e.ctrlKey) {
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
      if (Math.abs(touchStartX - touchEndX) >= Math.abs(touchStartY - touchEndY)) {
        if (touchStartX - touchEndX > 0 && touchStartX - touchEndX > 20) {
          goLeft();
          isGameOverFunc();
        } else if (touchStartX - touchEndX < 0 && touchStartX - touchEndX < -20) {
          goRight();
          isGameOverFunc();
        }
      } else {
        if (touchStartY - touchEndY > 0 && touchStartY - touchEndY > 20) {
          goTop();
          isGameOverFunc();
        } else if (touchStartY - touchEndY < 0 && touchStartY - touchEndY < -20) {
          goBottom();
          isGameOverFunc();
        }
      }
    }

    if (isUserWin.isWin == false && isGameOver == false) {
      window.addEventListener("keydown", keyDownEvent);
      board.addEventListener("touchstart", touchStartEvent);
      board.addEventListener("touchend", touchEndEvent);
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
      board.removeEventListener("touchstart", touchStartEvent);
      board.removeEventListener("touchend", touchEndEvent);
    };
  }, [arr, isGameOver, isUserWin]);

  useLayoutEffect(() => {
    restartGame();
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore != undefined) {
      setBestScore(bestScore);
    }
  }, []);

  useEffect(() => {
    function keyDown(e) {
      setIsKeyActive({ key: e.code, active: true });
    }
    function keyUp() {
      setIsKeyActive({ key: "", active: false });
    }

    document.addEventListener("keydown", keyDown);
    document.addEventListener("keyup", keyUp);

    return () => {
      document.removeEventListener("keydown", keyDown);
      document.removeEventListener("keyu;", keyUp);
    };
  }, []);

  useLayoutEffect(() => {
    const bestScore = localStorage.getItem("bestScore");
    if (bestScore == undefined) {
      localStorage.setItem("bestScore", 0);
      setBestScore(0);
    } else {
      if (score > bestScore) {
        localStorage.setItem("bestScore", score);
        setBestScore(score);
      }
    }
  }, [score]);

  useLayoutEffect(() => {
    restartGame();
  }, [cellsNum]);

  return (
    <>
      <div className="flex flex-col w-full md:max-w-[464px] mx-auto px-4 box-content py-10">
        <SetGridCellsNum cellsNum={cellsNum} setCellsNum={setCellsNum} />
        <div className="mb-4"></div>
        <div className="flex gap-2 justify-between">
          <div className="md:text-[80px] text-[50px] font-bold text-mainColor leading-[0.7]">2048</div>
          <div>
            <Score score={score} bestScore={bestScore} />
            <div className="mb-4"></div>
            <NewGame restartGame={restartGame} />
          </div>
        </div>
        <div className="mb-6"></div>
        <div
          id="board"
          style={{
            gridTemplateColumns: `repeat(${cellsNum},minmax(0,1fr))`,
            gridTemplateRows: `repeat(${cellsNum},minmax(0,1fr))`,
          }}
          className="bg-secondColor min-w-max touch-none relative rounded-xl h-fit w-full grid p-4 gap-2 md:gap-4">
          {isGameOver && <GameOver restartGame={restartGame} />}
          {isUserWin.isWin && <YouWin restartGame={restartGame} setIsUserWin={setIsUserWin} />}

          <EmptyCells arr={arr} />

          {activeCells.map((item) => {
            const styles = getStyles(item.value, windowDimensions.width, cellsNum);

            let translateX = "calc(" + item.colIndex * 100 + "% + " + item.colIndex * 16 + "px)";
            let translateY = "calc(" + item.rowIndex * 100 + "% + " + item.rowIndex * 16 + "px)";
            if (windowDimensions.width < 768) {
              translateX = "calc(" + item.colIndex * 100 + "% + " + item.colIndex * 8 + "px)";
              translateY = "calc(" + item.rowIndex * 100 + "% + " + item.rowIndex * 8 + "px)";
            }

            if (item.value != 0) {
              return (
                <motion.div
                  key={item.id}
                  style={styles}
                  initial={{
                    x: translateX,
                    y: translateY,
                  }}
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
                  className={`w-[calc(100%/4-14px)] md:w-[calc(100%/4-20px)] aspect-square absolute z-10 left-4 top-4 rounded-lg grid place-items-center font-bold`}>
                  {item.value}
                </motion.div>
              );
            }
          })}
        </div>
        <div className="mb-10"></div>
        <ArrowKeysUi isKeyActive={isKeyActive} />
      </div>
    </>
  );
};

export default Board;
