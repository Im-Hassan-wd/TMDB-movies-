import { Link } from "react-router-dom";

const Movie = ({movie}) => {
    return (
        <div className="movie">
            <Link to={`/movies/${movie.id}`}>
             <h2>{movie.title}</h2>
             <img src={"https://image.tmdb.org/t/p/w500" + movie.backdrop_path} alt={movie.title} />
            </Link>
        </div>
    );
}
 
export default Movie;