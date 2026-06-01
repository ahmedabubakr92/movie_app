import NoMoviePost from "../assets/no-movie.png"
import StarIcon from "../assets/star.svg"

const MovieCard = ({
    movie: { 
        title, 
        vote_average, 
        poster_path, 
        release_date, 
        original_language,
        vote_count
     }
 }) => {
  return (
    <div className="movie-card">
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : {NoMoviePost}}
        alt={`${title} movie poster`}
      />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
          <div className="rating">
            <img src={StarIcon} alt="Star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
            <p>({vote_count ? vote_count : "N/A"})</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language.toUpperCase()}</p>
          <span>•</span>
          <p className="year">{release_date ? release_date.split("-")[0] : "N/A"}</p>
        </div>

      </div>
      

    </div>
  );
};

export default MovieCard;
