import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header, { type HeaderSearchQuery } from "../components/Header";
import './Anime.css'

interface AnimeInfo {
  id: number,
  defaultTitle: string,
  japaneseTitle: string,
  imageUrl: string,
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
          imageUrl: data.data.images.webp.large_image_url,
          mediaType: data.data.type,
          isAiring: data.data.airing,
          seasonAired: data.data.season,
          yearAired: data.data.aired.prop.from.year,
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
      <div hidden={!animeInfo || failedLoad} className="info-container">
        <img src={animeInfo?.imageUrl}></img>
        <div className="details-container">
          <div className="titles">
            <h1>{animeInfo?.defaultTitle}</h1>
            <h3>{animeInfo?.japaneseTitle}</h3>
          </div>

          <div className="studios">
            <h3>Studio{(animeInfo?.studioNames?.length ?? 0) > 1 ? "s" : ""}:</h3>
            {
              animeInfo?.studioNames.map(name => <span key={name}>{name}</span>)
            }
          </div>

          <div className="tags bubble-wrapper">
            {
              animeInfo?.genres.map(name => <span className="bubble" key={name}>{name}</span>)
            }
            {
              animeInfo?.themes.map(name => <span className="bubble" key={name}>{name}</span>)
            }
          </div>

          <div className="airing-info bubble-wrapper">
              <span className="bubble">{animeInfo?.mediaType}</span>
              <span className="bubble">{animeInfo?.isAiring ? "Airing" : `Aired ${animeInfo?.seasonAired?.toUpperCase() ?? ""} ${animeInfo?.yearAired}`}</span>
              <span className="bubble">{animeInfo?.ageRating}</span>
            </div>

          <div>
            <h2>Synopsis</h2>
            <blockquote>{animeInfo?.synopsis}</blockquote>
          </div>
        </div>
      </div>
      <p hidden={animeInfo !== null || failedLoad} className="error">loading...</p>
      <p hidden={!failedLoad} className="error">Failed to find anime with ID {animeId} :{'('}</p>
    </>
  );
}