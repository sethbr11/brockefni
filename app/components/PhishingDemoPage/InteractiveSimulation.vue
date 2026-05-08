<template>
  <section
    ref="section"
    class="simulation-section"
    :class="{ 'is-visible': isVisible }"
  >
    <div class="content-container">
      <div class="header">
        <h2 class="section-title">Experience the Demo</h2>
        <p class="description">
          Follow the steps below to see how the phishing simulation unfolds.
          This interactive walkthrough mirrors the experience students have
          during the live demo.
        </p>
      </div>

      <div class="simulation-container">
        <!-- Mobile Rotate Prompt -->
        <div class="rotate-prompt">
          <div class="phone-icon"></div>
          <h3>Rotate Your Device</h3>
          <p>
            Please turn your phone sideways to experience the interactive
            simulation.
          </p>
        </div>

        <div class="simulation-wrapper">
          <!-- Browser Simulation: Email and Login (Hard Swap) -->
          <div
            v-if="state === 'email' || state === 'login'"
            class="browser-sim-wrapper"
          >
            <div class="mock-browser-chrome">
              <div class="browser-controls">
                <span class="dot red"></span>
                <span class="dot yellow"></span>
                <span class="dot green"></span>
                <div class="browser-nav">
                  <span class="nav-arrow">←</span>
                  <span class="nav-arrow">→</span>
                  <span class="nav-refresh">↻</span>
                </div>
              </div>
              <div class="browser-address-bar">
                <span class="lock">🔒</span>
                <span class="url">{{
                  state === 'email'
                    ? 'https://mail.google.com/mail/u/0/#inbox'
                    : 'http://tiktok-reset.com/fake-login.html'
                }}</span>
              </div>
            </div>

            <!-- State 1: The Email (Gmail UI) -->
            <div v-if="state === 'email'" key="email" class="gmail-ui">
              <div class="gmail-sidebar">
                <div class="compose-btn">
                  <span class="pencil-icon">✎</span>
                  Compose
                </div>
                <ul class="sidebar-nav">
                  <li class="active">
                    <span class="icon">📥</span>
                    <span class="label-text">Inbox</span>
                    <span class="count">2</span>
                  </li>
                  <li>
                    <span class="icon">☆</span>
                    <span class="label-text">Starred</span>
                  </li>
                  <li>
                    <span class="icon">🕒</span>
                    <span class="label-text">Snoozed</span>
                  </li>
                  <li>
                    <span class="icon">📄</span>
                    <span class="label-text">Drafts</span>
                  </li>
                  <li>
                    <span class="icon">📂</span>
                    <span class="label-text">All Mail</span>
                  </li>
                </ul>
                <div class="labels-header">
                  <span class="labels-title">Labels</span>
                  <span class="plus-icon">+</span>
                </div>
                <ul class="sidebar-nav">
                  <li>
                    <span class="icon">📁</span>
                    <span class="label-text">Personal</span>
                  </li>
                  <li>
                    <span class="icon">📁</span>
                    <span class="label-text">Work</span>
                  </li>
                </ul>
              </div>
              <div class="gmail-content">
                <div class="gmail-topbar">
                  <div class="topbar-left">
                    <span class="back-icon">←</span>
                    <span class="action-icon">📥</span>
                    <span class="action-icon">⚠️</span>
                    <span class="action-icon">🗑️</span>
                    <span class="divider">|</span>
                    <span class="action-icon">✉️</span>
                    <span class="action-icon">📁</span>
                  </div>
                  <div class="topbar-right">
                    <span class="page-count">1 of 12</span>
                    <span class="nav-icon">‹</span>
                    <span class="nav-icon">›</span>
                  </div>
                </div>
                <div class="email-view">
                  <div class="email-subject-line">
                    <h1>Action Required: Account Verification</h1>
                    <span class="badge">Inbox x</span>
                  </div>
                  <div class="email-sender">
                    <div class="tiktok-avatar">♪</div>
                    <div class="sender-info">
                      <span class="sender-name">TikTok Security Team</span>
                      <span class="sender-email"
                        >&lt;security@tiktok-verify.com&gt;</span
                      >
                      <div class="to-me">to me ▾</div>
                    </div>
                    <div class="sender-time">
                      Oct 24, 2026, 10:14 AM
                      <span class="star-icon">☆</span>
                      <span class="emoji-icon">☺</span>
                      <span class="reply-icon">↶</span>
                    </div>
                  </div>
                  <div class="email-body-wrapper">
                    <div class="security-card">
                      <div class="card-top-border"></div>
                      <div class="card-content">
                        <h2>Security Alert</h2>
                        <p>
                          We noticed a new login to your account from a new
                          device.
                        </p>
                        <p>
                          If this wasn't you, please secure your account
                          immediately.
                        </p>
                        <button class="secure-btn" @click="nextState">
                          Secure My Account
                        </button>
                        <p class="disclaimer">
                          This is a controlled educational demonstration.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="email-footer-actions">
                    <button class="footer-btn">↶ Reply</button>
                    <button class="footer-btn">↷ Forward</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- State 2: The Login (TikTok UI) -->
            <div v-else-if="state === 'login'" key="login" class="tiktok-ui">
              <div class="tiktok-header">
                <div class="tiktok-logo">
                  <span class="logo-icon">♪</span> TikTok
                </div>
                <div class="header-right">
                  <span class="help-icon">?</span> Feedback and help
                </div>
              </div>
              <div class="login-container">
                <h1>Log in</h1>
                <div class="login-form">
                  <div class="input-label">
                    <span>Phone</span>
                    <span class="alt-login">Log in with email or username</span>
                  </div>
                  <div class="input-row" @click="autoFill">
                    <div class="country-selector">
                      US +1 <span class="arrow-small">▼</span>
                    </div>
                    <input
                      v-model="username"
                      type="text"
                      placeholder="Phone number"
                      readonly
                    />
                  </div>
                  <div class="input-row" @click="autoFill">
                    <input
                      v-model="password"
                      type="password"
                      placeholder="Password"
                      readonly
                    />
                  </div>
                  <div class="login-links">
                    <span>Forgot password?</span>
                    <span class="links-divider">|</span>
                    <span>Log in with code</span>
                  </div>
                  <button
                    class="tiktok-login-btn"
                    :class="{ active: username }"
                    @click="nextState"
                  >
                    Log in
                  </button>
                </div>
              </div>
              <div class="tiktok-footer">
                <p>
                  Don't have an account? <span class="signup">Sign up</span>
                </p>
                <div class="footer-bottom">
                  <div class="lang-selector">English (US)</div>
                  <div class="copyright">© 2026 TikTok</div>
                </div>
              </div>
            </div>
          </div>

          <!-- State 3: The Catch (Terminal UI) -->
          <transition name="fade">
            <div
              v-if="state === 'terminal'"
              key="terminal"
              class="mock-terminal-container"
            >
              <div class="terminal">
                <div class="terminal-header">
                  <span class="terminal-title">zsh — phishing_server.py</span>
                </div>
                <div class="terminal-body">
                  <div class="line prompt">
                    <span class="arrow">➔</span>
                    <span class="dir">Email-Phishing-Academic-Example</span>
                    <span class="branch">git:(main)</span>
                    <span class="cmd">make run-server</span>
                  </div>
                  <div class="line">sudo ./venv/bin/python app/server.py</div>
                  <div class="line">
                    Starting simulated phishing server on port 80...
                  </div>
                  <div class="line">
                    Make sure you started this with sudo if using port 80!
                  </div>
                  <div class="line">
                    Listening on: http://0.0.0.0:80/fake-login.html
                  </div>
                  <div class="line">* Serving Flask app 'server'</div>
                  <div class="line">* Debug mode: off</div>

                  <div v-if="showCaptured" class="captured-block">
                    <div class="line divider">
                      =================================================
                    </div>
                    <div class="line warning">
                      🚨 [DEMO] CREDENTIALS CAPTURED! 🚨
                    </div>
                    <div class="line animated-field">
                      <span class="key">Username:</span> {{ username }}
                    </div>
                    <div class="line animated-field delay-1">
                      <span class="key">Password:</span> {{ password }}
                    </div>
                    <div class="line animated-field delay-2">
                      <span class="key">IP: </span> 127.0.0.1
                    </div>
                    <div class="line divider">
                      =================================================
                    </div>
                    <div class="line success">[+] Resuming listener...</div>
                    <div class="line"><span class="cursor">_</span></div>
                  </div>
                </div>
              </div>
              <div class="hint">
                The terminal shows exactly what the attacker sees in real-time.
              </div>
              <button class="reset-btn" @click="reset">Reset Demo</button>
            </div>
          </transition>
        </div>
      </div>

      <div class="simulation-features">
        <div class="feature-card">
          <div class="icon">📧</div>
          <h4>Real-World Tactics</h4>
          <p>
            Demonstrates how urgency and fear are used to bypass critical
            thinking.
          </p>
        </div>
        <div class="feature-card">
          <div class="icon">🖥️</div>
          <h4>Live Feedback</h4>
          <p>
            Instant visualization of how data travels from a fake site to a
            hacker's terminal.
          </p>
        </div>
        <div class="feature-card">
          <div class="icon">🎓</div>
          <h4>Educational Impact</h4>
          <p>
            Proven to engage students and spark meaningful discussions about
            online safety.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
  name: 'InteractiveSimulation',
  setup() {
    const isVisible = ref(false)
    const section = ref<HTMLElement | null>(null)
    const state = ref<'email' | 'login' | 'terminal'>('email')
    const username = ref('')
    const password = ref('')
    const showCaptured = ref(false)

    const nextState = () => {
      if (state.value === 'email') {
        state.value = 'login'
      } else if (state.value === 'login') {
        if (!username.value) return
        state.value = 'terminal'
        setTimeout(() => {
          showCaptured.value = true
        }, 800)
      }
    }

    const autoFill = () => {
      username.value = '1234567890'
      password.value = 'thispasswordislegit'
    }

    const reset = () => {
      state.value = 'email'
      username.value = ''
      password.value = ''
      showCaptured.value = false
    }

    onMounted(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry && entry.isIntersecting) {
            isVisible.value = true
            observer.unobserve(entry.target)
          }
        },
        { threshold: 0.2 }
      )

      if (section.value) {
        observer.observe(section.value)
      }
    })

    return {
      isVisible,
      section,
      state,
      username,
      password,
      showCaptured,
      nextState,
      autoFill,
      reset,
    }
  },
})
</script>

