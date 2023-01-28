
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
  return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
  const xDist = x2 - x1
  const yDist = y2 - y1

  return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


function randomColorAlpha() {
  // const colors = [[235, 64, 52], [66, 135, 245], [255, 174, 0], [50, 168, 82]]
  const colors = [[235, 255, 252], [210, 250, 245], [225, 180, 235], [250, 253, 250]]
  let selectedColor = randomColor(colors)
  let r = selectedColor[0]
  let b = selectedColor[1]
  let g = selectedColor[2]
  return { r, g, b, }
}

export { randomIntFromRange, randomColor, distance, randomColorAlpha }