import type {
  Dimension,
  Part,
  MaterialType,
  DimensionGroup,
  BoardLayout,
} from './types'
import { parseImperialLength } from './utils'

export const solve1DCuttingStock = (
  dimensions: Dimension[],
  parts: Part[],
  materials: MaterialType[],
  getMaterialRef: (id: string) => MaterialType
): DimensionGroup[] => {
  const groups: DimensionGroup[] = []

  dimensions.forEach((dim) => {
    const d1 = (dim.dim1 || '').trim()
    const d2 = (dim.dim2 || '').trim()

    const matchingParts = parts.filter((p) => p.materialId === dim.id)

    if (matchingParts.length === 0) return

    const layouts: BoardLayout[] = []
    const lStock = parseImperialLength(dim.stockLength)
    const lKerf = parseImperialLength(dim.kerf)

    // 1. Flatten list of required parts for this group
    const flatParts: { partId: string; name: string; length: number }[] = []
    matchingParts.forEach((p) => {
      const parsedLen = parseImperialLength(p.length)
      const valLen = Math.max(0.1, parsedLen)
      const valQty = Math.max(0, p.qty)
      for (let i = 0; i < valQty; i++) {
        flatParts.push({
          partId: p.id,
          name: p.name || `Part ${p.id}`,
          length: valLen,
        })
      }
    })

    // 2. Sort by length descending (Greedy FFD heuristic)
    flatParts.sort((a, b) => b.length - a.length)

    // 3. Arrange cuts on boards
    flatParts.forEach((part) => {
      if (part.length > lStock) {
        // Part too long for standard stock length
        const newBoard: BoardLayout = {
          id: layouts.length + 1,
          segments: [
            {
              partId: part.partId,
              name: part.name + ' (Too Long)',
              length: lStock,
              isWaste: false,
              isKerf: false,
            },
          ],
          usedLength: lStock,
          wasteLength: 0,
          kerfLength: 0,
        }
        layouts.push(newBoard)
        return
      }

      let placed = false
      for (const board of layouts) {
        const isFirstCut = board.segments.length === 0
        const spaceNeeded = part.length + (isFirstCut ? 0 : lKerf)

        if (board.usedLength + spaceNeeded <= lStock) {
          if (!isFirstCut && lKerf > 0) {
            board.segments.push({
              length: lKerf,
              isWaste: false,
              isKerf: true,
            })
            board.usedLength += lKerf
            board.kerfLength += lKerf
          }
          board.segments.push({
            partId: part.partId,
            name: part.name,
            length: part.length,
            isWaste: false,
            isKerf: false,
          })
          board.usedLength += part.length
          placed = true
          break
        }
      }

      if (!placed) {
        const newBoard: BoardLayout = {
          id: layouts.length + 1,
          segments: [
            {
              partId: part.partId,
              name: part.name,
              length: part.length,
              isWaste: false,
              isKerf: false,
            },
          ],
          usedLength: part.length,
          wasteLength: 0,
          kerfLength: 0,
        }
        layouts.push(newBoard)
      }
    })

    // 4. Fill in leftovers/wastes
    layouts.forEach((board) => {
      const remaining = lStock - board.usedLength
      if (remaining > 0.001) {
        board.segments.push({
          length: remaining,
          isWaste: true,
          isKerf: false,
        })
        board.wasteLength = remaining
      }
    })

    // 5. Build Parts Summary (including stock mapping)
    const summaryMap: Record<
      string,
      { length: number; qty: number; stocksUsed: Set<number> }
    > = {}
    layouts.forEach((board) => {
      board.segments.forEach((seg) => {
        if (!seg.isWaste && !seg.isKerf && seg.name) {
          const key = `${seg.name}_${seg.length}`
          if (!summaryMap[key]) {
            summaryMap[key] = {
              length: seg.length,
              qty: 0,
              stocksUsed: new Set<number>(),
            }
          }
          summaryMap[key].qty++
          summaryMap[key].stocksUsed.add(board.id)
        }
      })
    })

    const partsSummary = Object.entries(summaryMap).map(([nameKey, data]) => {
      const name = nameKey.substring(0, nameKey.lastIndexOf('_'))
      return {
        name,
        length: data.length,
        qty: data.qty,
        stocksUsed: Array.from(data.stocksUsed).sort((a, b) => a - b),
      }
    })

    // 6. Calculate yield
    const totalCapacity = layouts.length * lStock
    const totalUsedForParts = matchingParts.reduce(
      (acc, p) => acc + parseImperialLength(p.length) * p.qty,
      0
    )
    const yieldPercent =
      totalCapacity > 0
        ? Math.min(
            100,
            Math.max(0, Math.round((totalUsedForParts / totalCapacity) * 100))
          )
        : 0
    const matRef = getMaterialRef(dim.materialId)
    const tabLabel = `${d1}x${d2} (${matRef.name})`

    groups.push({
      id: dim.id,
      dimension: `${d1} x ${d2}`,
      tabLabel,
      stockLength: lStock,
      kerf: lKerf,
      materialId: dim.materialId,
      layouts,
      yieldPercent,
      partsSummary,
    })
  })

  return groups
}
