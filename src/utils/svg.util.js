 
const ctx = document.createElement('canvas').getContext('2d')
ctx.font = '19px "Roboto"'

export const calcTextWidth = text => ctx.measureText(text).width