import { useEffect, useState } from "react";
import Filter from "./Filter";
import Footer from "./Footer";
import Movie from "./Movie";

const Home = () => {
    const [popular, setPopular] = useState(null);
    const [filtered, setFiltered] = useState(null);
    const [activeGenre, setActiveGenre] = useState(0);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

   useEffect(() =>{
       fetchPopular()
        .then(data => {
            setPopular(data.results);
            setFiltered(data.results);
            setIsPending(false);
            setError(false)
        })
        .catch(err => {
            setError(err.message);
            setIsPending(false);
        })
   }, []);
   
   const fetchPopular = async () => {
       const data = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=c50bfdb0e335423db4a57114f454cc4d');
       const movies = await data.json();
       return movies;
   }

    return (
        <div className="home">
            <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
            <div className="popular">
                { isPending && <div>Loading...</div> }
                { error && <div>{ error }</div> }
                {filtered && filtered.map(movie => {
                    return <Movie key={movie.id} movie={movie} />
                })}
            </div>
            { !isPending && <Footer />}
        </div>
    );
}
 
export default Home;