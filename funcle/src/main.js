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
            background: linear-gradient(180deg, #268cdd,rgb(231, 228, 44), #268cdd);
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