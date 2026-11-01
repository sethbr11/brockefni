import { c } from '../util'

/** color-role resolver that paints everything in ink for silhouettes */
export function useCol(props: { silhouette?: boolean }) {
  return (role: string) => (props.silhouette ? c('ink') : c(role))
}
