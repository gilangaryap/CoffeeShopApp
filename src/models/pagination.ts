export interface IPagination {
  prevLink: string | null;
  nextLink: string | null;
  currentPage: number;
  totalPages: number;
}