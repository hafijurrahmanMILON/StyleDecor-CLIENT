import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 600) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(handleDebounce);
  }, [value, delay]);
  
  return debounceValue;
};

export default useDebounce;