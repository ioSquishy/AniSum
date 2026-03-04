import './Header.css'

export default function Header() {
  return (
    <header>
      <form>
        <label htmlFor='search'>Search by name:</label>
        <input type='search' id='search' placeholder='Chainsaw Man' />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}