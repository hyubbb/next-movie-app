import React from "react";
import { Loader2 } from "lucide-react";

const Loading: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        width: "100vw",
        height: "100vh",
        zIndex: 100,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <Loader2
        style={{
          margin: "1rem 0",
          height: "1.75rem",
          width: "1.75rem",
          zIndex: 101,
          color: "#fff",
        }}
      />
      <p
        style={{
          fontSize: "0.75rem",
          zIndex: 102,
          color: "#fff",
        }}
      >
        Loading...
      </p>
    </div>
  );
};

export default Loading;
