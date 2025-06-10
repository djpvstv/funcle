import { LitElement, html, css } from 'lit';
import '@src/components/funcle-input.js';
import gameKeys from "@data/list.json" assert {type: 'json'};

class FuncleGame extends LitElement {
  static properties = {
    activeRow: { type: Number },
    activeRowErrorState: { type: Boolean },
    dictionaryReady: { type: Boolean }
  };

  static styles = css`
    .game {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;
      align-items: center;
      margin-top: 2rem;
    }
  `;

  constructor() {
    super();
    this.activeRow = 0;
    this.numberOfRows = 6;
    this.activeRowErrorState = false;
    this.dictionaryReady = false;
    this.wordSet = new Set();

    this.code = '';
  }

  async connectedCallback () {
    super.connectedCallback();

    await this._createGame();
  }

  async _createGame () {
    const numKeys = gameKeys.five.length;
    const idx = this._pseudoRandomGen(numKeys);
    this.code = gameKeys.five[idx];
    
    this.wordSet = new Set(gameKeys.five.map(w => w.toLowerCase()));
    this.dictionaryReady = true;
    this.requestUpdate();
  }

  _onGuessEnter(e) {
    const guess = e.detail;

    // Check if guess is a valid function
    if (!this.wordSet.has(guess)) {
      this.activeRowErrorState = true;
      this.requestUpdate();
      return;
    }

    // Logic for checking against keyword

    // if (this.activeRow < 4) {
    //   this.activeRow++;
    //   this.requestUpdate();32r
    // }
  }

  _clearError (e) {
    this.activeRowErrorState = false;
  }

  _pseudoRandomGen (max) {
    const today = new Date().toISOString().slice(0,10); // Just get MDY
    const hash = [...today].reduce((h,c) => (h * 31 + c.charCodeAt(0)) >> 0, 0);

    return (hash % max) + 1;
  }

  render() {

    if (!this.dictionaryReady) {
      return html`<p>Loading ...</p>`;
    }

    return html`
      <div
        class="game"
        @guess-enter=${this._onGuessEnter}
        @clear-error=${this._clearError}
      >
        ${Array.from(Array(this.numberOfRows).keys()).map(i => html`
          <funcle-input-row ?active=${this.activeRow === i} ?errorState=${this.activeRowErrorState}></funcle-input-row>
        `)}
      </div>
    `;
  }
}

customElements.define('funcle-game', FuncleGame);
