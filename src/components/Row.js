import React, { useEffect, useState } from "react";
import axios from '../axios';
import './Row.css';
import YouTube from 'react-youtube'
import movieTrailer from 'movie-trailer'


const imgBaseURL = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchURL, isLargeRow }){
    
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movie) =>{
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(movie?.name || '')
            .then(url =>{

                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));

            }) .catch((error) => console.log(error))
        }
        
    }


    return (
        <div className='row'>
            <h2 className="row__title">{title}</h2>
            <section className='row__posters'>
            {movies.map(movie => (
                <img
                key={movie.id}
                onClick={() => handleClick(movie)} 
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`${imgBaseURL}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                alt={movie.name}/>
            ))}
            </section>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row