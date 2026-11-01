import type { Entry } from '../commonplaceData'

/**
 * Put a collection's entry files in the given id order. In dev, warns about an
 * id with no file (likely a typo); files not in the order are appended at the end.
 */
export function orderedEntries(
  files: Record<string, Entry>,
  order: string[]
): Entry[] {
  const byId = new Map(Object.values(files).map((e) => [e.id, e]))
  const listed = order.flatMap((id) => {
    const entry = byId.get(id)
    if (!entry && import.meta.dev)
      console.warn(`[commonplace] no entry file for "${id}"`)
    return entry ? [entry] : []
  })
  const unlisted = [...byId.values()].filter((e) => !order.includes(e.id))
  return [...listed, ...unlisted]
}
