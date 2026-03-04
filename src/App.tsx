import { useEffect, useState } from 'react'
import Header from './components/Header'
import './App.css'
import Card, { type CardProps } from './components/Card'

function App() {
  const [cards, setCards] = useState<CardProps[]>([]);

  useEffect(() => {
    let tempCards : CardProps[] = [];
    for (let i = 0; i < 10; i++) {
      tempCards.push({
        id: i,
        image_url: "https://myanimelist.net/images/anime/1806/126216.webp",
        title: "Chainsaw Man"
      });
    }

    setCards(tempCards);

  }, []);

  return (
    <>
      <Header />
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
