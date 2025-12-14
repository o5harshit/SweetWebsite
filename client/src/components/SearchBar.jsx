import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="flex gap-2 justify-center mt-6 mb-4">
      <Input
        placeholder="Search sweets by name, category, or price..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-80 rounded-full shadow-md focus:ring-2 focus:ring-pink-500"
      />
      <Button onClick={handleSearch} className="bg-pink-600 hover:bg-pink-700 text-white rounded-full">
        Search
      </Button>
    </div>
  );
}
