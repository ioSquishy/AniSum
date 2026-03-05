import { useRef } from 'react';
import './Header.css'

export interface HeaderSearchQuery {
  animeTitleInput: string
}

interface HeaderProps {
  onSearch: (query: HeaderSearchQuery) => void;
}

export default function Header(props: HeaderProps) {
  const searchInputRef = useRef<HTMLInputElement>(null);

  function handleSearch(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (!searchInputRef.current) {
      console.error("Search input ref is null.");
      return;
    }
    props.onSearch({
      animeTitleInput: searchInputRef.current.value
    });
  }

  return (
    <header>
      <form>
        <label htmlFor='search'>Search by name:</label>
        <input ref={searchInputRef} type='search' id='search' placeholder='Tensura' />
        <button type="submit" onClick={e => {handleSearch(e)}}>Search</button>
      </form>
    </header>
  );
}