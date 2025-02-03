export interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
  summary?: {
    total_worked_hours: number;
  };
}

export interface PaginationApi {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  first_page: number;
  next_page: number;
  prev_page: number;
}

export interface Pagination {
  lastPage: number;
  perPage: number;
  total: number;
  page: number;
}

export interface ApiResponsePaginated<T> {
  status: number;
  message: string;
  data: T[];
  pagination: PaginationApi;
  reference?: string;
}

export interface ResponsePaginated<T> {
  status: number;
  message: string;
  data: T[];
  pagination: Pagination;
}

export interface PaginationParams {
  perPage: number;
  page: number;
}

export interface Filters {
  search?: string;
  status?: string;
}
