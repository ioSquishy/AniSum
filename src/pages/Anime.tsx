import { useNavigate, useParams } from "react-router-dom";
import Header, { type HeaderSearchQuery } from "../components/Header";


export default function Anime() {
  const navigate = useNavigate();
  const { animeId } = useParams();
  function handleHeaderSearch(query: HeaderSearchQuery) {
    navigate('/', { state: { searchQuery: query } });
  }

  return (
    <>
      <Header onSearch={handleHeaderSearch}/>
    </>
  );
}