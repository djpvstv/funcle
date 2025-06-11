import { css } from 'lit';

export const liquidGlassDroid = css`
  .liquid,
  .liquidGlass-effect {
    /* Replace filter with semi-transparent background and static blur imitation */
    filter: none !important;
    backdrop-filter: none !important;
    background: rgba(255, 255, 255, 0.2);
  }

  .liquid::after {
    /* Reduce blur load and size */
    filter: blur(10px);
    background: rgba(255, 255, 255, 0.2);
    width: 120%;
    height: 120%;
    top: -10%;
    left: -10%;
  }

  .liquidGlass-wrapper {
    /* Disable heavy transitions */
    transition: none !important;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .liquidGlass-wrapper > div > div,
  .liquidGlass-wrapper > div > button {
    transition: none !important;
  }

  .liquidGlass-wrapper:hover {
    /* Static styling instead of animated padding changes */
    padding: 0.25rem;
    margin: 0.1rem;
  }

  .liquidGlass-wrapper > div > div:hover {
    /* Use a static color instead of hover filter effects */
    background-color: rgba(255, 255, 255, 0.35);
    box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.1);
    backdrop-filter: none;
  }

  /* Color mode-specific adjustments */
  @media (prefers-color-scheme: dark) {
    .liquid,
    .liquidGlass-effect {
      background: rgba(255, 255, 255, 0.08);
    }

    .liquid::after {
      background: rgba(255, 255, 255, 0.15);
    }

    .liquidGlass-text {
      color: #ccc;
    }

    .liquidGlass-tint {
      background: rgba(255, 255, 255, 0.1);
    }
  }

  @media (prefers-color-scheme: light) {
    .liquid,
    .liquidGlass-effect {
      background: rgba(255, 255, 255, 0.15);
    }

    .liquid::after {
      background: rgba(255, 255, 255, 0.25);
    }

    .liquidGlass-text {
      color: #333;
    }

    .liquidGlass-tint {
      background: rgba(255, 255, 255, 0.15);
    }
  }
`;