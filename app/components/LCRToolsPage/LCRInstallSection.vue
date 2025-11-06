<template>
  <div class="lcr-install">
    <div class="install-container">
      <div class="section-header">
        <h2 class="section-title">Get Started</h2>
        <p class="section-subtitle">
          Install LCR Tools in just a few clicks and start enhancing your LCR
          experience
        </p>
      </div>

      <div class="install-steps">
        <div class="steps-row">
          <div class="step-single">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3>Visit Chrome Web Store</h3>
              <p>
                Click the "Open Chrome Web Store" button to open the extension
                listing
              </p>
              <a
                href="https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn"
                target="_blank"
                class="step-button"
              >
                <img
                  src="@/assets/icons/chrome-web-store.png"
                  alt="Chrome Web Store"
                  class="step-icon"
                />
                Open Chrome Web Store
              </a>
            </div>
          </div>

          <div class="step-single">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3>Add to Chrome</h3>
              <p>Click "Add to Chrome" and confirm the installation</p>
              <div class="step-visual">
                <div class="chrome-button-demo-disabled">
                  <img
                    src="@/assets/icons/chrome-web-store.png"
                    alt="Chrome"
                    class="chrome-icon"
                  />
                  Add to Chrome
                </div>
              </div>
            </div>
          </div>

          <div class="step-single">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3>Start Using LCR Tools</h3>
              <p>
                Visit any LCR page and click the puzzle piece icon in Chrome's
                toolbar to access LCR Tools
              </p>
              <div class="step-visual">
                <div class="extension-demo">
                  <div class="browser-bar">
                    <div class="browser-dots">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                    <div class="url-bar">lcr.churchofjesuschrist.org</div>
                    <div class="extension-toolbar">
                      <div
                        class="puzzle-piece-icon"
                        @click="toggleExtensionMenu"
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 512 512"
                          fill="currentColor"
                        >
                          <path
                            d="M0 0 C13.93969858 10.83377104 21.75064534 24.77383881 24.58256531 42.15296936 C25.46871397 50.3196146 25.20206487 58.54622614 25.125 66.75 C25.11494733 68.62239103 25.10582554 70.4947873 25.09765625 72.3671875 C25.07583038 76.9115899 25.04142737 81.45573575 25 86 C26.26374451 85.99333817 27.52748901 85.98667633 28.82952881 85.97981262 C40.77527327 85.91883351 52.72098589 85.87394688 64.66685104 85.84456348 C70.80742664 85.82894907 76.94787596 85.80778815 83.08837891 85.77368164 C89.02117392 85.74093736 94.95384793 85.72311526 100.88672638 85.71536827 C103.14319003 85.70985174 105.39964753 85.6990797 107.65605927 85.68280983 C125.93721916 85.55630996 142.23783936 86.2606953 156.44921875 99.38671875 C167.29949307 110.67428373 171.34565916 124.12374874 171.22705078 139.47680664 C171.22734283 140.48273865 171.22763489 141.48867065 171.22793579 142.52508545 C171.22655248 145.82019957 171.21103854 149.11508207 171.1953125 152.41015625 C171.19157882 154.70657732 171.18873352 157.00299998 171.18673706 159.29942322 C171.1791286 165.32128354 171.15950414 171.34304622 171.1373291 177.36486816 C171.11681049 183.51862264 171.10772251 189.672393 171.09765625 195.82617188 C171.07625555 207.8841573 171.04215341 219.94207051 171 232 C172.12792969 231.98428955 173.25585938 231.9685791 174.41796875 231.95239258 C178.68221634 231.89727813 182.94643391 231.86335981 187.2109375 231.83520508 C189.04172086 231.82030112 190.87246973 231.79997086 192.703125 231.77368164 C207.07949439 231.57269621 222.32252932 231.50758673 235.3125 238.5625 C235.97000244 238.90909668 236.62750488 239.25569336 237.30493164 239.61279297 C251.56236387 247.46995926 261.23809079 260.25704131 266.34375 275.59765625 C270.78769931 291.86568498 268.75353816 308.76396942 261.3125 323.6875 C257.95773173 329.49904302 253.72084292 334.2624165 249 339 C248.45859375 339.56460937 247.9171875 340.12921875 247.359375 340.7109375 C232.18429971 355.19623664 212.32669763 355.43117425 192.75 355.1875 C190.63672829 355.17242604 188.52344617 355.15874244 186.41015625 355.14648438 C181.27317727 355.11369351 176.13670533 355.06206057 171 355 C171.00888245 356.27183136 171.01776489 357.54366272 171.0269165 358.85403442 C171.10828932 370.88742995 171.16810267 382.92076906 171.20724869 394.95437813 C171.22805116 401.13978745 171.25623408 407.32497321 171.30175781 413.51025391 C171.34547802 419.48845467 171.3691922 425.46644148 171.37950897 431.44478989 C171.38685356 433.71636188 171.40119477 435.98792325 171.42292023 438.25940323 C171.59755562 457.2890481 170.26582007 473.14535238 156.6875 487.8125 C146.87260714 496.94974992 134.59952371 501.66124952 121.29614258 501.45410156 C120.28991852 501.45468567 119.28369446 501.45526978 118.24697876 501.45587158 C114.96246311 501.45311271 111.67888588 501.4221251 108.39453125 501.390625 C106.10097245 501.3831548 103.80740722 501.37746555 101.51383972 501.37347412 C95.50831145 501.35827928 89.50317668 501.31905062 83.49780273 501.2746582 C77.35731324 501.23357245 71.21675951 501.21543477 65.07617188 501.1953125 C53.05060938 501.15255029 41.02533755 501.0843739 29 501 C28.98018066 499.92218262 28.96036133 498.84436523 28.93994141 497.73388672 C28.86284606 493.66694976 28.77430617 489.60032331 28.68261719 485.53369141 C28.64475029 483.78635873 28.60983086 482.03895923 28.578125 480.29150391 C28.15459066 457.22211767 25.91733761 436.28900503 9.25 418.75 C-4.32111526 405.83390086 -21.56632898 399.36311007 -40.21875 399.6875 C-57.92035177 401.15044229 -73.5348269 408.73313682 -85.6875 421.75 C-94.68480908 432.63589518 -100.92374021 446.41825344 -101.20532227 460.69848633 C-101.22526749 461.59904251 -101.24521271 462.49959869 -101.26576233 463.42744446 C-101.29083107 464.86521492 -101.29083107 464.86521492 -101.31640625 466.33203125 C-101.33718735 467.32377853 -101.35796844 468.31552582 -101.37937927 469.33732605 C-101.44460052 472.49564899 -101.50363202 475.65405288 -101.5625 478.8125 C-101.60571131 480.95769056 -101.64932643 483.10287302 -101.69335938 485.24804688 C-101.80025372 490.49861311 -101.90207037 495.74925932 -102 501 C-115.2222229 501.09293467 -128.44436728 501.16388401 -141.66685104 501.20724869 C-147.80747822 501.22806808 -153.9478809 501.2562825 -160.08837891 501.30175781 C-166.02118366 501.34541692 -171.9537733 501.36917953 -177.88672638 501.37950897 C-180.14320508 501.38686439 -182.39967285 501.40122731 -184.65605927 501.42292023 C-200.66262749 501.57060077 -212.83827773 501.02923237 -226 491 C-227.546875 489.88625 -227.546875 489.88625 -229.125 488.75 C-236.78096925 481.42689898 -243.48647269 470.76738876 -244.12304783 459.89921951 C-244.12212604 459.14334927 -244.12120424 458.38747902 -244.12025452 457.60870361 C-244.12162918 456.73654709 -244.12300385 455.86439056 -244.12442017 454.96580505 C-244.12082489 454.01706009 -244.11722961 453.06831512 -244.11352539 452.09082031 C-244.11367142 451.08561844 -244.11381744 450.08041656 -244.1139679 449.04475403 C-244.11327128 445.72252239 -244.10549058 442.40034684 -244.09765625 439.078125 C-244.09579118 436.77455679 -244.0943677 434.47098818 -244.09336853 432.16741943 C-244.08955037 426.10442001 -244.07972604 420.04144455 -244.06866455 413.97845459 C-244.05843538 407.79162927 -244.05386768 401.60480009 -244.04882812 395.41796875 C-244.03810317 383.27863531 -244.02103513 371.13931965 -244 359 C-242.71536865 358.9906543 -241.4307373 358.98130859 -240.10717773 358.97167969 C-235.27041896 358.93134123 -230.4342674 358.86546804 -225.59790039 358.79248047 C-223.51790254 358.76452221 -221.43780342 358.74318479 -219.35766602 358.72900391 C-196.39557044 358.5632126 -177.0515362 354.84207148 -160.03515625 338.0625 C-148.06204678 325.06761533 -142.54192126 308.45498004 -142.7265625 290.9140625 C-144.0721778 271.65254063 -152.9233606 255.93301825 -167.0625 243.1328125 C-184.33144076 229.24570597 -204.58898382 228.91497118 -225.625 228.4375 C-227.41016462 228.39422426 -229.19532101 228.35060737 -230.98046875 228.30664062 C-235.32022748 228.2004911 -239.66007178 228.09896742 -244 228 C-244.09298747 215.05581682 -244.16391053 202.1117141 -244.20724869 189.16726398 C-244.2280567 183.15557811 -244.2562499 177.14412202 -244.30175781 171.13256836 C-244.34545807 165.32295178 -244.36918805 159.5135552 -244.37950897 153.70378685 C-244.3868571 151.49558236 -244.40120544 149.28738889 -244.42292023 147.07927895 C-244.59134772 129.23041181 -243.44344285 114.26838707 -230.67578125 100.4921875 C-219.52934369 89.88819823 -206.44640267 85.48320652 -191.2043457 85.65942383 C-190.18836807 85.65898575 -189.17239044 85.65854767 -188.12562561 85.65809631 C-184.80880677 85.66016568 -181.49251042 85.68340869 -178.17578125 85.70703125 C-175.85979997 85.71263379 -173.5438151 85.71690078 -171.22782898 85.71989441 C-165.16319787 85.73129128 -159.09878589 85.76071379 -153.03424072 85.79400635 C-146.83340417 85.82481884 -140.63253184 85.83842356 -134.43164062 85.85351562 C-122.2876647 85.88558866 -110.14385065 85.93672213 -98 86 C-98.02094727 84.71536865 -98.04189453 83.4307373 -98.06347656 82.10717773 C-98.13671892 77.27086857 -98.18210146 72.43460676 -98.21972656 67.59790039 C-98.23965241 65.51773798 -98.2668032 63.43763016 -98.30175781 61.35766602 C-98.6447217 40.40156384 -96.36675193 23.10352479 -81.265625 7.27734375 C-80.14414062 6.15005859 -80.14414062 6.15005859 -79 5 C-78.39671875 4.36191406 -77.7934375 3.72382813 -77.171875 3.06640625 C-56.89954089 -16.72115465 -22.03150005 -15.58325613 0 0 Z"
                            fill="currentColor"
                            transform="translate(244,11)"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div class="page-content">
                    <div class="lcr-content">
                      <h4>LCR - Leader and Clerk Resources</h4>
                      <p>
                        Click the puzzle piece icon above to access LCR Tools
                      </p>
                    </div>

                    <!-- Extension Menu Popup -->
                    <div v-if="showExtensionMenu" class="extension-menu">
                      <div class="extension-menu-header">
                        <div class="extension-icon">
                          <img
                            src="@/assets/images/lcrToolsLogo.jpg"
                            alt="LCR Tools"
                          />
                        </div>
                        <div class="extension-info">
                          <h4>LCR Tools</h4>
                        </div>
                        <div class="extension-actions">
                          <button class="pin-button">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                d="M16 12V4H17V2H7V4H8V12L6 14V16H8.5V22H15.5V16H18V14L16 12Z"
                              />
                            </svg>
                          </button>
                          <button class="menu-button">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                            >
                              <path
                                d="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="install-cta">
        <div class="cta-content">
          <h3>Ready to Get Started?</h3>
          <p>
            Join other clerks and leaders who are already using LCR Tools to
            streamline their workflow
          </p>
          <a
            href="https://chromewebstore.google.com/detail/lcr-tools/camjilfjkjmgcpmnheoeoomfndedpmbn"
            target="_blank"
            class="install-button"
          >
            <img
              src="@/assets/icons/chrome-web-store.png"
              alt="Chrome Web Store"
              class="button-icon"
            />
            Install LCR Tools
          </a>
        </div>
        <div class="cta-stats">
          <div class="stat">
            <span class="stat-number">5.0</span>
            <span class="stat-label">Rating</span>
          </div>
          <div class="stat">
            <span class="stat-number">15+</span>
            <span class="stat-label">Users</span>
          </div>
          <div class="stat">
            <span class="stat-number">Free</span>
            <span class="stat-label">Forever</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'LCRInstallSection',
  setup() {
    const showExtensionMenu = ref(false)

    const toggleExtensionMenu = () => {
      showExtensionMenu.value = !showExtensionMenu.value
    }

    return {
      showExtensionMenu,
      toggleExtensionMenu,
    }
  },
})
</script>

