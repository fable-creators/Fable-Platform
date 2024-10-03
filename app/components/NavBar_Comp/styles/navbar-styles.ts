export const navbarStyles = `
  @keyframes logoAnimation {
    0% {
      transform: translateY(0) scale(1, 1);
    }
    15% {
      transform: translateY(-3px) scale(1, 1);
    }
    30% {
      transform: translateY(-3px) scale(0.95, 1.05);
    }
    45% {
      transform: translateY(-3px) scale(1.05, 0.95);
    }
    60% {
      transform: translateY(-3px) scale(0.95, 1.05);
    }
    75% {
      transform: translateY(-3px) scale(1, 1);
    }
    100% {
      transform: translateY(0) scale(1, 1);
    }
  }
  .logo-container {
    position: relative;
    width: 42px;
    height: 42px;
    overflow: invisible;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-animation {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-animation:hover {
    animation: logoAnimation 2s ease-in-out;
  }
  .logo-glow {
    position: absolute;
    top: -2px;
    left: -.5px;
    right: -.5px;
    bottom: -2px;
    border-radius: 25%;
    animation: glowing 3s infinite;
    pointer-events: none;
  }
  .logo-animation:hover .logo-glow {
    animation: glowing 3s infinite, logoAnimation 2s ease-in-out;
  }
  .x-logo {
    transition: transform 0.3s ease-in-out;
  }
  .x-logo:hover {
    transform: scale(1.1);
  }
  w3m-button {
    --w3m-accent-color: #91ADE6;
    --w3m-accent-fill-color: #5E20C1;
    --w3m-button-border-radius: 9999px;
    --w3m-button-height: 36px;
    --w3m-font-family: inherit;
  }
  .w3m-button-container {
    display: flex;
    align-items: center;
  }

  @keyframes glowing {
    0% {
      box-shadow: 0 0 5px var(--plum), 0 0 10px var(--plum), 0 0 15px var(--plum);
    }
    50% {
      box-shadow: 0 0 10px var(--sky), 0 0 20px var(--plum), 0 0 30px var(--sky);
    }
    100% {
      box-shadow: 0 0 5px var(--plum), 0 0 10px var(--plum), 0 0 15px var(--plum);
    }
  }

  .dark .logo-glow {
    animation: glowing-dark 3s infinite;
  }
  .dark .logo-animation:hover .logo-glow {
    animation: glowing-dark 3s infinite, logoAnimation 2s ease-in-out;
  }

  @keyframes glowing-dark {
    0% {
      box-shadow: 0 0 5px var(--grape), 0 0 10px var(--grape), 0 0 15px var(--grape);
    }
    50% {
      box-shadow: 0 0 10px var(--sky), 0 0 20px var(--sky), 0 0 30px var(--sky);
    }
    100% {
      box-shadow: 0 0 5px var(--grape), 0 0 10px var(--grape), 0 0 15px var(--grape);
    }
  }
`;
