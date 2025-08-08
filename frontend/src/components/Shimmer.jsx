import '../styles/shimmer.css';

const Shimmer = ({ width = '100px', height = '1rem', borderRadius = '4px' }) => {
  return (
    <div
      className="shimmer-wrapper"
      style={{ width, height, borderRadius, backgroundColor:"#ccc" }}
    >
      <div className="shimmer" />
    </div>
  );
};

export default Shimmer;
