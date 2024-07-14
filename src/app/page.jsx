import Grid from "./components/Grid";

export default function Home() {
  const arr = [];
  for (let i = 0; i < 4; i++) {
    arr.push(new Array(4).fill(0));
  }
  // CREATING 4x4 GRID;

  // SETTING NEW RANDOM TILE IN GRID;
  function setNewTile() {
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
  }
  setNewTile();
  setNewTile();

  return (
    <div>
      <Grid arrFromProps={arr} />
    </div>
  );
}
