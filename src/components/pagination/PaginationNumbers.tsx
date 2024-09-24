interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationNumbers({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const renderPaginationNumber = (pageNumber: number) => (
    <button
      key={pageNumber}
      onClick={() => onPageChange(pageNumber)}
      className={`px-5 py-2 rounded-full transition-opacity duration-200 hover:opacity-80 ${
        pageNumber === currentPage
          ? "bg-primary text-white font-bold"
          : "bg-[#E8E8E8] text-black"
      }`}>
      {pageNumber}
    </button>
  );

  const pageNumbers: JSX.Element[] = [];
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, startPage + 3);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(renderPaginationNumber(i));
  }

  return (
    <div className="flex justify-center mt-4 gap-4">
      {currentPage > 1 && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-3 bg-primary text-white rounded-full mr-2 transition-opacity duration-200 hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
        </button>
      )}

      {pageNumbers}

      {currentPage < totalPages && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-3 bg-primary text-white rounded-full transition-opacity duration-200 hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
