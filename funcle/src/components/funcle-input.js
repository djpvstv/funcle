import { LitElement, html, css } from 'lit';

class FuncleInputRow extends LitElement {
  static properties = {
    active: {type: Boolean},
    errorState: { type: Boolean },
    guessAttempt: { type: Boolean },
    correctLetter: { type: Boolean },
    correctLetterAndPosition: { type: Boolean }
  };

  static styles = css`
    @font-face {
      font-family: 'Consolas';
      src: url('../fonts/CONSOLA.tff') format('truetype');
      font-weight: normal;
      font-style: normal;
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
      background-color: #eeeee4;
    }
    .square.error {
      border-color: rgb(256, 0, 0);
    }
    div {
      font-family: 'Consolas', sans-serif;
    }
  `;

  constructor() {
    super();
    this.NUMBER_OF_LETTERS = 5;

    // Reactive properties
    this.active = false;
    this.errorState = false;
    this.guessAttempt = false;
    this.correctLetter = false;
    this.correctLetterAndPosition = false;

    // State variables
    this.letters = Array(this.NUMBER_OF_LETTERS).fill("");
    this.activeIndex = null;
    this._handleKey = this._handleKey.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.active) {
      window.addEventListener('keydown', this._handleKey);
      if (this.activeIndex === null) {
        this.activeIndex = 0;
        this.requestUpdate();
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.active) {
      window.removeEventListener('keydown', this._handleKey);
    }
  }

  _handleKey(e) {
    // Ignore unless the selected box in row
    if (this.activeIndex === null) return;

    const key = e.key.toLowerCase();
    if (/^[a-z0-9]$/.test(key)) {
      if (this.activeIndex < 5) {
        this.letters[this.activeIndex] = key;
        this.letters = [...this.letters]; // reassign to trigger re-render
        this.activeIndex = (this.activeIndex + 1);
        this._sendClearErrorEvent();
      }
      this.requestUpdate();
    } else if (e.key === 'Backspace') {
      if (this.activeIndex > 0) {
        this.letters[this.activeIndex - 1] = '';
        this.activeIndex = this.activeIndex - 1;
        this._sendClearErrorEvent();
      }
      this.letters = [...this.letters];
      this.requestUpdate();
    } else if (e.key === "Enter") {
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
    if (guessWord.length === this.NUMBER_OF_LETTERS) {
      this.dispatchEvent(new CustomEvent('guess-enter', {
        detail: guessWord,
        bubbles: true,
        composed: true
      }));
    }
  }

  render() {
    return html`
      <div class="grid">
        ${this.letters.map((letter, i) => html`
          <div
            class="square
              ${this.activeIndex === i ? 'active' : ''}
              ${this.errorState && this.active ? 'error' : ''}"
          >
            ${letter}
          </div>
        `)}
      </div>
    `;
  }
}

customElements.define('funcle-input-row', FuncleInputRow);
