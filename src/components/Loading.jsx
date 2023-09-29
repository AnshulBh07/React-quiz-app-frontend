import "./loadingStyles.css";

const Loading = () => {
  return (
    <div className="container__loading">
      <h2>Loading</h2>
      <h2 style={{ color: "#3d434d" }}>.</h2>
      <h2 style={{ color: "#31363f" }}>.</h2>
      <h2 style={{ color: "#2a2e36" }}>.</h2>
    </div>
  );
};

export default Loading;
