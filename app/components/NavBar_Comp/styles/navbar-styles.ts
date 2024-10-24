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
    overflow: visible;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-animation {
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-animation:hover {
    animation: logoAnimation 2s ease-in-out;
  }
  .logo-mobile {
    width: 52px;
    height: 52px;
  }
  .logo-desktop {
    width: 105px;
    height: 128px;
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
  .nav-fable-logo {
    background-image: url('https://i.ibb.co/PYMK3v7/Fable-Logo-1.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
`;
