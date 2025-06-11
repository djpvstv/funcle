import { css } from 'lit';

export const liquidGlassStyles = css`
    .liquid {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        backdrop-filter: blur(4px);
        filter: url(#glass-distortion);
    }

    .liquid::after {
        content: '';
        position: absolute;
        top: -50%; left: -50%;
        width: 200%; height: 200%;
        transform: rotate(45deg);
        filter: blur(30px);
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
        cursor: pointer;
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
    }

    .liquidGlass-shine {
        position: absolute;
        inset: 0;
        z-index: 2;
        overflow: hidden;
    }

    .liquidGlass-text {
        z-index: 3;
        font-size: 2rem;
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

    .liquidGlass-wrapper > div > div,
    .liquidGlass-wrapper > div > button {
        transition: all 0.2s ease-in;
    }

    .liquidGlass-wrapper > div > div:hover {
        backdrop-filter: blur(2px);
    }

    @media (prefers-color-scheme: light) {
        .liquid {
            background: rgba(255,255,255,0.2);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .liquid::after {
            background: rgba(255,255,255,0.3);
        }

        .liquidGlass-text {
            color: #444;
        }

        .liquidGlass-wrapper {
            box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
            color: black;
        }

        .liquidGlass-tint {
            background: rgba(255, 255, 255, 0.25);
        }

        .liquidGlass-shine {
            box-shadow: rgba(236, 236, 236, 0.5) 2px 2px 1px 0px inset,
                rgba(70, 70, 70, 0.5) -1px -1px 1px 1px inset;
        }

        .liquidGlass-wrapper > div > div:hover {
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
        }
    }

    @media (prefers-color-scheme: dark) {
        .liquid {
            background: rgba(255,255,255,0.2);
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        .liquid::after {
            background: rgba(255,255,255,0.3);
        }

        .liquidGlass-text {
            color: #ddd;
        }

        .liquidGlass-wrapper {
            box-shadow: 0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1);
            color: white;
        }

        .liquidGlass-tint {
            background: rgba(255, 255, 255, 0.25);
        }

        .liquidGlass-shine {
            box-shadow: inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5),
            inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5);
        }

        .liquidGlass-wrapper > div > div:hover {
            background-color: rgba(255, 255, 255, 0.5);
            box-shadow: inset -2px -2px 2px rgba(0, 0, 0, 0.1);
        }
    }
`;