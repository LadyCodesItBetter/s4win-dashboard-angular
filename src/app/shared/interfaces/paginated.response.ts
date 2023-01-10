export interface PaginatedResponse<T = any> {
  pagination: {
    page: number,
    pageSize: number,
    pageCount: number,
    totalCount: number
  },
  data: T[]
}