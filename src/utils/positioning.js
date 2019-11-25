
const portSize = 5
const portRadius = portSize / 2

export const portSpacingX = (width) => width / 6
export const portSpacingY = (height) => height / 4

export const topPortPosition = ({ x, y, width, i }) => ({
  x: x + portSpacingX(width) * i - portRadius,
  y: y - portRadius
})

export const bottomPortPosition = ({ x, y, i, width, height }) => ({
  x: x + portSpacingX(width) * i - portRadius,
  y: y + height - portRadius
})

export const leftPortPosition = ({ x, y, height, i }) => ({
  x: x - portRadius,
  y: y + portSpacingY(height) * i - portRadius
})

export const rightPortPosition = ({ x, y, i, width, height }) => ({
  x: x + width - portRadius,
  y: y + portSpacingY(height) * i - portRadius
})

export const portPosition = ({ side, ...args }) => ({
  top: topPortPosition,
  bottom: bottomPortPosition,
  left: leftPortPosition,
  right: rightPortPosition
}[side](args))

export const topPortPaddingPosition = ({ x, y, width, i }) => ({
  x: x + (i * (width / 5)),
  y: y - 40,
  width: width / 5,
  height: 40
})

export const bottomPortPaddingPosition = ({ x, y, i, width, height }) => ({
  x: x + (i * (width / 5)),
  y: y + height,
  width: width / 5,
  height: 40
})

export const leftPortPaddingPosition = ({ x, y, height, i }) => ({
  x: x - 40,
  y: y + (height / 3) * i,
  width: 40,
  height: height / 3
})

export const rightPortPaddingPosition = ({ x, y, i, width, height }) => ({
  x: x + width,
  y: y + (height / 3) * i,
  width: 40,
  height: height / 3
})

export const portPaddingPosition = ({ side, ...args }) => ({
  top: topPortPaddingPosition,
  bottom: bottomPortPaddingPosition,
  left: leftPortPaddingPosition,
  right: rightPortPaddingPosition
}[side](args))