export const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}) => (
  <div className="col-md-6 col-lg-4 mb-4">
    <div className="card shadow-sm h-100 border-0">
      <div className="card-body text-center">
        <div className="mb-2">{icon}</div> {/* 👈 This displays the icon */}
        <h6 className="card-title text-muted">{label}</h6>
        <p className="card-text fs-5 fw-bold">{value ?? "N/A"}</p>
      </div>
    </div>
  </div>
);
