export interface BaseList {
  message: string;
  totalItems?: number;
}

export interface TotalCountList {
  count: number;
}

export interface AggregatedList<T> {
  paginatedResults: [T];
  totalCount: [TotalCountList];
}
