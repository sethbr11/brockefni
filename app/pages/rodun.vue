<template>
  <div class="header">
    <img
      src="@/assets/images/rodunLogo.png"
      height="350px"
      class="rodun-icon"
    />
    <h4 class="rodun-description">
      A fast, simple desktop app to help optimize the use of materials by
      planning cuts based on user-provided specifications.
    </h4>
    <a
      href="https://pub-ec1ffa573fea49e58c444331188ff39c.r2.dev/Rodun-v.1.0.0-Installer-MacOS.dmg"
      style="text-decoration: none"
    >
      <div class="download-rodun">Download v1.0.0 (MacOS Only)</div>
    </a>
    <br />
    <div class="terminal-code">
      <code id="terminal-code">
        sudo xattr -r -d com.apple.quarantine /Applications/Rodun.app
      </code>
      <div class="copy-container">
        <img
          src="@/assets/icons/copy.png"
          class="copy-img"
          @click="copyCommand"
        />
        <span v-if="showTooltip" class="tooltip">Copied!</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    useHead({
      title: 'Rodun - Optimize Your Cuts',
      meta: [
        {
          name: 'description',
          content:
            'A fast, simple desktop app to help optimize the use of materials by planning cuts based on user-provided specifications.',
        },
        {
          name: 'keywords',
          content: 'Rodun, material optimization, cutting plans, desktop app',
        },
        {
          name: 'author',
          content: 'Seth Brock',
        },
      ],
    })

    const showTooltip = ref(false)

    const copyCommand = () => {
      const copyText = document.getElementById('terminal-code')
      if (copyText?.innerText) {
        navigator.clipboard.writeText(copyText.innerText).then(() => {
          showTooltip.value = true
          setTimeout(() => {
            showTooltip.value = false
          }, 2000) // Hide tooltip after 2 seconds
        })
      }
    }

    return {
      copyCommand,
      showTooltip,
    }
  },
})
</script>

<style scoped>
.rodun-icon {
  margin-top: 40px;
  animation: fadeIn 3s forwards;
}

.rodun-description {
  animation: fadeIn 3s forwards;
  font-size: 23px;
  margin: 30px 25% 0 25%;
  font-weight: lighter;
}

.download-rodun {
  animation: fadeIn 3s forwards;
  color: white;
  background-color: #1a1b1c;
  align-items: center;
  text-align: center;
  border: none;
  padding: 15px 32px;
  display: inline-block;
  margin: 25px 0 0 0;
}

.terminal-code {
  animation: fadeIn 3s forwards;
  color: var(--text-color);
  align-items: center;
  text-align: center;
  border: none;
  padding: 15px 32px;
  display: inline-block;
  margin: 15px 0 0 0;
}

.copy-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.copy-img {
  height: 15px;
  align-items: center;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  animation: fadeIn 0.3s ease-in-out;
}

/** Dark mode styles */
.darkmode {
  .copy-img {
    filter: invert(1);
  }
}

/** Animation styles */
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
