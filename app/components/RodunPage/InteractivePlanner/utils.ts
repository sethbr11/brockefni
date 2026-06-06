export const PART_COLORS = [
  'rgba(216, 118, 40, 0.75)', // Orange
  'rgba(192, 110, 255, 0.75)', // Purple
  'rgba(59, 214, 113, 0.75)', // Green
  'rgba(59, 178, 214, 0.75)', // Blue
  'rgba(244, 63, 94, 0.75)', // Rose
  'rgba(234, 179, 8, 0.75)', // Yellow
  'rgba(20, 184, 166, 0.75)', // Teal
  'rgba(99, 102, 241, 0.75)', // Indigo
]

export const getPartColorByIndex = (index: number): string => {
  return PART_COLORS[index % PART_COLORS.length] || 'rgba(216, 118, 40, 0.75)'
}

export const adjustColorBrightness = (hex: string, percent: number): string => {
  let R = parseInt(hex.substring(1, 3), 16)
  let G = parseInt(hex.substring(3, 5), 16)
  let B = parseInt(hex.substring(5, 7), 16)

  R = Math.min(255, Math.max(0, R + percent))
  G = Math.min(255, Math.max(0, G + percent))
  B = Math.min(255, Math.max(0, B + percent))

  const rHex = R.toString(16).padStart(2, '0')
  const gHex = G.toString(16).padStart(2, '0')
  const bHex = B.toString(16).padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}

export const isColorDark = (hexColor: string): boolean => {
  const hex = hexColor.replace('#', '')
  if (hex.length !== 6) return true
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq < 140
}

export const parseNumberOrFraction = (str: string): number => {
  const s = str.trim()
  if (!s) return 0
  if (s.includes('/')) {
    const parts = s.split(/[\s-]/)
    if (
      parts.length === 2 &&
      parts[0] !== undefined &&
      parts[1] !== undefined
    ) {
      const whole = parseFloat(parts[0])
      const [n, d] = parts[1].split('/')
      if (n && d) {
        return whole + parseFloat(n) / parseFloat(d)
      }
    } else if (parts.length === 1 && parts[0] !== undefined) {
      const [n, d] = parts[0].split('/')
      if (n && d) {
        return parseFloat(n) / parseFloat(d)
      }
    }
  }
  return parseFloat(s) || 0
}

export const parseImperialLength = (
  val: string | number | undefined
): number => {
  if (val === undefined || val === null) return 0
  if (typeof val === 'number') return val
  const s = val.toString().trim()
  if (!s) return 0

  // 1. If it's a plain number (e.g. "96"), return float
  if (/^\d+(\.\d+)?$/.test(s)) return parseFloat(s)

  // 2. Standard imperial format: e.g. 8' 6" or 8'
  const stdMatch = s.match(
    /^(\d+(?:[\s-]?\d+\/\d+|\.\d+)?)\s*'\s*(?:(\d+(?:[\s-]?\d+\/\d+|\.\d+)?)\s*")?$/
  )
  if (stdMatch && stdMatch[1] !== undefined) {
    const ft = parseNumberOrFraction(stdMatch[1])
    const inch = stdMatch[2] ? parseNumberOrFraction(stdMatch[2]) : 0
    return ft * 12 + inch
  }

  // 3. Fallback single marks:
  // If it only contains ' (feet), multiply by 12
  if (s.includes("'") && !s.includes('"')) {
    return parseNumberOrFraction(s.replace(/'/g, '')) * 12
  }
  // If it only contains " (inches), treat as plain inches
  if (s.includes('"') && !s.includes("'")) {
    return parseNumberOrFraction(s.replace(/"/g, ''))
  }

  // 4. Fallback: plain fraction parsing
  return parseNumberOrFraction(s)
}
