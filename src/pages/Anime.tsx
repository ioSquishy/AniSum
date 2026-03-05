import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header, { type HeaderSearchQuery } from "../components/Header";

interface AnimeInfo {
  id: number,
  defaultTitle: string,
  japaneseTitle: string,
  mediaType: string, // TV, Movie, OVA, etc.
  isAiring: boolean,
  seasonAired: string,
  yearAired: number,
  ageRating: string,
  synopsis: string,
  studioNames: string[],
  genres: string[],
  themes: string[]
}

export default function Anime() {
  const navigate = useNavigate();
  const { animeId } = useParams();
  const [animeInfo, setAnimeInfo] = useState<AnimeInfo | null>(null);
  const [failedLoad, setFailedLoad] = useState(false);

  useEffect(() => {
    fetch(`https://api.jikan.moe/v4/anime/${animeId}/full`)
      .then(response => response.json())
      .then(data => {
        if (!data) {
          console.error(`Failed to fetch info for anime with id ${animeId}`);
          return;
        }

        setAnimeInfo({
          id: data.data.mal_id,
          defaultTitle: data.data.title,
          japaneseTitle: data.data.title_japanese,
          mediaType: data.data.type,
          isAiring: data.data.airing,
          seasonAired: data.data.season,
          yearAired: data.data.year,
          ageRating: data.data.rating,
          synopsis: data.data.synopsis,
          studioNames: data.data.studios.map((studio: { name: string; }) => studio.name),
          genres: data.data.genres.map((genre: { name: string; }) => genre.name),
          themes: data.data.themes.map((theme: { name: string; }) => theme.name)
        });
      }).catch(exception => {
        console.error(exception);
        setFailedLoad(true);
      });
  }, []);

  function handleHeaderSearch(query: HeaderSearchQuery) {
    navigate('/', { state: { searchQuery: query } });
  }

  return (
    <>
      <Header onSearch={handleHeaderSearch}/>
      <div hidden={animeInfo === null} className="anime-details">
        
      </div>
      <p hidden={animeInfo !== null || failedLoad}>loading...</p>
      <p hidden={!failedLoad}>Failed to find anime with ID {animeId} :{'('}</p>
    </>
  );
}