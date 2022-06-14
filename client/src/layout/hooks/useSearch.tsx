import React, { useState } from "react";

type Props = {};

const useSearch = (props: Props) => {
  const [search, setSearch] = useState();

  return {
    search,
    setSearch,
  };
};

export default useSearch;
