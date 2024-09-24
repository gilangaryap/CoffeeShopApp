interface PagePaginationProps {
  pages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PagePagination = ({
  pages,
  currentPage,
  onPageChange,
}: PagePaginationProps) => {
  if (pages <= 1) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 justify-center mt-8">
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
      <div className="flex pl-2 gap-2 mt-4">
        {Array.from({ length: pages }).map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentPage === index + 1 ? 
              "bg-primary w-3 h-1" : "bg-gray-300 w-[5px] h-[5px]"
            }`}
            onClick={() => onPageChange(index + 1)}
          />
        ))}
      </div>
    </div>
    
  );
};

export default PagePagination;
