import { css } from 'lit';

export const liquidGlassStyles = css`
    .liquid {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        backdrop-filter: blur(4px);
        filter: url(#glass-distortion);
        background: rgba(255,255,255,0.2);
        box-shadow: 0 8px 16px rgba(0,0,0,0.1);
    }

    .liquid::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        background: rgba(255,255,255,0.3);
        transform: rotate(45deg);
        filter: blur(30px);
    }

    button.key {
        position: relative;
        z-index: 1;
        background: transparent;
        font-size: 1rem;
        padding: 0.5rem 0.6rem;
        font-family: monospace;
        border: none;
        padding: 0.75rem;
        cursor: pointer;
    }

    .wide {
        flex: 1;
        padding: 0.5rem 2.5rem;
        justify-content: center;
    }

    .liquidGlass-wrapper {
        position: relative;
        display: flex;
        font-weight: 600;
        overflow: hidden;
        color: black;
        cursor: pointer;
        box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.2);
    }

    .liquidGlass-effect {
        position: absolute;
        z-index: 0;
        inset: 0;
        backdrop-filter: blur(3px);
        filter: url(#glass-distortion);
        overflow: hidden;
        isolation: isolate;
    }

    .liquidGlass-tint {
        z-index: 1;
        position: absolute;
        inset: 0;
        background: rgba(255, 255, 255, 0.25);
    }

    .liquidGlass-shine {
        position: absolute;
        inset: 0;
        z-index: 2;
        overflow: hidden;
        box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
        inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
    }

    .liquidGlass-text {
        z-index: 3;
        font-size: 2rem;
        color: black;
    }

    .wrapper {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
    }

    .liquidGlass-wrapper,
    .liquidGlass-wrapper > div {
        padding: 0.15rem;
        margin: 0.15rem;
        border-radius: 1.8rem;
    }

    .liquidGlass-wrapper:hover {
        padding: 0.3rem;
        margin: 0.05rem;
        border-radius: 1.8rem;
    }

    .liquidGlass-wrapper > div > div {
        font-size: 20px;
        color: black;
        padding: 0.4rem 0.6rem;
        border-radius: 0.8rem;
        transition: all 0.1s ease-in;
    }

    .liquidGlass-wrapper > div > div:hover {
        background-color: rgba(255, 255, 255, 0.5);
        box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(2px);
    }
`;