import { useState, useEffect } from "react";

type useDebounceProps = {
  searchTerm: string;
};

function useDebounce({ searchTerm }: useDebounceProps): string {
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  return debouncedValue;
}

export default useDebounce;
