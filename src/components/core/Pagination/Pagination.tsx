export const Pagination = ({
  currentPage,
  totalPages,
  handlePageChange,
}: {
  currentPage: number;
  totalPages: number | null;
  handlePageChange: (newPage: number) => void;
}) => {
  return (
    <div className="join">
      <button
        className={`join-item btn ${currentPage === 1 ? "btn-disabled" : ""}`}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        «
      </button>
      <button className="join-item btn">Page {currentPage}</button>
      <button
        className={`join-item btn ${
          currentPage === totalPages || totalPages === null
            ? "btn-disabled"
            : ""
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        »
      </button>
    </div>
  );
};
