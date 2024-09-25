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
  .logo-animation:hover {
    animation: logoAnimation 2s ease-in-out;
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
  .glow-filter {
    position: relative;
    display: inline-block;
  }
  .glow-filter::before,
  .glow-filter::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  .glow-filter::before {
    color: #fffaf6;
    text-shadow: 0 0 10px #fffaf6, 0 0 20px #fffaf6, 0 0 30px #fffaf6;
    filter: url(#glow-4);
    z-index: 1;
  }
  .glow-filter::after {
    color: #ffffff;
    filter: url(#glow-5);
    opacity: 0.7;
    z-index: 2;
  }
  .glow-filter {
    color: #8A4D76;
    text-shadow: 0 0 5px #8A4D76;
  }
`;