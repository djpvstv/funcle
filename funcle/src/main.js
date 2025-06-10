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