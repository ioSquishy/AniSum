import { Link } from 'react-router-dom';
import './Card.css'

export interface CardProps {
  id: number,
  image_url: string,
  title: string
}

export function parseCardPropsFromSearchResult(result: any) : CardProps {
  return {
    id: result.mal_id,
    image_url: result.images.webp.image_url,
    title: result.title,
  }
}

export default function Card(props: CardProps) {
  return (
    <Link to={`/anime/${props.id}`} className="card">
      <img src={props.image_url}></img>
      <p>{props.title}</p>
    </Link>
  );
}