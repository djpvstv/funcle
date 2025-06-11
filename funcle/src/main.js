import { LitElement, html, css } from "lit";
import '@src/components/funcle-game';
import '@src/components/funcle-header';
import '@src/components/funcle-footer';

class App extends LitElement {
    static styles = css`
        .main {
            margin: 0;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            background-size: 100% 300%;
            animation: moveBackground 300s ease-in-out infinite;
        }

        @keyframes moveBackground {
            from {
                background-position: 0% 0%;
            }
            to {
                background-position: 0% -1000%;
            }
        }

        @media (prefers-color-scheme: light) {
            .main {
                background: linear-gradient(185deg, #268cdd,rgb(231, 228, 44), #268cdd);
            }
        }
        @media (prefers-color-scheme: dark) {
            .main {
                background: linear-gradient(175deg,rgb(9, 29, 46),rgb(82, 80, 15), rgb(9, 29, 46));
            }
        }
    `;

    render () {
        return html`
        <div class="main">
            <funcle-header></funcle-header>
            <funcle-game></funcle-game>
            <funcle-footer></funcle-footer>
        </div>
        `
    }
}

customElements.define('funcle-app', App);