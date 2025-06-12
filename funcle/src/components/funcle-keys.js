import { LitElement, html, css } from 'lit';
import {liquidGlassStyles} from '@src/styles/liquid-glass.js';
import {liquidGlassDroid} from '@src/styles/liquid-glass-droid.js';

class FuncleKeys extends LitElement {

    static styles = [
        /Android/i.test(navigator.userAgent) ? liquidGlassDroid : liquidGlassStyles,
        css`
            .keyboard {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.4rem;
            }
            
            .row {
                display: flex;
                flex-direction: row;
                gap: 0.1rem;
                justify-content: center;
                padding-bottom: 0.5rem;
            }
                
            button.key {
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

            @media (prefers-color-scheme: light) {
                button.key {
                    color: black;
                }
                div.wrong-key > div.liquidGlass-tint {
                    background-color: rgba(96, 96, 96, 0.29);
                }
                div.wrong-key > div > button {
                    color: rgba(200, 200, 200, 0.5);
                }
                div.right-key > div.liquidGlass-tint {
                    background-color: rgba(96, 96, 96, 0.29);
                }
                div.right-key > div > button {
                    color: rgba(200, 200, 200, 0.5);
                }
            }

            @media (prefers-color-scheme: dark) {
                button.key {
                    color: white;
                }
                div.wrong-key > div.liquidGlass-tint {
                    background-color: rgba(96, 96, 96, 0.29);
                }
                div.wrong-key > div > button {
                    color: rgba(200, 200, 200, 0.29);
                }
                div.right-key > div.liquidGlass-tint {
                    background-color: rgba(255, 222, 42, 0.29);
                }
                div.right-key > div > button {
                    color: rgb(255, 200, 68);
                }
                div.perfect-key > div.liquidGlass-tint {
                    background-color: rgba(131, 235, 117, 0.42);
                }
                div.perfect-key > div > button {
                    color: rgba(131, 235, 117, 0.42);
                }
            }
        `];

    static properties = {
        attemptedKeys: { type: Array },
        attemptedKeyState: { type: Array }
    }

    constructor () {
        super();
        this.attemptedKeys = [];
        this.attemptedKeyState = [];
    }

    _hasBeenGuessed (key) {
        return this.attemptedKeys.findIndex((k) => k === key.toLowerCase()) > -1;
    }

    _isKeyCorrect (key) {
        if (!this._hasBeenGuessed(key)) return false;
        return this.attemptedKeyState[this.attemptedKeys.findIndex((k) => k === key.toLowerCase())] === 1;
    }

    _isKeyPerfect (key) {
        if (!this._hasBeenGuessed(key)) return false;
        return this.attemptedKeyState[this.attemptedKeys.findIndex((k) => k === key.toLowerCase())] === 2;
    }

    _emitKey (key) {
        this.dispatchEvent(new CustomEvent('key-pressed', {
        detail: key,
        bubbles: true,
        composed: true
        }))
    }

    renderKeyRow(keys, opts = {}) {
        return html`
        <div class="row">
            ${keys.map(k => html`
            <div class="liquidGlass-wrapper
                ${this._hasBeenGuessed(k) ? 'wrong-key' : ''}
                ${this._isKeyCorrect(k) ? 'right-key' : ''}
                ${this._isKeyPerfect(k) ? 'perfect-key' : ''}
            ">
                <div class="liquidGlass-effect"></div>
                <div class="liquidGlass-tint"></div>
                <div class="liquidGlass-shine"></div>
                <div class="liquidGlass-text">
                    <button
                        class="key
                        ${opts.wide?.includes(k) ? 'wide' : ''}
                        "
                        @click=${() => this._emitKey(k)}>
                        ${k}
                    </button>
                </div>
            </div>
            `)}
        </div>
        `;
    }

    render() {
        return html`
        <svg width="0" height="0">
            <filter
                id="glass-distortion"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                filterUnits="objectBoundingBox"
            >
                <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.01 0.01"
                    numOctaves="1"
                    seed="5"
                    result="turbulence"
                />
                <feComponentTransfer in="turbulence" result="mapped">
                    <feFuncR type="gamma" amplitude="1" exponent="10" offset="0.5" />
                    <feFuncG type="gamma" amplitude="0" exponent="1" offset="0" />
                    <feFuncB type="gamma" amplitude="0" exponent="1" offset="0.5" />
                </feComponentTransfer>
                <feGaussianBlur in="turbulence" stdDeviation="3" result="softMap" />

                <feSpecularLighting
                    in="softMap"
                    surfaceScale="5"
                    specularConstant="1"
                    specularExponent="100"
                    lighting-color="white"
                    result="specLight"
                >
                <fePointLight x="-200" y="-200" z="300" />
                </feSpecularLighting>

                <feComposite
                    in="specLight"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0"
                    result="litImage"
                />

                <feDisplacementMap
                    in="SourceGraphic"
                    in2="softMap"
                    scale="150"
                    xChannelSelector="R"
                    yChannelSelector="G"
                />
            </filter>
        </svg>

        <div class="keyboard">
            ${this.renderKeyRow(['1','2','3','4','5','6','7','8','9','0'])}
            ${this.renderKeyRow(['Q','W','E','R','T','Y','U','I','O','P'])}
            ${this.renderKeyRow(['A','S','D','F','G','H','J','K','L'])}
            ${this.renderKeyRow(['Z','X','C','V','B','N','M'])}
            ${this.renderKeyRow(['Enter', 'Backspace'], { wide: ['Enter', 'Backspace'] })}
        </div>
        `;
    }

}

customElements.define('funcle-keys', FuncleKeys);