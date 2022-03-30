import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import star from "../img/star-fill.svg";
import star2 from "../img/star.svg";
import Footer from "./Footer";

const MovieDetails = () => {

    const { id } = useParams();

    const [movie, setMovie] = useState(null);
    const [details, setDetails] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    let hour = 60;

   useEffect(() =>{
        const abortController = new AbortController();
        const fetchPopular = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c50bfdb0e335423db4a57114f454cc4d`, { signal: abortController.signal });
        const movies = await data.json();
        return movies;
        }

       fetchPopular()
        .then(data => {
            setMovie(data);
            setDetails(data);
            setIsPending(false);
            setError(false)
        })
        .catch(err => {
            if(err.name === 'AbortError'){
              console.log('fetch aborted')
            } else {
              setError(err.message);
              setIsPending(false);
            }
        });

       return () => abortController.abort();
   },[id]);

    return (
        <div className="movie-details">
            { isPending && <div>Loading...</div> }
            { error && <div>{ error }</div> }
            {details && (
                <div className="movie-preview">
                  <div className="head">
                    <h2>{ movie.title }</h2>
                    <h3>{ movie.release_date }</h3>
                  </div>
                  <div className="popularity">
                      {movie.popularity > 1000 ? <img className="star" src={ star } alt="popularity" /> : <img className="star" src={ star2 } alt="popularity" />}
                      {movie.popularity > 2000 ? <img className="star" src={ star } alt="popularity" /> : <img className="star" src={ star2 } alt="popularity" />}
                      {movie.popularity > 3000 ? <img className="star" src={ star } alt="popularity" /> : <img className="star" src={ star2 } alt="popularity" />}
                      {movie.popularity > 4000 ? <img className="star" src={ star } alt="popularity" /> : <img className="star" src={ star2 } alt="popularity" />}
                      {movie.popularity > 5000 ? <img className="star" src={ star } alt="popularity" /> : <img className="star" src={ star2 } alt="popularity" />}
                  </div>
                  <div className="runtime">
                      <h4>{ Math.floor(movie.runtime / hour) } +hrs</h4>
                  </div>
                  <img className="preview-image" src={"https://image.tmdb.org/t/p/w500" + movie.poster_path} alt={movie.title} />
                  <h4>{ movie.overview }</h4>
                  <img className="preview-image" src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt={movie.title} />
                  <h4>{ movie.tagline }</h4>
                </div>
            )}
            {details  && <Footer /> }
        </div>
    );
}
 
export default MovieDetails;