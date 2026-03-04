import './Card.css'

export interface CardProps {
  id: number,
  image_url: string,
  title: string,
}

export default function Card(props: CardProps) {
  return (
    <button className="card">
      <img src={props.image_url}></img>
      <caption>{props.title}</caption>
    </button>
  );
}