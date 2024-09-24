interface PagePaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PagePaginationArrows = ({
  pages,
  currentPage,
  onPageChange,
}: PagePaginationProps) => {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-3 justify-center mt-8">
      <div className="flex gap-5">
        <button
          className={`flex justify-center items-center rounded-full w-10 h-10 ${
            currentPage > 1 ? "bg-primary" : "bg-gray-300"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}>
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

        <button
          className={`flex justify-center items-center rounded-full w-10 h-10 ${
            currentPage < pages ? "bg-primary" : "bg-gray-300"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === pages}>
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
      </div>
      {/* Dots Indicator */}
      <div className="flex gap-2 px-2">
        {Array.from({ length: pages }).map((_, index) => (
          <div
            key={index}
            className={`w-3 ${
              currentPage === index + 1 ? "h-1 w-4 rounded-3xl bg-primary" : "h-[5px] w-[5px] rounded-full bg-gray-300"
            }`}
            onClick={() => onPageChange(index + 1)}
          />
        ))}
      </div>
    </div>
  );
};
