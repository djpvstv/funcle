import { LitElement, html, css } from 'lit';
import {liquidGlassStyles} from '@src/styles/liquid-glass.js';

class FuncleInputRow extends LitElement {
    static properties = {
        numberOfLetters: { type: Number },
        active: { type: Boolean },
        errorState: { type: Boolean },
        guessAttempt: { type: Boolean },
        correctLetter: { type: Array },
        correctLetterAndPosition: { type: Array },
        lastKey: { type: String }
    };

    static styles = [
        liquidGlassStyles,
        css`
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
        font-size: 2rem;
        text-align: center;
        line-height: 3.5rem;
        cursor: pointer;
        user-select: none;
        text-transform: lowercase;
    }
    div {
        font-family: 'Consolas', sans-serif;
    }
    .chevron {
        position: absolute;
        transform: translateX(-150%);
        width: 2rem;
        font-size: 2rem;
        text-align: right;
        font-family: monospace;
    }
    .chevron.placeholder {
        visibility: hidden;
    }
    .liquidGlass-wrapper,
    .liquidGlass-wrapper > div {
        padding: 0;
        margin: 0;
        border-radius: 0.6rem;
        pointer-events: none;
    }
    .liquidGlass-wrapper > div > div {
        pointer-events: none;
    }
    @media (prefers-color-scheme: light) {
        .square {
            color: black;
        }
        .chevron {
            color: black;
        }
        .square.active {
            background-color:rgba(238, 238, 228, 0.51);
        }
        .square.allCorrect {
            background-color: rgba(131, 235, 117, 0.42);
        }
        .square.correctLetter {
            background-color: rgba(255, 227, 150, 0.4);
        }
        .square.incorrect {
            background-color: rgba(200, 200, 200, 0.5);
        }
        .square.error {
            background-color: rgba(117, 20, 20, 0.4);
        }
    }
    @media (prefers-color-scheme: dark) {
        .square {
            color: white;
        }
        .chevron {
            color: white;
        }
        .square.active {
            background-color:rgba(238, 238, 228, 0.2);
        }
        .square.allCorrect {
            background-color: rgba(131, 235, 117, 0.42);
        }
        .square.correctLetter {
            background-color: rgba(255, 227, 150, 0.4);
        }
        .square.incorrect {
            background-color: rgba(200, 200, 200, 0.2);
        }
        .square.error {
            background-color: rgba(117, 20, 20, 0.4);
        }
    }
  `
    ];

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

    handleKeyFromClick(key) {
        this._handleKey(key);
    }

    _handleKeyFromKeyboard(e) {
        this._handleKey(e.key);
    }

    _handleKey(e) {
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

    _sendClearErrorEvent() {
        this.dispatchEvent(new CustomEvent('clear-error', {
            detail: true,
            bubbles: true,
            composed: true
        }))
    }

    _sendGuessEvent() {
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
                    <div class="liquidGlass-wrapper">
                        <div class="liquidGlass-effect"></div>
                        <div class="liquidGlass-tint"></div>
                        <div class="liquidGlass-shine"></div>
                        <div class="liquidGlass-text">
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
                    </div>
                `)}
                </div>
            </div>
        `;
    }
}

customElements.define('funcle-input-row', FuncleInputRow);