<style scoped>
.simulation-section {
  padding: 6rem 2rem;
  background: var(--background-variant);
  min-height: auto;
}

.content-container {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0;
  transform: translateY(20px);
  transition: all 1s ease-out;
}

.is-visible .header {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: var(--text-color);
  margin-bottom: 0.5rem;
}

.description {
  font-size: 1.1rem;
  color: var(--secondary-text-color);
  max-width: 700px;
  margin: 0 auto;
}

.simulation-container {
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 3rem;
  width: 100%;
}

.rotate-prompt {
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--background-variant);
  border: 1px solid var(--outline-color);
  border-radius: 12px;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.phone-icon {
  width: 44px;
  height: 76px;
  border: 4px solid var(--text-color);
  border-radius: 8px;
  position: relative;
  animation: rotatePhone 2.5s ease-in-out infinite alternate;
  margin-bottom: 2rem;
}

.phone-icon::before {
  content: '';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 3px;
  background: var(--text-color);
  border-radius: 3px;
}

.phone-icon::after {
  content: '';
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: var(--text-color);
  border-radius: 50%;
}

@keyframes rotatePhone {
  0%,
  15% {
    transform: rotate(0deg);
  }
  85%,
  100% {
    transform: rotate(-90deg);
  }
}

.rotate-prompt h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-color);
}