<style scoped>
.lcr-install {
  padding: 5rem 1rem;
  padding-top: 0;
  background: var(--background-color);
}

.install-container {
  max-width: 1000px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.section-subtitle {
  font-size: 1.2rem;
  color: var(--secondary-text-color);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.install-steps {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 4rem;
}

.steps-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
}

.step-single {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease-out both;
  max-width: 300px;
  flex: 1;
  min-width: 250px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  animation: fadeInUp 0.6s ease-out both;
}

.step-single:nth-child(1) {
  animation-delay: 0.1s;
}
.step-single:nth-child(2) {
  animation-delay: 0.2s;
}
.step:nth-child(2) {
  animation-delay: 0.3s;
}

.step-number {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 700;
  flex-shrink: 0;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.step-content {
  flex: 1;
  max-width: 500px;
}

.step-content h3 {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.75rem 0;
}

.step-content p {
  color: var(--secondary-text-color);
  line-height: 1.6;
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
}

.step-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: var(--background-variant);
  color: var(--text-color);
  text-decoration: none;
  border-radius: 50px;
  font-weight: 500;
  border: 2px solid var(--outline-color);
  transition: all 0.3s ease;
}

.step-button:hover {
  background: var(--outline-color);
  transform: translateY(-2px);
  box-shadow: 0 4px 16px var(--shadow);
}

.step-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.step-visual {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
}

.chrome-button-demo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  color: white;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(66, 133, 244, 0.3);
}

