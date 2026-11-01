import { computed } from 'vue'

export type Time = 'auto' | 'day' | 'night'

interface TimeProps {
  variant?: string
  time?: Time
  night?: boolean
  celestial?: [number, number]
}

/** Resolves the day / night skies a backdrop draws from `time` and its aliases. */
export function useBackdropTime(props: TimeProps) {
  /** resolved time of day ('night' alias + the night-sky variant pin it) */
  const mode = computed<Time>(() =>
    (props.time ?? 'auto') !== 'auto'
      ? props.time!
      : props.night || props.variant === 'night-sky'
        ? 'night'
        : 'auto'
  )
  /** which skies to draw: auto = both, CSS (.cp-day / .cp-night in scene-tokens.css) shows one */
  const modes = computed<Exclude<Time, 'auto'>[]>(() =>
    mode.value === 'auto' ? ['day', 'night'] : [mode.value]
  )
  const cls = (m: string) => (mode.value === 'auto' ? `cp-${m}` : undefined)
  const cel = computed(() => props.celestial ?? [1250, 185])

  return { mode, modes, cls, cel }
}
