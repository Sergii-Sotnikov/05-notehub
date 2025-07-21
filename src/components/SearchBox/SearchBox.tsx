import { useState } from "react";
import css from "./SearchBox.module.css";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
    const newValue = event.target.value;
    setInputValue(newValue);
    onSearch(newValue);
  };
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      value={inputValue}
      onChange={handleOnChange}
    />
  );
}
