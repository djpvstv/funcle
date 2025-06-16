import { LitElement, html, css } from 'lit';

class FuncleFooter extends LitElement {

    static styles = css`
        footer {
            flex: 0 0 auto;
            font-family: "Oswald", sans-serif;
            font-optical-sizing: auto;
            font-weight: 200;
            font-style: normal;
            text-align: center;
        }

        footer>ul {
            list-style: none;
            padding: 0;
            margin: 0;
            margin-bottom: 0.5em;
            display: inline-flex;
            gap: 0.5em;
            flex-wrap: wrap;
        }

        footer>ul>li:not(:last-child)::after {
            content: '·';
            margin-left: 0.5em;
            font-weight: bold;
        }

        @media (prefers-color-scheme: light) {
            footer {
                color: #333;
            }
        }
        @media (prefers-color-scheme: dark) {
            footer {
                color: #aaa;
            }
        }
    `;

    render() {
        return html`
        <footer>
            <ul>
                <li>Made by DJ PVSTV</li>
                <li>v0.0.4</li>
            </ul>
        </footer>
        `;
    }

}

customElements.define('funcle-footer', FuncleFooter);