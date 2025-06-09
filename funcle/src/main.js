import { LitElement, html } from "lit";
import '@src/components/funcle-game';
import '@src/components/funcle-header';

class App extends LitElement {
    render () {
        return html`
            <funcle-header></funcle-header>
            <funcle-game></funcle-game>
        `
    }
}

customElements.define('funcle-app', App);