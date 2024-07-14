"use client";
import React, { useEffect, useState } from "react";

const Grid = ({ arrFromProps }) => {
  const [arr, setArr] = useState([...arrFromProps]);
  function getRowLeft(arr) {
    let temp = -2;
    arr.forEach((_, index) => {
      if (index != 0) {
        for (let i = index - 1; i >= 0; i--) {
          if (arr[i] == 0 && arr[i + 1] != undefined) {
            arr[i] = arr[i + 1];
            arr[i + 1] = 0;
          } else if (arr[i] == arr[i + 1] && temp != i) {
            temp = i;
            arr[i] = arr[i] + arr[i + 1];
            arr[i + 1] = 0;
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
        if (item == 0) {
          emptyTiles.push([rowIndex, colIndex]);
        }
      });
    });
    const emptyTilesLength = emptyTiles.length;
    if (emptyTilesLength != 0) {
      const randomTile = emptyTiles[Math.floor(Math.random() * emptyTilesLength)];
      if (Math.floor(Math.random() * 10) == 9) {
        arr[randomTile[0]][randomTile[1]] = 4;
      } else {
        arr[randomTile[0]][randomTile[1]] = 2;
      }
    }
    return arr;
  }

  function restartGame() {
    const arr = [];
    for (let i = 0; i < 4; i++) {
      arr.push(new Array(4).fill(0));
    }
    let newArr = setNewTile(arr);
    let newArrV2 = setNewTile(newArr);
    setArr(newArrV2);
  }

  useEffect(() => {
    function keyDownEvent(e) {
      if (e.code == "ArrowUp") {
        goTop();
      } else if (e.code == "ArrowDown") {
        goBottom();
      } else if (e.code == "ArrowRight") {
        goRight();
      } else if (e.code == "ArrowLeft") {
        goLeft();
      } else if (e.code == "KeyR") {
        restartGame();
      }
    }
    window.addEventListener("keydown", keyDownEvent);

    return () => {
      window.removeEventListener("keydown", keyDownEvent);
    };
  }, [arr]);

  return (
    <div className="h-screen grid place-items-center container mx-auto">
      <div className="bg-[#bbada0] rounded-md grid grid-cols-4 grid-rows-4 p-4 gap-4">
        {arr.map((row, rowIndex) => {
          return row.map((item, index) => {
            let backgroundColor = "#eee4da59";
            let color = "#776e65";
            let fontSize = "48px";
            switch (item) {
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
              default:
                break;
            }
            if (item != 0) {
              return (
                <div
                  key={rowIndex + "" + index}
                  style={{ backgroundColor, color, fontSize }}
                  className="w-24 h-24 rounded grid place-items-center font-bold">
                  {item}
                </div>
              );
            } else {
              return (
                <div
                  key={rowIndex + "" + index}
                  style={{ backgroundColor, color, fontSize }}
                  className="w-24 h-24 rounded grid place-items-center font-bold"></div>
              );
            }
          });
        })}
      </div>
    </div>
  );
};

export default Grid;
