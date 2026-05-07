const styles = `
  .hg-spinner-overlay {
    position: fixed;
    inset: 0;
    background: #020d0a;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    z-index: 9999;
    animation: overlayIn 0.2s ease forwards;
  }
  @keyframes overlayIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── WING LOGO ── */
  .hg-spinner-logo {
    height: 52px;
    width: auto;
    animation: logoPulse 2.5s ease-in-out infinite;
  }
  @keyframes logoPulse {
    0%,100% { 
      filter: brightness(1.1) drop-shadow(0 0 4px rgba(74,222,128,0.15));
      transform: scale(1);
    }
    50% { 
      filter: brightness(1.3) drop-shadow(0 0 16px rgba(74,222,128,0.5));
      transform: scale(1.06);
    }
  }

  /* ── RING SPINNER ── */
  .hg-spinner-rings {
    position: relative;
    width: 64px;
    height: 64px;
  }

  .hg-ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid transparent;
  }
  .hg-ring-1 {
    border-top-color: #1d9e75;
    animation: spin 1.1s linear infinite;
  }
  .hg-ring-2 {
    inset: 8px;
    border-right-color: #4ade80;
    animation: spin 0.8s linear infinite reverse;
  }
  .hg-ring-3 {
    inset: 16px;
    border-bottom-color: rgba(29,158,117,0.4);
    animation: spin 1.4s linear infinite;
  }

  .hg-spinner-dot {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .hg-spinner-dot::after {
    content: '';
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #4ade80;
    animation: dotPulse 1.1s ease-in-out infinite;
  }
  @keyframes dotPulse {
    0%,100% { transform: scale(1);   opacity: 1; }
    50%      { transform: scale(1.5); opacity: 0.5; }
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── TEXT ── */
  .hg-spinner-text {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 400;
    color: rgba(232,245,240,0.35);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    animation: textFade 1.8s ease-in-out infinite;
  }
  @keyframes textFade {
    0%,100% { opacity: 0.35; }
    50%      { opacity: 0.7; }
  }

  /* ── DOTS ROW ── */
  .hg-spinner-dots {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  .hg-spinner-dots span {
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #1d9e75;
    animation: dotBounce 1.2s ease-in-out infinite;
  }
  .hg-spinner-dots span:nth-child(2) { animation-delay: 0.2s; }
  .hg-spinner-dots span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dotBounce {
    0%,80%,100% { transform: scale(0.6); opacity: 0.3; }
    40%          { transform: scale(1.2); opacity: 1; }
  }
`;

export default function LoadingSpinner() {
  return (
    <>
      <style>{styles}</style>
      <div className="hg-spinner-overlay">

        {/* Wing Logo */}
        <img
          src="/img/logo-wh1.png"
          alt="Health Guardian"
          className="hg-spinner-logo"
        />

        {/* Concentric spinning rings */}
        <div className="hg-spinner-rings">
          <div className="hg-ring hg-ring-1" />
          <div className="hg-ring hg-ring-2" />
          <div className="hg-ring hg-ring-3" />
          <div className="hg-spinner-dot" />
        </div>

        {/* Label */}
        <div className="hg-spinner-text">Loading Health Guardian</div>

        {/* Bouncing dots */}
        <div className="hg-spinner-dots">
          <span /><span /><span />
        </div>

      </div>
    </>
  );
}