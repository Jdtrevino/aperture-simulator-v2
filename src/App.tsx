import { useMemo, useState } from "react";

const stops = [
  { label: "f/1.4", value: 1.4, blur: 10, note: "Very blurry background. Strong subject isolation.", best: "Portraits, low light, detail shots.", warning: "Very little is in focus. Missed focus is easy." },
  { label: "f/2", value: 2, blur: 8, note: "Strong background blur. Subject stands out.", best: "Portraits and indoor photos.", warning: "Focus still needs to be accurate." },
  { label: "f/2.8", value: 2.8, blur: 6, note: "Background is soft. More detail begins to appear.", best: "Events, portraits, and subject separation.", warning: "Background is still not very sharp." },
  { label: "f/4", value: 4, blur: 4, note: "Moderate blur. Background becomes more recognizable.", best: "Everyday photos and small groups.", warning: "Less blur than wide apertures." },
  { label: "f/5.6", value: 5.6, blur: 2.5, note: "Balanced sharpness. Good all-purpose setting.", best: "General photography.", warning: "May need more light than f/1.4 or f/2." },
  { label: "f/8", value: 8, blur: 1.5, note: "Much of the scene is sharp.", best: "Street, documentary, and outdoor scenes.", warning: "Less light enters the camera." },
  { label: "f/11", value: 11, blur: 0.8, note: "Deep depth of field. Foreground and background are sharp.", best: "Landscapes and architecture.", warning: "May require slower shutter speed or higher ISO." },
  { label: "f/16", value: 16, blur: 0.35, note: "Very deep focus. Most of the scene stays sharp.", best: "Bright outdoor scenes.", warning: "Requires more light." },
  { label: "f/22", value: 22, blur: 0.1, note: "Nearly everything is in focus.", best: "Maximum depth of field.", warning: "Very little light enters the camera." },
  { label: "f/32", value: 32, blur: 0, note: "Extreme depth of field. Almost everything appears sharp.", best: "Special cases needing maximum focus.", warning: "Requires much more light. May show slight diffraction softness." },
];

