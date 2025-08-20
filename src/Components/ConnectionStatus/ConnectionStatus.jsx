import React, { useEffect, useState } from "react";

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [signalStrength, setSignalStrength] = useState(0); // 0-4 bars

  useEffect(() => {
    const updateOnlineStatus = () => {
      setIsOnline(navigator.onLine);

      if (!navigator.onLine) {
        setSignalStrength(0);
        return;
      }

      // Simulate strength (since real network strength isn’t exposed by browser)
      fetch("https://www.google.com", { mode: "no-cors" })
        .then(() => {
          setSignalStrength(Math.floor(Math.random() * 2) + 3); // 3–4 = strong
        })
        .catch(() => {
          setSignalStrength(Math.floor(Math.random() * 2) + 1); // 1–2 = weak
        });
    };

    updateOnlineStatus();

    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);

    const interval = setInterval(updateOnlineStatus, 5000); // refresh every 5s

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
      clearInterval(interval);
    };
  }, []);

  const getColor = () => {
    if (signalStrength >= 3) return "green";
    if (signalStrength >= 1) return "orange";
    return "red";
  };

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "3px" }}>
      {[1, 2, 3, 4].map((bar) => (
        <div
          key={bar}
          style={{
            width: "4px",
            height: `${bar * 3.5}px`,
            background: bar <= signalStrength ? getColor() : "#ccc",
            borderRadius: "2px",
            transition: "background 0.3s",
          }}
        />
      ))}
    </div>
  );
};

export default NetworkStatus;
