import { useEffect, useState } from 'react'
import Header, { type HeaderSearchQuery } from './components/Header'
import './App.css'
import Card, { parseCardPropsFromSearchResult, type CardProps } from './components/Card'
import { useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const [cards, setCards] = useState<CardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<HeaderSearchQuery | null>(null);
  const [noResults, setNoResults] = useState(false);

  async function setCurrentSeasonCards() {
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

  // set default cards
  useEffect(() => {
    if (location.state?.searchQuery) {
      setSearchQuery(location.state.searchQuery);
      return;
    }

    setSearchQuery(null);
    setCurrentSeasonCards()
    
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
