import React, { useState, useEffect } from 'react';
import { data } from './hardcoded.js';
import './App.css';

type PodcastType = {
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  trackId: number;
  [additionalKeys: string]: number | string;
};

type PodcastCollection = {
  resultCount: number;
  results: PodcastType[];
};

const initialState: PodcastCollection = {
  resultCount: 0,
  results: [],
};

function App() {
  const [podcasts, setPodcasts] = useState<PodcastCollection>(initialState);
  const [userInput, setUserInput] = useState(
    'https://itunes.apple.com/search?term=coding&media=podcast&limit=10&offset=0&entity=podcast&country=de'
  );

  const handleClick = async () => {
    const podcastList = await fetchPodcasts(userInput);
    setPodcasts(podcastList);
  };

  // const initialFetch = async () => {
  //   const podcastList = await fetchPodcasts(userInput);
  //   setPodcasts(podcastList);
  // };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setUserInput(
      `https://itunes.apple.com/search?term=${searchTerm}=podcast&limit=10&offset=0&entity=podcast&country=de`
    );
  };

  async function fetchPodcasts(request: string): Promise<PodcastCollection> {
    try {
      const response = await fetch(request);
      const body = await response.json();
      console.log(body.results);
      return body.results;
    } catch (error) {
      console.log(error.message);
    }
    return initialState;
  }

  function fetchThePodcasts(): void {
    fetch(
      'https://itunes.apple.com/search?term=coding&media=podcast&limit=10&offset=0&entity=podcast&country=de',
      { mode: 'no-cors' }
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  // useEffect(() => {
  //   fetchThePodcasts();
  // }, []);

  return (
    <>
      <input type="text" onChange={() => handleInput} />
      <button onClick={() => handleClick}>Submit</button>
      {/* {podcasts &&
        podcasts.results.map((podcast) => {
          return (
            <>
              <p>{podcast.artistName}</p>
              <p>{podcast.collectionName}</p>
              <img src={podcast.artworkUrl100} alt="artwork" />
            </>
          );
        })} */}
      <div className="podcast-list">
        {data &&
          data.results.map((podcast) => {
            return (
              <div className="podcast" key={podcast.trackId}>
                <img
                  className="picture"
                  src={podcast.artworkUrl100}
                  alt="artwork"
                />
                <div className="text">
                  <div className="collection">{podcast.collectionName}</div>
                  <div className="artist">{podcast.artistName}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
