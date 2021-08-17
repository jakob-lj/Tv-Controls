const useQuery = (param: string): string | null => {
  const search = window.location.search;
  return new URLSearchParams(search).get(param);
};

export { useQuery };
