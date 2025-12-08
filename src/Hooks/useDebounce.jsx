import React, { useEffect, useState } from "react";

const useDebounce = (value) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setDebounceValue(value);
    }, 400);

    return () => clearTimeout(handleDebounce);
  }, [value]);
  return debounceValue;
};

export default useDebounce;