.rotate-prompt p {
  color: var(--secondary-text-color);
  line-height: 1.6;
}

.simulation-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.browser-sim-wrapper {
  width: 100%;
  max-width: 1100px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  background: #111;
}

/* Browser Chrome */
.mock-browser-chrome {
  background: #2a2a2a;
  padding: 0.6rem 1rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-bottom: 1px solid #333;
}

.browser-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #ff5f56;
}
.dot.yellow {
  background: #ffbd2e;
}
.dot.green {
  background: #27c93f;
}

.browser-nav {
  display: flex;
  gap: 1rem;
  margin-left: 0.5rem;
  color: #888;
  font-size: 1.1rem;
}

.browser-address-bar {
  flex: 1;
  background: #1a1a1a;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.85rem;
  color: #aaa;
  border: 1px solid #333;
}

.url {
  color: #ddd;
}

/* Gmail UI */
.gmail-ui {
  display: flex;
  background: #111;
  color: #e0e0e0;
  height: 550px;
  font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}

.gmail-sidebar {
  width: 200px;
  padding: 1rem 0;
  background: #111;
  border-right: 1px solid #333;
}

.compose-btn {
  background: #fff;
  color: #000;
  width: 120px;
  padding: 0.7rem;
  border-radius: 16px;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 0.95rem;
}

