"use client";

import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { debounce } from "lodash";
import { useState, useEffect } from "react";

const NavSearch = () => {
  const searchParams = useSearchParams();

  const { replace } = useRouter();
  const [search, setSearch] = useState(
    searchParams.get("search")?.toString() || ""
  );

  const handleSearch = debounce((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`);
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    handleSearch(e.target.value);
  };

  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams]);

  return (
    <Input
      type="search"
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted border border-dashed border-red-500 "
      onChange={handleChange}
      value={search}
    />
  );
};

export default NavSearch;