.chrome-button-demo-disabled {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--background-variant);
  color: var(--secondary-text-color);
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 8px var(--shadow);
  cursor: not-allowed;
  border: 2px solid var(--outline-color);
}

.chrome-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.extension-demo {
  background: var(--background-variant);
  border-radius: 8px;
  border: 1px solid var(--outline-color);
  overflow: visible;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
}

.browser-bar {
  background: #f1f3f4;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--outline-color);
  justify-content: space-between;
}

.browser-dots {
  display: flex;
  gap: 0.25rem;
}

.browser-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ccc;
}

.browser-dots span:nth-child(1) {
  background: #ff5f57;
}
.browser-dots span:nth-child(2) {
  background: #ffbd2e;
}
.browser-dots span:nth-child(3) {
  background: #28ca42;
}

.url-bar {
  background: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
  flex: 1;
  margin: 0 1rem;
}

.extension-toolbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.puzzle-piece-icon {
  width: 32px;
  height: 32px;
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5f6368;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.3);
  animation: pulseGlow 2s ease-in-out infinite;
}

.puzzle-piece-icon:hover {
  background: #e8f0fe;
  border-color: #1a73e8;
  color: #1a73e8;
  box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.2);
  animation: none;
}

.page-content {
  padding: 2rem;
  text-align: center;
  color: var(--secondary-text-color);
  font-size: 0.9rem;
  position: relative;
}

