"use client";

import { useI18n } from "@/locales/client";

const SuccessModal = ({ isOpen, onClose, message, title }) => {
  const t = useI18n();
  if (!isOpen) return null;

  const overlayStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height:"80vh"
  };

  const modalStyle = {
    background: "white",
    borderRadius: "20px",
    padding: "3rem 2rem",
    maxWidth: "450px",
    width: "90%",
    textAlign: "center",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
  };

  const iconCircleStyle = {
    width: "80px",
    height: "80px",
    background: "linear-gradient(135deg, #10b981, #059669)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 2rem",
    boxShadow: "0 8px 25px rgba(16, 185, 129, 0.3)",
  };

  const closeButtonStyle = {
    background: "linear-gradient(135deg, #10b981, #059669)",
    color: "white",
    fontWeight: "600",
    padding: "0.875rem 2rem",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    minWidth: "120px",
    boxShadow: "0 4px 15px rgba(16, 185, 129, 0.3)",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        <div style={iconCircleStyle}>
          <svg
            style={{ width: "40px", height: "40px", color: "white" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#1f2937",
            marginBottom: "1rem",
          }}
        >
          {t(title)}
        </h2>

        <p
          style={{ color: "#6b7280", marginBottom: "2rem", lineHeight: "1.6" }}
        >
          {t(message) ||
            "Müraciyyətiniz uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq."}
        </p>

        <button onClick={onClose} style={closeButtonStyle}>
          {t("close")}
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
