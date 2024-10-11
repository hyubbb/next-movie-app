import { Loader2 } from "lucide-react";

const styles = {
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100vw",
    height: "100vh",
    zIndex: 100,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  spinner: {
    margin: "1rem 0",
    height: "1.75rem",
    width: "1.75rem",
    zIndex: 101,
    color: "#fff", // zinc-500
  },
  loadingText: {
    fontSize: "0.75rem",
    zIndex: 102,
    color: "#fff", // zinc-500
  },
};

const Loading = () => {
  return (
    <div style={styles.loadingContainer}>
      <Loader2 style={styles.spinner} />
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );
};

export default Loading;