function App() {
  const [index, setIndex] = useState(0);
  const current = stops[index];

  const apertureRadius = useMemo(() => {
    const maxRadius = 90;
    const minRadius = 24;
    const normalized = 1 / current.value;
    const maxNormalized = 1 / 1.4;
    const minNormalized = 1 / 32;

    return (
      minRadius +
      ((normalized - minNormalized) / (maxNormalized - minNormalized)) *
        (maxRadius - minRadius)
    );
  }, [current]);

  const apertureType =
    current.value <= 2.8
      ? "Wide Aperture"
      : current.value <= 8
      ? "Medium Aperture"
      : "Narrow Aperture";

  const bladePoints = (i: number) => {
    const cx = 150;
    const cy = 150;
    const outer = 125;
    const inner = apertureRadius;
    const blades = 8;
    const angle = (Math.PI * 2 * i) / blades + index * 0.08;
    const nextAngle = (Math.PI * 2 * (i + 1.35)) / blades + index * 0.08;
    const midAngle = (angle + nextAngle) / 2;

    return `
      ${cx + Math.cos(angle) * outer},
      ${cy + Math.sin(angle) * outer}
      ${cx + Math.cos(nextAngle) * outer},
      ${cy + Math.sin(nextAngle) * outer}
      ${cx + Math.cos(midAngle) * inner},
      ${cy + Math.sin(midAngle) * inner}
    `;
  };

  return (
    <div style={page}>
      <style>{`
        * {
          box-sizing: border-box;
        }
html,
body,
#root {
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  background: #05070a;
}

.page {
  width: 100%;
  max-width: 100vw;
  overflow-x: hidden;
}
        .app-layout {
          display: grid;
          grid-template-columns: 300px 1fr 340px;
          gap: 16px;
          align-items: start;
        }

        .left-column,
        .center-column,
        .right-column {
          display: grid;
          gap: 14px;
        }

        .main-title {
          font-size: 52px;
        }

        .photo-frame {
          height: 520px;
        }

        .fstop-button {
          font-size: 22px;
        }

        .thumb-grid {
          display: grid;
          grid-template-columns: repeat(10, 1fr);
          gap: 10px;
        }

        .stop-labels {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-top: 8px;
          color: #cbd5e1;
          font-size: 14px;
        }

        @media (max-width: 1100px) {
          .app-layout {
            grid-template-columns: 1fr;
          }

          .main-title {
            font-size: 38px;
          }

          .photo-frame {
            height: 460px;
          }

          .fstop-grid-mobile {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
          }

          .fstop-button {
            font-size: 18px;
            margin-bottom: 0 !important;
          }

          .thumb-grid {
            display: flex;
            overflow-x: auto;
            gap: 10px;
            padding-bottom: 10px;
          }

          .thumb-button {
            min-width: 150px;
          }
        }

        @media (max-width: 600px) {
          body {
            margin: 0;
          }

          .page {
            padding: 12px !important;
          }

          .main-title {
            font-size: 30px;
            line-height: 1.05;
          }

          .subtitle {
            font-size: 15px !important;
          }

          .card {
            padding: 12px !important;
            border-radius: 14px !important;
          }

          .photo-frame {
            height: 330px;
          }

          .photo-label {
            font-size: 22px !important;
            padding: 8px 10px !important;
          }

          .focus-badge,
          .depth-badge {
            font-size: 11px !important;
            padding: 7px 9px !important;
          }

          .depth-badge {
            max-width: 160px;
            text-align: center;
          }

          .fstop-grid-mobile {
            grid-template-columns: repeat(2, 1fr);
          }

          .fstop-button {
            font-size: 18px;
            padding: 12px !important;
          }

          .aperture-svg {
            width: 210px;
            height: 210px;
          }

          .stop-labels {
            overflow-x: auto;
            justify-content: flex-start;
            padding-bottom: 6px;
          }

          .stop-labels span {
            min-width: 48px;
            text-align: center;
          }

          .photo-note,
          .info-text {
            font-size: 15px !important;
          }
        }
      `}</style>

      <header style={header}>
        <h1 className="main-title" style={mainTitle}>Aperture (F-Stop) Simulator</h1>
        <p className="subtitle" style={subtitle}>
          See how aperture changes the amount of light entering the camera and
          how much of your photo is in focus.
        </p>
      </header>

      <main className="app-layout">
        <aside className="left-column">
          <section className="card" style={card}>
            <h2 style={title}>1. SELECT F-STOP</h2>

            <div style={wideText}>
              WIDE<br />
              <span style={smallText}>(More Light)</span>
            </div>

            <div className="fstop-grid-mobile">
              {stops.map((stop, i) => (
                <button
                  className="fstop-button"
                  key={stop.label}
                  onClick={() => setIndex(i)}
                  style={{
                    ...button,
                    background: i === index ? "#4c1d75" : "#09101b",
                    border: i === index ? "1px solid #a855f7" : "1px solid #1e293b",
                  }}
                >
                  {stop.label}
                </button>
              ))}
            </div>

            <div style={narrowText}>
              NARROW<br />
              <span style={smallText}>(Less Light)</span>
            </div>
          </section>

          <section className="card" style={card}>
            <h2 style={title}>2. APERTURE DIAPHRAGM</h2>

            <svg className="aperture-svg" width="240" height="240" viewBox="0 0 300 300" style={{ display: "block", margin: "0 auto" }}>
              <circle cx="150" cy="150" r="145" fill="#020617" />
              <circle cx="150" cy="150" r="132" fill="#111827" stroke="#6b7280" strokeWidth="4" />
              <circle cx="150" cy="150" r="118" fill="#020617" stroke="#1f2937" strokeWidth="8" />

              {Array.from({ length: 8 }).map((_, i) => (
                <polygon key={i} points={bladePoints(i)} fill="#30343b" stroke="#05070a" strokeWidth="2" />
              ))}

              <circle cx="150" cy="150" r={apertureRadius} fill="#f8fafc" />

              <text x="150" y="42" textAnchor="middle" fill="white" fontSize="18">
                50mm 1:1.8
              </text>

              <text x="150" y="270" textAnchor="middle" fill="white" fontSize="16">
                Ø 52mm
              </text>
            </svg>

            <div style={currentBox}>
              Current:<span style={{ color: "#c084fc" }}> {current.label}</span>
              <br />
              <span style={{ color: "#63ff7a", fontSize: 16 }}>{apertureType}</span>
            </div>
          </section>
        </aside>

        <section className="center-column">
          <section className="card" style={card}>
            <h2 style={title}>
              3. PHOTO PREVIEW
              <span style={{ color: "#e5e7eb" }}> (CAR STAYS IN FOCUS)</span>
            </h2>

            <div className="photo-frame" style={photoFrame}>
              <img
                src={`${import.meta.env.BASE_URL}aperture-scene.jpg`}
                alt="Depth of field preview"
                style={{
                  ...photoImage,
                  filter: `blur(${current.blur}px)`,
                  transform: current.blur > 0 ? "scale(1.04)" : "scale(1)",
                }}
              />

              <div
                style={{
                  ...photoImage,
                  backgroundImage: `url(${import.meta.env.BASE_URL}aperture-scene.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  maskImage: `url(${import.meta.env.BASE_URL}car-mask.png)`,
                  WebkitMaskImage: `url(${import.meta.env.BASE_URL}car-mask.png)`,
                  maskSize: "cover",
                  WebkitMaskSize: "cover",
                  maskPosition: "center",
                  WebkitMaskPosition: "center",
                  maskRepeat: "no-repeat",
                  WebkitMaskRepeat: "no-repeat",
                  filter: "blur(0px)",
                  transform: "scale(1)",
                }}
              />

              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    current.value <= 2.8
                      ? "linear-gradient(to top, rgba(0,0,0,0) 40%, rgba(0,0,0,.20) 100%)"
                      : current.value <= 8
                      ? "linear-gradient(to top, rgba(0,0,0,0) 65%, rgba(0,0,0,.10) 100%)"
                      : "linear-gradient(to top, rgba(0,0,0,0) 100%, rgba(0,0,0,0) 100%)",
                  pointerEvents: "none",
                }}
              />

              <div className="focus-badge" style={focusBadge}>FOCUS POINT: CAR</div>
              <div className="photo-label" style={photoLabel}>{current.label}</div>

              <div className="depth-badge" style={depthBadge}>
                {current.value <= 2.8
                  ? "SHALLOW DEPTH OF FIELD"
                  : current.value <= 8
                  ? "MEDIUM DEPTH OF FIELD"
                  : "DEEP DEPTH OF FIELD"}
              </div>
            </div>

            <div className="photo-note" style={photoNote}>
              At {current.label}, {current.note}
            </div>
          </section>

          <section className="card" style={card}>
            <h2 style={title}>ADJUST F-STOP</h2>

            <input
              type="range"
              min="0"
              max={stops.length - 1}
              step="1"
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              style={{ width: "100%" }}
            />

            <div className="stop-labels">
              {stops.map((stop) => (
                <span key={stop.label}>{stop.label}</span>
              ))}
            </div>
          </section>
        </section>

        <aside className="right-column">
          <section className="card" style={card}>
            <h2 style={title}>4. WHAT THIS APERTURE DOES</h2>

            <Info title="Light" color="#84cc16" text={
              current.value <= 2.8
                ? "More light enters the camera. Useful in low light."
                : current.value <= 8
                ? "A moderate amount of light enters."
                : "Less light enters the camera. You may need slower shutter speed or higher ISO."
            } />

            <Info title="Depth of Field" color="#c084fc" text={
              current.value <= 2.8
                ? "Shallow depth of field. The car stays sharp while the background becomes blurry."
                : current.value <= 8
                ? "Medium depth of field. More background detail appears."
                : "Deep depth of field. Most of the scene becomes sharp."
            } />

            <Info title="Focus & Sharpness" color="#38bdf8" text={
              current.value <= 2.8
                ? "The focus point stays sharp while the background falls out of focus."
                : current.value <= 8
                ? "The car and some background detail stay readable."
                : "Foreground and background both appear sharp."
            } />

            <Info title="Best For" color="#facc15" text={current.best} />
            <Info title="Watch Out For" color="#ff6b6b" text={current.warning} />
          </section>

          <section className="card" style={card}>
            <h2 style={title}>TIP</h2>
            <p style={{ lineHeight: 1.6 }}>
              The focus point does not automatically change when aperture
              changes. Aperture changes how much area in front of and behind
              that focus point appears sharp.
            </p>
          </section>
        </aside>
      </main>

      <section className="card" style={card}>
        <h2 style={title}>
          5. DEPTH OF FIELD COMPARISON
          <span style={{ color: "#e5e7eb" }}> (Car stays sharp while background changes)</span>
        </h2>

        <div className="thumb-grid">
          {stops.map((stop, i) => (
            <button
              className="thumb-button"
              key={stop.label}
              onClick={() => setIndex(i)}
              style={{
                ...thumbButton,
                border: i === index ? "2px solid #a855f7" : "1px solid #273244",
              }}
            >
              <div style={thumbFrame}>
                <img
                  src={`${import.meta.env.BASE_URL}aperture-scene.jpg`}
                  alt={stop.label}
                  style={{
                    ...thumbImage,
                    filter: `blur(${stop.blur}px)`,
                    transform: stop.blur > 0 ? "scale(1.04)" : "scale(1)",
                  }}
                />

                <div
                  style={{
                    ...thumbImage,
                    backgroundImage: `url(${import.meta.env.BASE_URL}aperture-scene.jpg)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    maskImage: `url(${import.meta.env.BASE_URL}car-mask.png)`,
                    WebkitMaskImage: `url(${import.meta.env.BASE_URL}car-mask.png)`,
                    maskSize: "cover",
                    WebkitMaskSize: "cover",
                    maskPosition: "center",
                    WebkitMaskPosition: "center",
                    maskRepeat: "no-repeat",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
              </div>

              <strong style={{ fontSize: 18 }}>{stop.label}</strong>
              <p style={thumbText}>{stop.note}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

function Info({
  title,
  text,
  color,
}: {
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div style={infoBlock}>
      <h3 style={{ color, margin: "0 0 6px 0" }}>{title}</h3>
      <p className="info-text" style={infoText}>{text}</p>
    </div>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  background: "radial-gradient(circle at top left, #162033, #05070a 60%)",
  color: "white",
  fontFamily: "Arial, Helvetica, sans-serif",
  padding: "20px",
};

const header: React.CSSProperties = {
  marginBottom: "18px",
};

const mainTitle: React.CSSProperties = {
  margin: 0,
};

const subtitle: React.CSSProperties = {
  color: "#cbd5e1",
  fontSize: 18,
};

const card: React.CSSProperties = {
  border: "1px solid #273244",
  borderRadius: "18px",
  background: "rgba(8, 13, 20, 0.92)",
  padding: "16px",
  boxShadow: "0 0 20px rgba(0,0,0,.35)",
  marginBottom: "16px",
};

const title: React.CSSProperties = {
  color: "#c084fc",
  fontSize: "16px",
  textTransform: "uppercase",
  letterSpacing: ".04em",
  marginTop: 0,
};

const wideText: React.CSSProperties = {
  color: "#63ff7a",
  fontWeight: "bold",
  marginBottom: 8,
};

const narrowText: React.CSSProperties = {
  color: "#c084fc",
  fontWeight: "bold",
  marginTop: 8,
};

const smallText: React.CSSProperties = {
  fontSize: 13,
};

const button: React.CSSProperties = {
  width: "100%",
  padding: "12px",
  marginBottom: "8px",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
};

const currentBox: React.CSSProperties = {
  textAlign: "center",
  padding: "12px",
  border: "1px solid #273244",
  borderRadius: "10px",
  background: "#070b12",
  fontSize: "24px",
};

const photoFrame: React.CSSProperties = {
  position: "relative",
  overflow: "hidden",
  borderRadius: "18px",
  border: "1px solid #273244",
  background: "#111827",
  boxShadow: "0 10px 40px rgba(0,0,0,.45)",
};

const photoImage: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "filter 350ms ease, transform 350ms ease",
};

const photoLabel: React.CSSProperties = {
  position: "absolute",
  top: "14px",
  right: "14px",
  background: "rgba(0,0,0,.72)",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const focusBadge: React.CSSProperties = {
  position: "absolute",
  left: "14px",
  bottom: "14px",
  background: "rgba(0,0,0,.72)",
  border: "1px solid #63ff7a",
  color: "#63ff7a",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const depthBadge: React.CSSProperties = {
  position: "absolute",
  right: "14px",
  bottom: "14px",
  background: "rgba(0,0,0,.72)",
  border: "1px solid #63ff7a",
  color: "#63ff7a",
  padding: "10px 14px",
  borderRadius: "10px",
  fontWeight: "bold",
};

const photoNote: React.CSSProperties = {
  marginTop: "12px",
  padding: "14px",
  background: "#070b12",
  border: "1px solid #273244",
  borderRadius: "10px",
  color: "#e5e7eb",
  fontSize: 18,
};

const infoBlock: React.CSSProperties = {
  borderBottom: "1px solid #273244",
  padding: "14px 0",
};

const infoText: React.CSSProperties = {
  margin: 0,
  color: "#e5e7eb",
  lineHeight: 1.6,
  fontSize: 18,
};

const thumbButton: React.CSSProperties = {
  background: "#070b12",
  color: "white",
  borderRadius: "10px",
  padding: "8px",
  cursor: "pointer",
  textAlign: "center",
};

const thumbFrame: React.CSSProperties = {
  position: "relative",
  height: "78px",
  overflow: "hidden",
  borderRadius: "8px",
  marginBottom: "8px",
};

const thumbImage: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const thumbText: React.CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.35,
};

export default App;
