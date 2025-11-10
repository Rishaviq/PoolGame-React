type WinAlertProps = {
  OnYes(): void;
  OnNo(): void;
  OnCancel(): void;
};

export default function SelectWinAlert({
  OnYes,
  OnNo,
  OnCancel,
}: WinAlertProps) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 9999 }}
    >
      <div
        className="bg-white p-4 rounded shadow text-center"
        style={{ minWidth: "300px" }}
      >
        <h4 className="mb-4">Did you win the game?</h4>
        <div className="d-flex justify-content-around">
          <button className="btn btn-success" onClick={OnYes}>
            Yes
          </button>
          <button className="btn btn-danger" onClick={OnNo}>
            No
          </button>
          <button className="btn btn-secondary" onClick={OnCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
