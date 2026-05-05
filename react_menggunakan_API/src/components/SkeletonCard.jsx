function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-img"></div>
      <div className="skeleton-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div className="skeleton skeleton-line short"></div>
          <div className="skeleton skeleton-line" style={{ width: '25%' }}></div>
        </div>
        <div className="skeleton skeleton-line long"></div>
        <div className="skeleton skeleton-line long"></div>
        <div className="skeleton skeleton-line medium"></div>
        <div className="skeleton skeleton-line short" style={{ marginTop: 8 }}></div>
      </div>
    </div>
  );
}

export default SkeletonCard;