.lcr-content h4 {
  color: var(--text-color);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.lcr-content p {
  color: var(--secondary-text-color);
  font-size: 0.85rem;
  margin: 0;
}

/* Extension Menu Popup */
.extension-menu {
  position: absolute;
  top: 0;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  z-index: 10;
  min-width: 200px;
  animation: slideDown 0.2s ease-out;
}

.extension-menu-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  gap: 12px;
}

.extension-menu .extension-icon {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
}

.extension-menu .extension-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.extension-info {
  flex: 1;
  min-width: 0;
}

.extension-info h4 {
  font-size: 14px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 2px 0;
  line-height: 1.2;
}

.extension-info p {
  font-size: 12px;
  color: #5f6368;
  margin: 0;
  line-height: 1.3;
}

.extension-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

.pin-button,
.menu-button {
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #5f6368;
  transition: all 0.2s ease;
}

.pin-button:hover,
.menu-button:hover {
  background: #f1f3f4;
  color: #202124;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseGlow {
  0% {
    box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.3);
  }
  50% {
    box-shadow: 0 0 0 4px rgba(26, 115, 232, 0.1);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.3);
  }
}

.install-cta {
  background: var(--background-variant);
  border-radius: 16px;
  padding: 3rem 2rem;
  text-align: center;
  border: 1px solid var(--outline-color);
  box-shadow: 0 4px 16px var(--shadow);
}

