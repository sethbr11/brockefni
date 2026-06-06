export interface MaterialType {
  id: string
  name: string
  finish:
    | 'wood'
    | 'steel'
    | 'aluminum'
    | 'copper'
    | 'acrylic'
    | 'pvc'
    | 'custom'
  color: string
}

export interface Dimension {
  id: string
  dim1: string
  dim2: string
  stockLength: string | number
  kerf: string | number
  materialId: string
}

export interface Part {
  id: string
  name: string
  length: string | number
  qty: number
  color: string
  materialId: string
}

export interface CutSegment {
  partId?: string
  name?: string
  length: number
  isWaste: boolean
  isKerf: boolean
}

export interface BoardLayout {
  id: number
  segments: CutSegment[]
  usedLength: number
  wasteLength: number
  kerfLength: number
}

export interface DimensionGroup {
  id: string
  dimension: string
  tabLabel: string
  stockLength: number
  kerf: number
  materialId: string
  layouts: BoardLayout[]
  yieldPercent: number
  partsSummary: {
    name: string
    length: number
    qty: number
    stocksUsed: number[]
  }[]
}
