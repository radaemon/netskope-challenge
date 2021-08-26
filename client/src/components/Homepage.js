import { useState } from "react";

export default function Homepage({ movies }) {
  const [input, setInput] = useState("");

  const movieList = movies
    ?.filter(
      (movie) =>
        input === "" || movie.film.toUpperCase().includes(input.toUpperCase())
    )
    .map((movie, index) => (
      <>
        <a href={`movie/${movie.film}`} key={index}>
          {movie.film}
        </a>
        <br />
      </>
    ));
  function handleChange(e) {
    setInput(e.target.value);
  }

  return (
    <>
      <h1>Movies</h1>
      <hr />
      <input onChange={handleChange} placeholder="Search Movie" />
      <br />
      <br />
      {movieList}
    </>
  );
}