.cta-content h3 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
  margin: 0 0 1rem 0;
}

.cta-content p {
  font-size: 1.1rem;
  color: var(--secondary-text-color);
  margin: 0 0 2rem 0;
  line-height: 1.6;
}

.install-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #4285f4 0%, #34a853 100%);
  color: white;
  text-decoration: none;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(66, 133, 244, 0.3);
  margin-bottom: 2rem;
}

.install-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(66, 133, 244, 0.4);
}

.button-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.cta-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-number {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}

.stat-label {
  font-size: 0.9rem;
  color: var(--secondary-text-color);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .lcr-install {
    padding: 3rem 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .step {
    gap: 1rem;
  }

  .steps-row {
    flex-direction: column;
    gap: 2rem;
  }

  .step-single {
    max-width: 100%;
    min-width: auto;
  }

  .install-cta {
    padding: 2rem 1.5rem;
  }

  .cta-content h3 {
    font-size: 1.75rem;
  }

  .cta-stats {
    gap: 2rem;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 1.75rem;
  }

  .section-subtitle {
    font-size: 1rem;
  }

  .step-content h3 {
    font-size: 1.25rem;
  }

  .step-content p {
    font-size: 0.95rem;
  }

  .cta-content h3 {
    font-size: 1.5rem;
  }

  .cta-content p {
    font-size: 1rem;
  }

  .extension-demo {
    max-width: 100%;
  }
}

/* Dark mode adjustments */
@media (prefers-color-scheme: dark) {
  .chrome-button-demo-disabled {
    background: var(--background-variant);
    color: var(--secondary-text-color);
    border-color: var(--outline-color);
  }

  .puzzle-piece-icon {
    background: #2d2d2d;
    border-color: #555;
    color: #ccc;
  }

  .puzzle-piece-icon {
    box-shadow: 0 0 0 0 rgba(74, 158, 255, 0.3);
  }

  .puzzle-piece-icon:hover {
    background: #1a1a1a;
    border-color: #4a9eff;
    color: #4a9eff;
    box-shadow: 0 0 0 4px rgba(74, 158, 255, 0.2);
  }

  .extension-menu {
    background: #2d2d2d;
    border-color: #555;
  }

  .extension-menu-header {
    border-bottom-color: #555;
  }

  .extension-info h4 {
    color: #e0e0e0;
  }

  .extension-info p {
    color: #999;
  }

  .pin-button:hover,
  .menu-button:hover {
    background: #3a3a3a;
    color: #e0e0e0;
  }
}

/* Force light theme for puzzle icon and menu across devices */
.lcr-install .puzzle-piece-icon,
.lcr-install .puzzle-piece-icon:hover {
  background: #f8f9fa !important;
  border-color: #e0e0e0 !important;
  color: #5f6368 !important;
  box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.3) !important;
}

.lcr-install .extension-demo .extension-menu,
.lcr-install .page-content .extension-menu,
.lcr-install .extension-menu.extension-menu {
  background: #ffffff !important;
  border-color: #e0e0e0 !important;
}

.lcr-install .extension-menu .extension-info h4 {
  color: #202124 !important;
}

.lcr-install .extension-menu .extension-info p {
  color: #5f6368 !important;
}

.lcr-install .extension-menu .pin-button:hover,
.lcr-install .extension-menu .menu-button:hover {
  background: #f1f3f4 !important;
  color: #202124 !important;
}
</style>
