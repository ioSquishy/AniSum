import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header, { type HeaderSearchQuery } from './components/Header'
import Card, { parseCardPropsFromSearchResult, type CardProps } from './components/Card'
import './App.css'


function App() {
  const location = useLocation();
  const [cards, setCards] = useState<CardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<HeaderSearchQuery | null>(null);
  const [noResults, setNoResults] = useState(false);

  function setCurrentSeasonCards() {
    fetch(`https://api.jikan.moe/v4/seasons/now?sfw`)
      .then(response => response.json())
      .then(data => {
        if (!data.data) {
          console.warn("No results.");
          setNoResults(true);
          return;
        }
        let cards : CardProps[] = [];
        for (let item of data.data) {
          cards.push(parseCardPropsFromSearchResult(item));
        }
        setCards(cards);
      }).catch(exception => {
        console.error(exception);
        setNoResults(true);
      });
  }

  // runs on first load
  useEffect(() => {
    // set search to what wass sent by previous page
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      return;
    }
    // or set to null which by extension sets it to the current season
    setSearchQuery(null);
  }, []);

  // runs every time search query is updated
  useEffect(() => {
    if (!searchQuery || !searchQuery.animeTitleInput) {
      setCurrentSeasonCards();
      return;
    }

    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery.animeTitleInput)}&limit=25&sfw=true`)
      .then(response => response.json())
      .then(data => {
        if (!data.data) {
          console.warn("No results.");
          setNoResults(true);
          return;
        }
        let cards : CardProps[] = [];
        for (let item of data.data) {
          cards.push(parseCardPropsFromSearchResult(item));
        }
        setCards(cards);
      }).catch(exception => {
        console.error(exception);
        setNoResults(true);
      });

  }, [searchQuery]);

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main>
        <div className="card-container">
          {
            cards.map(card => <Card key={card.id} {...card} />)
          }
        </div>
        <p hidden={!noResults} className="error">No results</p>
      </main>
    </>
  );
}

export default App
