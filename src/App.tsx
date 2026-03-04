import { useEffect, useState } from 'react'
import Header, { type HeaderSearchQuery } from './components/Header'
import './App.css'
import Card, { parseCardPropsFromSearchResult, type CardProps } from './components/Card'

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);
  const [searchQuery, setSearchQuery] = useState<HeaderSearchQuery | null>(null);

  // set default cards
  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/seasons/now?sfw`)
      .then(response => response.json())
      .then(data => {
        if (!data.data) {
          console.warn("No results.");
          return;
        }
        let cards : CardProps[] = [];
        for (let item of data.data) {
          cards.push(parseCardPropsFromSearchResult(item));
        }
        setCards(cards);
      });
  }, []);

  // runs every time search query is updated
  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(searchQuery.animeTitleInput)}&limit=10&sfw`)
      .then(response => response.json())
      .then(data => {
        if (!data.data) {
          console.warn("No results.");
          return;
        }
        let cards : CardProps[] = [];
        for (let item of data.data) {
          cards.push(parseCardPropsFromSearchResult(item));
        }
        setCards(cards);
      });

  }, [searchQuery])

  return (
    <>
      <Header onSearch={setSearchQuery} />
      <main>
        <div className="card-container">
          {
            cards.map(card => <Card key={card.id} {...card} />)
          }
        </div>
      </main>
    </>
  )
}

export default App
