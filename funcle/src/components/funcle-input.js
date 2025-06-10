import { LitElement, html, css } from 'lit';

class FuncleInputRow extends LitElement {
  static properties = {
    numberOfLetters: { type: Number },
    active: {type: Boolean},
    errorState: { type: Boolean },
    guessAttempt: { type: Boolean },
    correctLetter: { type: Array },
    correctLetterAndPosition: { type: Array },
    lastKey: { type: String}
  };

  static styles = css`
    @font-face {
      font-family: 'Consolas';
      src: url('../fonts/CONSOLA.tff') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .row-wrapper {
      display: flex;
      align-items: center;
    }
    .grid {
      display: flex;
      gap: 0.3rem;
    }
    .square {
      width: 3rem;
      height: 3rem;
      border: 0.15rem solid #555;
      font-size: 2rem;
      text-align: center;
      line-height: 3.5rem;
      cursor: pointer;
      user-select: none;
      text-transform: lowercase;
    }
    .square.active {
      border-color:rgb(221, 146, 8);
      background-color:rgba(238, 238, 228, 0.51);
    }
    .square.allCorrect {
      border-color: rgb(11, 104, 8);
      background-color: rgba(131, 235, 117, 0.42);
    }
    .square.correctLetter {
      border-color: rgb(209, 192, 37);
      background-color: rgba(255, 227, 150, 0.4);
    }
    .square.incorrect {
      border-color: rgb(30, 30, 30);
      background-color: rgba(200, 200, 200, 0.86);
    }
    .square.error {
      border-color: rgb(256, 0, 0);
    }
    div {
      font-family: 'Consolas', sans-serif;
    }
    .chevron {
      width: 2rem;
      font-size: 2rem;
      text-align: right;
      font-family: monospace;
      margin-right: 0.5rem;
    }
    .chevron.placeholder {
      visibility: hidden;
    }
  `;

  constructor() {
    super();

    // Reactive properties
    this.active = false;
    this.errorState = false;
    this.guessAttempt = false;
    this.correctLetter = [];
    this.correctLetterAndPosition = [];
    this.lastKey = '';

    // State variables
    this.letters = [""];
    this.activeIndex = null;
    this._handleKeyFunc = this._handleKeyFromKeyboard.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this.letters = Array(this.numberOfLetters).fill("");
    window.addEventListener('keydown', this._handleKeyFunc);
    if (this.activeIndex === null) {
      this.activeIndex = 0;
      this.requestUpdate();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.active) {
      window.removeEventListener('keydown', this._handleKey);
    }
  }

  handleKeyFromClick (key) {
    this._handleKey(key);
  }

  _handleKeyFromKeyboard (e) {
    this._handleKey(e.key);
  }

  _handleKey (e) {
    // Ignore unless the selected box in row
    if (!this.active) return;

    const key = e.toLowerCase();
    if (/^[a-z0-9]$/.test(key)) {
      if (this.activeIndex < 5) {
        this.letters[this.activeIndex] = key;
        this.letters = [...this.letters]; // reassign to trigger re-render
        this.activeIndex = (this.activeIndex + 1);
        this._sendClearErrorEvent();
      }
      this.requestUpdate();
    } else if (e === 'Backspace') {
      if (this.activeIndex > 0) {
        this.letters[this.activeIndex - 1] = '';
        this.activeIndex = this.activeIndex - 1;
        this._sendClearErrorEvent();
      }
      this.letters = [...this.letters];
      this.requestUpdate();
    } else if (e === "Enter") {
      this._sendGuessEvent();
    }
  }

  _sendClearErrorEvent () {
    this.dispatchEvent(new CustomEvent('clear-error', {
      detail: true,
      bubbles: true,
      composed: true
    }))
  }

  _sendGuessEvent () {
    const guessWord = this.letters.join('');
    if (guessWord.length === this.numberOfLetters) {
      this.dispatchEvent(new CustomEvent('guess-enter', {
        detail: guessWord,
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="row-wrapper">
        ${this.active ? html`<div class="chevron">>></div>` : html`<div class="chevron placeholder"></div>`}
        <div class="grid">
          ${this.letters.map((letter, i) => html`
            <div
              class="square
                ${this.active && this.activeIndex === i ? 'active' : ''}
                ${this.active && this.errorState ? 'error' : ''}
                ${this.guessAttempt && this.correctLetter[i] ? 'correctLetter' : ''}
                ${this.guessAttempt && this.correctLetterAndPosition[i] ? 'allCorrect' : ''}
                ${this.guessAttempt && !this.correctLetter[i] && !this.correctLetterAndPosition[i] ? 'incorrect' : ''}"
            >
              ${letter}
            </div>
          `)}
        </div>
      </div>
    `;
  }
}

customElements.define('funcle-input-row', FuncleInputRow);
