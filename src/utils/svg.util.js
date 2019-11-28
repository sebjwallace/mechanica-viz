 
const ctx = document.createElement('canvas').getContext('2d')

export const calcTextWidth = (text, font, size) => {
  ctx.font = `${size}px ${font}`
  return ctx.measureText(text).width
}