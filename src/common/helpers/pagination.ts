export interface pageDtoInterface {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
export interface resultPaginationInterface {
  data: any;
  pagination: pageDtoInterface;
}

export const paginationBuilder = (
  itemCount: number,
  query,
): pageDtoInterface => {
  const pageCount = Math.ceil(itemCount / Number(query.limit));
  return {
    page: Number(query.page),
    limit: Number(query.limit),
    itemCount: itemCount,
    pageCount: pageCount,
    hasPreviousPage: Number(query.page) > 1,
    hasNextPage: Number(query.page) < pageCount,
  };
};

export const ResultPagination = (entites: any, page: pageDtoInterface) => {
  return {
    data: entites,
    pagination: page,
  };
};