.sidebar-nav {
  list-style: none;
  padding: 0;
  margin-bottom: 1rem;
}

.sidebar-nav li {
  padding: 0.35rem 1.2rem;
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  cursor: pointer;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: #c0c0c0;
}

.sidebar-nav li .icon {
  margin-right: 1.2rem;
  font-size: 1rem;
  width: 1.2rem;
  display: flex;
  justify-content: center;
}

.sidebar-nav li.active {
  background: #3c4043;
  color: #fff;
  font-weight: bold;
}

.sidebar-nav .count {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: normal;
}

.labels-header {
  padding: 0 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.85rem;
  color: #aaa;
}

.labels-title {
  padding-left: 0; /* Align to the left edge */
}

.gmail-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1a1a1a;
  overflow: hidden;
}

.gmail-topbar {
  padding: 0.6rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #333;
}

.topbar-left,
.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  color: #aaa;
}

.email-view {
  flex: 1;
  padding: 1rem 1.5rem;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  text-align: left;
}

.email-subject-line {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.email-subject-line h1 {
  font-size: 1.3rem;
  font-weight: 500;
  margin: 0;
}

.email-sender {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.tiktok-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow:
    1px 0 #25f4ee,
    -1px 0 #fe2c55;
}

.sender-info {
  flex: 1;
  font-size: 0.85rem;
}

.sender-name {
  font-weight: bold;
}

.sender-email {
  color: #aaa;
  font-size: 0.8rem;
}

.to-me {
  color: #aaa;
  font-size: 0.7rem;
}

.sender-time {
  text-align: right;
  font-size: 0.75rem;
  color: #aaa;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.email-body-wrapper {
  background: #f1f3f4;
  padding: 1.5rem;
  border-radius: 8px;
  color: #333;
}

.security-card {
  background: #fff;
  border-radius: 8px;
  max-width: 450px;
  margin: 0 auto;
  overflow: hidden;
}

.card-top-border {
  height: 6px;
  background: #fe2c55;
}

.card-content {
  padding: 1.5rem;
  text-align: center;
}

.card-content h2 {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
}

.card-content p {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.secure-btn {
  background: #fe2c55;
  color: white;
  border: none;
  padding: 0.7rem 1.8rem;
  border-radius: 4px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  margin: 1rem 0;
}

.email-footer-actions {
  margin-top: auto;
  padding: 1rem 0;
  display: flex;
  gap: 1rem;
}

.footer-btn {
  background: transparent;
  border: 1px solid #555;
  color: #aaa;
  padding: 0.4rem 1.2rem;
  border-radius: 16px;
  cursor: pointer;
  font-size: 0.8rem;
}

.footer-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

/* TikTok UI */
.tiktok-ui {
  width: 100%;
  height: 550px;
  background: #121212;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.tiktok-header {
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.tiktok-logo {
  font-size: 1.6rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-icon {
  color: #fe2c55;
  font-size: 2rem;
  text-shadow:
    2px 0 #25f4ee,
    -2px 0 #fe2c55;
}

.login-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 1rem;
}

.login-container h1 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.login-form {
  width: 100%;
  max-width: 360px;
}

.input-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  margin-bottom: 0.4rem;
  font-weight: 600;
}

.alt-login {
  color: #aaa;
  font-weight: normal;
}

.input-row {
  display: flex;
  background: #2f2f2f;
  border-radius: 4px;
  margin-bottom: 1rem;
  align-items: center;
  padding: 0.4rem 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.input-row:hover {
  border-color: #555;
}

.country-selector {
  border-right: 1px solid #444;
  padding-right: 0.8rem;
  margin-right: 0.8rem;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.arrow-small {
  font-size: 0.6rem;
}

.input-row input {
  background: transparent;
  border: none;
  color: #fff;
  flex: 1;
  font-size: 0.9rem;
  outline: none;
}

.login-links {
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #aaa;
  margin-bottom: 1.5rem;
  justify-content: flex-start;
}

.links-divider {
  color: #444;
}

.tiktok-login-btn {
  width: 100%;
  padding: 0.8rem;
  border: none;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.95rem;
  background: #333;
  color: #777;
  transition: all 0.2s;
}

.tiktok-login-btn.active {
  background: #fe2c55;
  color: #fff;
  cursor: pointer;
}

.tiktok-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.85rem;
  color: #aaa;
}

.signup {
  color: #fe2c55;
  font-weight: 600;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  font-size: 0.75rem;
  padding: 0 1rem;
}

/* Terminal */
.terminal {
  background: #0d0d0d;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
  width: 100%;
  max-width: 800px;
}

.terminal-header {
  background: #1a1a1a;
  padding: 0.6rem 1rem;
}

.terminal-body {
  padding: 1.5rem;
  font-family: 'Fira Code', monospace;
  font-size: 0.85rem;
  color: #e0e0e0;
  min-height: 400px;
}

.line {
  margin-bottom: 0.2rem;
}
.prompt .dir {
  color: #8be9fd;
  font-weight: bold;
}
.prompt .branch {
  color: #ff5555;
}
.prompt .cmd {
  color: #e0e0e0;
}
.prompt .arrow {
  color: #50fa7b;
}

.captured-block {
  margin-top: 1.5rem;
}

.animated-field {
  opacity: 0;
  transform: translateX(-10px);
  animation: slideInField 0.4s ease-out forwards;
}

.delay-1 {
  animation-delay: 0.2s;
}
.delay-2 {
  animation-delay: 0.4s;
}

@keyframes slideInField {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.warning {
  color: #ff5555;
  font-weight: bold;
}
.key {
  color: #8be9fd;
}

.cursor {
  display: inline-block;
  width: 8px;
  height: 1.1em;
  background: #50fa7b;
  vertical-align: middle;
  animation: blink 1s infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.hint {
  text-align: center;
  margin-top: 1.5rem;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  font-style: italic;
}

.reset-btn {
  display: block;
  margin: 2rem auto 0;
  background: transparent;
  color: var(--text-color);
  border: 1px solid var(--outline-color);
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
}

/* Features Grid */
.simulation-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  background: var(--background-color);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--outline-color);
  text-align: center;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 1024px) {
  .gmail-sidebar {
    display: none;
  }
  .simulation-features {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) and (orientation: portrait) {
  .rotate-prompt {
    display: flex;
  }
  .simulation-wrapper {
    display: none;
  }
  .simulation-section {
    padding: 4rem 1rem;
  }
  .section-title {
    font-size: 2rem;
  }
}

@media (max-width: 850px) and (orientation: landscape) {
  .simulation-section {
    padding: 2rem 1rem;
  }
  .section-title {
    font-size: 1.8rem;
  }
  .simulation-wrapper {
    transform: scale(0.85);
    transform-origin: top center;
    margin-bottom: -10%;
  }
  .terminal-body {
    font-size: 0.7rem;
    min-height: 400px;
  }
  .tiktok-header {
    padding: 1rem;
  }
  .login-container h1 {
    font-size: 1.5rem;
  }
  .browser-sim-wrapper {
    height: auto;
  }
}
</style>
