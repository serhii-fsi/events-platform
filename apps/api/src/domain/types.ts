import { UserRole } from './constants';

// Repository params types
export interface PaginationParams {
  skip: number;
  take: number;
}

// Service result types
export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    totalPages: number;
    currentPage: number;
    totalItems: number;
  };
}

// Domain-specific complex types
export interface EventFilters {
  startDate?: Date;
  endDate?: Date;
  location?: string;
}

export interface UserFilters {
  role?: UserRole;
  searchTerm?: string;
}
