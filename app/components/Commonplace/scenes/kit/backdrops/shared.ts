import { rng } from '../util'

export const cloud =
  'M -90 20 C -114 20 -114 -10 -88 -12 C -86 -42 -46 -50 -30 -28 C -18 -60 34 -58 42 -24 C 72 -36 100 -8 86 20 Z'

const r = rng(7)
export const stars = Array.from({ length: 46 }, () => ({
  x: r() * 1600,
  y: r() * 470,
  r: 1.5 + r() * 2.5,
  o: 0.5 + r() * 0.5,
}))

export const brickPath = (() => {
  let d = ''
  for (let y = 60; y < 720; y += 60) {
    d += `M 0 ${y} L 1600 ${y} `
    const off = (y / 60) % 2 ? 0 : 60
    for (let x = off; x < 1600; x += 120) d += `M ${x} ${y} L ${x} ${y + 60} `
  }
  return d
})()
