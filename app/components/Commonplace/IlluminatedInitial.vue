<!-- The one ornament: a framed versal letter in the period's pigment. -->
<template>
  <span
    class="cp-initial"
    :class="{ 'cp-initial--faint': faint }"
    :style="{ '--cp-initial-tone': tone, '--cp-initial-size': size }"
    aria-hidden="true"
  >
    <span class="cp-initial__frame">
      <i
        v-for="c in corners"
        :key="c"
        class="cp-initial__dot"
        :class="`cp-initial__dot--${c}`"
      />
    </span>
    <span class="cp-initial__letter">{{ letter }}</span>
  </span>
</template>

<script setup lang="ts">
const corners = ['tl', 'tr', 'bl', 'br'] as const

withDefaults(
  defineProps<{
    letter: string
    /** a CSS colour expression, e.g. 'var(--cp-period-old-english)' */
    tone?: string
    /** edge length, any CSS length */
    size?: string
    faint?: boolean
  }>(),
  { tone: 'var(--cp-accent-ink)', size: '4rem', faint: false }
)
</script>

<style scoped>
.cp-initial {
  position: relative;
  display: inline-grid;
  place-items: center;
  width: var(--cp-initial-size);
  height: var(--cp-initial-size);
  flex: none;
  color: var(--cp-initial-tone);
  background:
    radial-gradient(
      circle at 50% 45%,
      color-mix(in srgb, var(--cp-initial-tone) 10%, transparent),
      transparent 70%
    ),
    color-mix(in srgb, var(--cp-initial-tone) 6%, var(--cp-surface));
  border: 1px solid color-mix(in srgb, var(--cp-initial-tone) 55%, transparent);
}

.cp-initial__frame {
  position: absolute;
  inset: 8%;
  border: 1px solid color-mix(in srgb, var(--cp-initial-tone) 30%, transparent);
}

/* four small lozenges at the corners of the inner frame */
.cp-initial__dot {
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--cp-initial-tone);
  transform: rotate(45deg);
}
.cp-initial__dot--tl {
  top: -3px;
  left: -3px;
}
.cp-initial__dot--tr {
  top: -3px;
  right: -3px;
}
.cp-initial__dot--bl {
  bottom: -3px;
  left: -3px;
}
.cp-initial__dot--br {
  bottom: -3px;
  right: -3px;
}

.cp-initial__letter {
  position: relative;
  font-family: var(--cp-serif);
  font-weight: 500;
  font-size: calc(var(--cp-initial-size) * 0.66);
  line-height: 1;
  transform: translateY(4%);
}

.cp-initial--faint {
  opacity: 0.5;
}
</style>
