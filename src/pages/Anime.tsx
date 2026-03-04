interface AnimeProps {
  id: number,
  defaultTitle: string,
  japaneseTitle: string,
  mediaType: string, // TV, Movie, OVA, etc.
  airingStatus: string,
  seasonAired: string,
  yearAired: number,
  ageRating: string,
  synopsis: string,
  studioNames: string[],
  genres: string[],
  themes: string[]
}

export default function Anime() {
  return (
    <>
      <h1>hi</h1>
    </>
  );
}