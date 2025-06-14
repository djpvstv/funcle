import { LitElement, html, css } from 'lit';
import '@src/components/funcle-input.js';
import '@src/components/funcle-keys.js';
import gameKeys from "@data/list.json" assert {type: 'json'};

class FuncleGame extends LitElement {
    static properties = {
        activeRow: { type: Number },
        activeRowErrorState: { type: Boolean },
        dictionaryReady: { type: Boolean },
        lastKey: { type: String }
    };

    static styles = css`
        :host {
            display: block;
            flex: 1 1 auto;
        }
        .game {
            flex: 1 1 auto;
            display: flex;
            flex-direction: column;
            gap: 0.3rem;
            align-items: center;
        }
    `;

    constructor() {
        super();

        const params = new URLSearchParams(window.location.search);
        let nol = Number(params.get('difficulty')) || 5;
        if (nol > 8 || nol < 5) {
        nol = 5;
        }
        this.NUMBER_OF_LETTERS = nol;

        this.activeRow = 0;
        this.numberOfRows = 6;
        this.activeRowErrorState = false;
        this.dictionaryReady = false;
        this.lastKey = '';

        this.wordSet = new Set();
        this.guessAttempts = Array(this.numberOfRows).fill(false);
        this.positionValues = Array(this.numberOfRows).fill(Array(this.NUMBER_OF_LETTERS));
        this.guessedLetterSet = new Set();
        this.guessedLetterList = [];
        this.guessedLetterState = [];
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

    _getActiveRow () {
        const rows = this.shadowRoot.querySelectorAll('funcle-input-row');
        return rows[this.activeRow];
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
        const tempPositions = Array(this.NUMBER_OF_LETTERS).fill(0);
        const code = this.code;
        const guessArr = [...guess];
        const letterCount = {};

        for (let i = 0; i < this.NUMBER_OF_LETTERS; i++) {
            if (guessArr[i] === code[i]) {
                tempPositions[i] = 2;
            } else {
                const c = code[i];
                letterCount[c] = (letterCount[c] || 0) + 1;
            }
        }

        for (let i = 0; i < this.NUMBER_OF_LETTERS; i++) {
            if (tempPositions[i] === 0) {
                const g = guessArr[i];
                if (letterCount[g]) {
                tempPositions[i] = 1;
                letterCount[g]--;
                }
            }
        }

        // Update list of guessed letters
        for (const letter of guess) {
            if (!this.guessedLetterSet.has(letter)) {
                this.guessedLetterSet.add(letter);
                this.guessedLetterList.push(letter);
                this.guessedLetterState.push(0);
            }
        }

        // Update state of correctly guessed letters
        for (let i = 0; i < this.NUMBER_OF_LETTERS; i++) {
            if (tempPositions[i] > 0) {
                const letter = guess[i];
                const stateIdx = this.guessedLetterList.findIndex((v) => v === letter);
                this.guessedLetterState[stateIdx] = tempPositions[i];
            }
        }

        // Force update
        this.guessedLetterState = [...this.guessedLetterState];

        this.guessAttempts[this.activeRow] = true;
        this.positionValues[this.activeRow] = tempPositions;
        this.activeRow++;
        this.requestUpdate();
    }

    _handleKeyPress (e) {
        this.lastKey = e.detail;
        this._getActiveRow()?.handleKeyFromClick(e.detail);
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
            <funcle-input-row
                .numberOfLetters=${this.NUMBER_OF_LETTERS}
                .keyInput=${this.lastKey}
                .active=${this.activeRow === i}
                .errorState=${this.activeRowErrorState}
                .guessAttempt=${this.guessAttempts[i]}
                .correctLetter=${this.positionValues[i].map(v => {
                return v === 1;
                })}
                .correctLetterAndPosition=${this.positionValues[i].map(v => {
                return v === 2;
                })}>
            </funcle-input-row>
            `)}
            <funcle-keys
                @key-pressed=${this._handleKeyPress}
                .attemptedKeys=${this.guessedLetterList}
                .attemptedKeyState=${this.guessedLetterState}
            ></funcle-keys>
        </div>
        `;
    }
}

customElements.define('funcle-game', FuncleGame);
