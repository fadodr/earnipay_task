export const calculatePagination = (page?: number, perPage?: number) => {
  const defaultPerPage = 20;
  let offset = 0;
  let limit = 0;

  if (!page && !perPage) {
    // Fetch everything in the database
    offset = 0;
    limit = 0;
  } else if (page && !perPage) {
    // Fetch the specified page with default 'perPage'
    offset = (page > 0 ? page - 1 : 0) * defaultPerPage;
    limit = defaultPerPage;
  } else if (!page && perPage) {
    // Fetch the first page with the specified 'perPage'
    offset = 0;
    limit = perPage;
  } else if (page && perPage) {
    // Fetch the specified page with the specified 'perPage'
    offset = (page > 0 ? page - 1 : 0) * perPage;
    limit = perPage;
  }

  return { offset, limit };
};

export const computeExpiryDate = (timeInSeconds: number) => {
  return new Date(new Date().getTime() + timeInSeconds * 1000);
};
