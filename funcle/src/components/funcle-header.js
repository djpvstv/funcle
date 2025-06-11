import { LitElement, html, css } from 'lit';

class FuncleHeader extends LitElement {

    static styles = css`
        @font-face {
            font-family: 'Consolas';
            src: url('../fonts/CONSOLA.tff') format('truetype');
            font-weight: normal;
            font-style: normal;
        }

        div {
            flex: 0 0 auto;
            font-family: 'Consolas', sans-serif;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        @media (prefers-color-scheme: light) {
            div {
                color: black;
            }
        }
        @media (prefers-color-scheme: dark) {
            div {
                color: white;
            }
        }
    `;

    render() {
        return html`
        <div class="header">
            <h1>funcle</h1>
        </div>
        `;
    }

}

customElements.define('funcle-header', FuncleHeader);