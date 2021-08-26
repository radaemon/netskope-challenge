/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

export default function Movie({ movies }) {
  const [comments, setComments] = useState([]);
  const [userInput, setUserInput] = useState({ name: '', comment: '' });
  const apiUrl = `http://localhost:8080`;

  let location = useLocation().pathname.split('/')[2];
  const thisMovie = movies?.filter((movie) => movie.film.includes(location))[0];

  useEffect(() => {
    fetchComments();
  }, [location]);

  async function fetchComments() {
    const apiComments = await axios.get(`${apiUrl}/comments/${location}`);
    setComments(apiComments?.data);
  }

  function handleUserInput(e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  }

  function resetUserInput() {
    setUserInput({ name: '', comment: '' });
  }

  async function onSubmit(e) {
    e.preventDefault();
    await axios.post(`${apiUrl}/comments/${location}`, userInput);
    fetchComments();
    resetUserInput();
  }

  const htmlComments = comments?.map((comment) => (
    <p>
      {comment?.name}: {comment?.comment}
    </p>
  ));

  return (
    <>
      <a href='/'>Back to Home</a>
      <h4>{thisMovie?.film}</h4>
      <p>Genre: {thisMovie?.genre}</p>
      <p>Studio: {thisMovie?.leadStudio}</p>
      <p>User Rating: {thisMovie?.score}%</p>
      <p>Profitability: {thisMovie?.profitability.toFixed(2)}%</p>
      <p>Rotten Tomatoes Rating: {thisMovie?.rtRanking}%</p>
      <p>Worldwise Gross: {thisMovie?.grossing}m</p>
      <p>Year Release: {thisMovie?.year}</p>
      <hr />
      <h4>Comments</h4>
      {htmlComments}
      <form>
        <input
          onChange={handleUserInput}
          type='text'
          name='comment'
          value={userInput?.comment}
          placeholder='Your comment'
        ></input>
        <br />
        <br />
        <input
          onChange={handleUserInput}
          type='text'
          name='name'
          value={userInput?.name}
          placeholder='Your name'
        ></input>
        <br />
        <br />
        <button onClick={onSubmit}>Save</button>
      </form>
    </>
  );
}
