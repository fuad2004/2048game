export function getStyles(value, width) {
  let fontSize = 48;
  if (width < 768) {
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
