
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