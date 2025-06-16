import { LitElement, html, css } from 'lit';
import '@src/components/funcle-input.js';
import '@src/components/funcle-keys.js';
import gameKeys from "@data/list.json" assert {type: 'json'};

import {liquidGlassStyles} from '@src/styles/liquid-glass.js';
import {liquidGlassDroid} from '@src/styles/liquid-glass-droid.js';

class FuncleGame extends LitElement {
    static properties = {
        activeRow: { type: Number },
        activeRowErrorState: { type: Boolean },
        dictionaryReady: { type: Boolean },
        lastKey: { type: String }
    };

    static styles = [
        /Android/i.test(navigator.userAgent) ? liquidGlassStyles : liquidGlassStyles,
        css`
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
        funcle-keys {
            margin-top: 1rem;
        }
        dialog.liquidGlass-wrapper {
            display: none;
        }
        .liquidGlass-wrapper:hover {
            padding: 1.4rem;
        }
        dialog.showing {
            display: flex;
        }
        dialog#endDialog {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            position: fixed;
            padding: 0;
            margin: 0;
            border: none;
            background: transparent;
            box-shadow; none;
            top: 18vh;
            left: 50%;
            transform: translateX(-50%);
            overflow: visible;
        }
        .dialog-content {
            width: 25rem;
            height: 29rem;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            padding: 1rem;
            border-radius: 1.5rem;

            position: relative;
            text-align: center;
        }
        button {
            position: relative;
            z-index: 1;
            background: transparent;
            font-size: 1rem;
            padding: 0.4rem 0.2rem;
            font-family: monospace;
            border: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        #endDialog:focus-within {
            outline: none;
        }
        .liquidGlass-text {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            height: 100%;
            width: 100%;
        }
        .liquidGlass-text p,
        .liquidGlass-text div {
            margin: 0;
        }
        .rounded-button {
            padding: 1rem;
            border-radius: 1.5rem;
        }
        .rounded-button:hover {
            padding: 1.6rem;
        }
        a:focus-within {
            outline: none;
        }

        @media (prefers-color-scheme: light) {
            .rounded-button a {
                text-decoration: none;
                color: rgb(46, 46, 46);
            }
            .rounded-button a:hover {
                color: black;
            }
        }
        @media (prefers-color-scheme: dark) {
            .rounded-button a {
                text-decoration: none;
                color: rgb(221, 221, 221);
            }
            .rounded-button a:hover {
                color: white;
            }
        }
    `];

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

    _reset () {
        this.activeRow = 0;
        this.numberOfRows = 6;
        this.activeRowErrorState = false;
        this.lastKey = '';

        this.guessAttempts = Array(this.numberOfRows).fill(false);
        this.positionValues = Array(this.numberOfRows).fill(Array(this.NUMBER_OF_LETTERS));
        this.guessedLetterSet = new Set();
        this.guessedLetterList = [];
        this.guessedLetterState = [];

        // Reset input rows
        const rows = this.shadowRoot.querySelectorAll('funcle-input-row');
        rows.forEach(r => {
            r.reset();
        });
    }

    async connectedCallback () {
        super.connectedCallback();

        await this._createGame();
    }

    async _createGame () {
        let numKeys, idx;
        switch (this.NUMBER_OF_LETTERS) {
            case 6:
                numKeys = gameKeys.six.length;
                idx = this._pseudoRandomGen(numKeys);
                this.code = gameKeys.six[idx].name;
                this.href = `${gameKeys.six[idx].helpFolder}/${gameKeys.six[idx].href}`;
                this.wordSet = new Set(gameKeys.six.map(w => w.name.toLowerCase()));
                break;
            case 7:
                numKeys = gameKeys.seven.length;
                idx = this._pseudoRandomGen(numKeys);
                this.code = gameKeys.seven[idx].name;
                this.href = `${gameKeys.seven[idx].helpFolder}/${gameKeys.seven[idx].href}`;
                this.wordSet = new Set(gameKeys.seven.map(w => w.name.toLowerCase()));
                break;
            case 8:
                numKeys = gameKeys.eight.length;
                idx = this._pseudoRandomGen(numKeys);
                this.code = gameKeys.eight[idx].name;
                this.href = `${gameKeys.eight[idx].helpFolder}/${gameKeys.eight[idx].href}`;
                this.wordSet = new Set(gameKeys.eight.map(w => w.name.toLowerCase()));
                break;
            default:
                numKeys = gameKeys.five.length;
                idx = this._pseudoRandomGen(numKeys);
                this.code = gameKeys.five[idx].name;
                this.href = `${gameKeys.five[idx].helpFolder}/${gameKeys.five[idx].href}`;
                this.wordSet = new Set(gameKeys.five.map(w => w.name.toLowerCase()));
                break;

        }
        
        this.dictionaryReady = true;
        this.requestUpdate();
    }

    _getActiveRow () {
        const rows = this.shadowRoot.querySelectorAll('funcle-input-row');
        return rows[this.activeRow];
    }

    _isGameComplete () {
        if (this.activeRow >= this.numberOfRows) return true;

        let letterState = true;
        this.positionValues[this.activeRow-1].forEach(v => {
            letterState = letterState && v === 2;
        });
        return letterState;
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
                if (tempPositions[i] > this.guessedLetterState[stateIdx]) {
                    this.guessedLetterState[stateIdx] = tempPositions[i];
                }
            }
        }

        // Force update
        this.guessedLetterState = [...this.guessedLetterState];

        this.guessAttempts[this.activeRow] = true;
        this.positionValues[this.activeRow] = tempPositions;
        this.activeRow++;

        if (this._isGameComplete()) this._showDialog();

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

    _showDialog () {
        const dialog = this.shadowRoot.querySelector('#endDialog');
        dialog.classList.add('showing');
        if (dialog) dialog.showModal();
    }

    _closeDialog () {
        const dialog = this.shadowRoot.querySelector('#endDialog');
        if (dialog) {
            dialog.close();
            dialog.classList.remove('showing');
            this._reset();
        }
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
            <dialog id="endDialog">
                <div class="dialog-content liquidGlass-wrapper">
                    <div class="liquidGlass-effect"></div>
                    <div class="liquidGlass-tint"></div>
                    <div class="liquidGlass-shine"></div>
                    <div class="liquidGlass-text">
                        <p>Good Job!</p>
                        <div class="rounded-button">
                            <a href="https://www.mathworks.com/help/${this.href}" target="_blank" rel="noopener noreferrer">
                                <p>${this.code} function help</p>
                            </a>
                        </div>
                        <div @click=${this._closeDialog} class="rounded-button">Play Again</button>
                    </div>
                </div>
            </dialog>
        </div>
        `;
    }
}

customElements.define('funcle-game', FuncleGame);
