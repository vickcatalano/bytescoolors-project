"use client";

import { useState, useEffect } from "react";

function randomHexColor() {
  return (
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")
  );
}

export default function Bytes4Coolors() {
  const [paleta, setPaleta] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPaleta([
      { hex: randomHexColor(), locked: false },
      { hex: randomHexColor(), locked: false },
      { hex: randomHexColor(), locked: false },
      { hex: randomHexColor(), locked: false },
      { hex: randomHexColor(), locked: false },
    ]);
  }, []);

  function gerarNovaPaleta() {
    setPaleta((coresAtuais) =>
      coresAtuais.map((cor) =>
        cor.locked ? cor : { hex: randomHexColor(), locked: false }
      )
    );
  }

  function toggleLock(index) {
    setPaleta((coresAtuais) =>
      coresAtuais.map((cor, i) =>
        i === index ? { ...cor, locked: !cor.locked } : cor
      )
    );
  }

  function copiarHex(hex) {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(hex).then(() => {
        alert(`Cor ${hex} copiada!`);
      });
    }
  }

  useEffect(() => {
    if (!isClient) return;

    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        gerarNovaPaleta();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isClient]);

  if (!isClient || paleta.length === 0) {
    return <div>Carregando paleta...</div>;
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* TOPO COM O TÍTULO */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "10px 24px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "12px",
          border: "1px solid rgba(255,255,255,0.2)",
          zIndex: 10,
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "2rem",
            fontWeight: 700,
            fontFamily: "'Rajdhani', sans-serif",
            color: "#fff",
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#894DFF" }}>BYTES</span>
          <span style={{ color: "#00FFD1" }}>4</span>
          <span style={{ color: "#894DFF" }}>COOLORS</span>
        </h1>
      </div>

      {/* PALETA DE CORES */}
      <div style={{ display: "flex", flex: 1 }}>
        {paleta.map((cor, index) => (
          <div
            key={index}
            style={{
              backgroundColor: cor.hex,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              cursor: "pointer",
            }}
          >
            <p
              style={{
                color: "#000",
                fontSize: "2rem",
                fontWeight: 500,
                fontFamily: "Helvetica, Arial, sans-serif",
                letterSpacing: "1px",
              }}
            >
              {cor.hex.toUpperCase()}
            </p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => copiarHex(cor.hex)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/copy.svg"
                  alt="Copiar"
                  width="24"
                  height="24"
                />
              </button>

              <button
                onClick={() => toggleLock(index)}
                style={{
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                <img
                  src={
                    cor.locked
                      ? "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/lock.svg"
                      : "https://cdn.jsdelivr.net/npm/feather-icons/dist/icons/unlock.svg"
                  }
                  alt={cor.locked ? "Bloquear" : "Desbloquear"}
                  width="24"
                  height="24"
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOTÃO GERAR NOVA PALETA */}
      <button
        onClick={gerarNovaPaleta}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 24px",
          fontSize: "1rem",
          borderRadius: "12px",
          cursor: "pointer",
          border: "2px solid #000",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          color: "#000",
          fontWeight: "bold",
          transition: "0.3s",
        }}
        onMouseOver={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.4)")
        }
        onMouseOut={(e) =>
          (e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.2)")
        }
      >
        Gerar Nova Paleta
      </button>
    </div>
  );
}
