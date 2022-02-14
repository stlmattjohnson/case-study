import { useState, useEffect } from "react";
import useDebounce from "../useDebounce";

type FilteredData<T> = {
  filteredData: T[] | undefined;
  isFiltering: boolean;
};

type useFilterProps<T> = {
  searchTerm: string;
  data: T[] | undefined;
};

function useFilter<T>({
  searchTerm,
  data,
}: useFilterProps<T>): FilteredData<T> {
  const [filteredData, setFilteredData] = useState<T[]>([]);
  const [isFiltering, setIsFiltering] = useState(false);

  const debouncedValue = useDebounce({ searchTerm });

  useEffect(() => {
    if (!debouncedValue) setFilteredData(data ? data : []);

    if (debouncedValue.length > 0) {
      setIsFiltering(true);

      const lowerCaseSearchTerm = debouncedValue.toLowerCase();

      const filteredData = data?.filter((obj) => {
        const values = Object.values(obj).map((x) => String(x).toLowerCase());
        if (values.some((x) => x.includes(lowerCaseSearchTerm))) {
          return obj;
        }
      });

      setIsFiltering(false);
      setFilteredData(filteredData ? filteredData : []);
    } else {
      setFilteredData(data ? data : []);
    }
  }, [debouncedValue, data]);

  return { filteredData, isFiltering };
}

export default useFilter;
