function LibraryItem() {
    // this is the parent class that all series,movies,etc extend

}

// constructor functions
function Movie
(
    backdrop_path,
    genre_ids,
    id,
    media_type,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    release_date,
    title,
    video,
    vote_average,
    vote_count,
) {
    this.type = 'Movie';
    this.backdrop_path = backdrop_path;
    this.genre_ids = genre_ids;
    this.id = id;
    this.media_type = media_type;
    this.original_language = original_language;
    this.original_title = original_title;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.release_date = release_date;
    this.title = title;
    this.video = video;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
}

function MovieDetails
(
    backdrop_path,
    belongs_to_collection,
    budget,
    genres,
    homepage,
    id,
    original_language,
    original_title,
    overview,
    popularity,
    poster_path,
    production_companies,
    production_countries,
    release_date,
    revenue,
    runtime,
    spoken_languages,
    status,
    tagline,
    title,
    video,
    vote_average,
    vote_count,
) {
    this.backdrop_path = backdrop_path
    this.belongs_to_collection = belongs_to_collection
    this.budget = budget
    this.genres = genres
    this.homepage = homepage
    this.id = id
    this.original_language = original_language
    this.original_title = original_title
    this.overview = overview
    this.popularity = popularity
    this.poster_path = poster_path
    this.production_companies = production_companies
    this.production_countries = production_countries
    this.release_date = release_date
    this.revenue = revenue
    this.runtime = runtime
    this.spoken_languages = spoken_languages
    this.status = status
    this.tagline = tagline
    this.title = title
    this.video = video
    this.vote_average = vote_average
    this.vote_count = vote_count
}

function Series
(
    backdrop_path,
    first_air_date,
    genre_ids,
    id,
    imdb_id,
    media_type,
    name,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity,
    poster_path,
    vote_average,
    vote_count,
) {
    this.type = 'Series';
    this.backdrop_path = backdrop_path;
    this.first_air_date = first_air_date;
    this.genre_ids = genre_ids;
    this.id = id;
    this.imdb_id = imdb_id;
    this.media_type = media_type;
    this.name = name;
    this.original_country = origin_country;
    this.original_language = original_language;
    this.original_name = original_name;
    this.overview = overview;
    this.popularity = popularity;
    this.poster_path = poster_path;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
}

function SeriesDetails
(
    backdrop_path,
    created_by,
    episode_run_time,
    first_air_date,
    genres,
    homepage,
    id,
    in_production,
    languages,
    last_air_date,
    last_episode_to_air,
    name,
    networks,
    next_episode_to_air,
    number_of_episodes,
    number_of_seasons,
    origin_country,
    original_language,
    original_name,
    overview,
    popularity ,
    poster_path,
    production_companies,
    production_countries,
    seasons,
    spoken_languages,
    status,
    tagline,
    type,
    vote_average,
    vote_count,
) {
    this.backdrop_path = backdrop_path;
    this.created_by = created_by;
    this.episode_run_time = episode_run_time;
    this.first_air_date = first_air_date;
    this.genres = genres;
    this.homepage = homepage;
    this.id = id;
    this.in_production = in_production;
    this.languages = languages;
    this.last_air_date = last_air_date;
    this.last_episode_to_air = last_episode_to_air;
    this.name = name;
    this.networks = networks;
    this.next_episode_to_air = next_episode_to_air;
    this.number_of_episodes = number_of_episodes;
    this.number_of_seasons = number_of_seasons;
    this.origin_country = origin_country;
    this.original_language = original_language;
    this.original_name = original_name;
    this.overview = overview;
    this.popularity = popularity ;
    this.poster_path = poster_path;
    this.production_companies = production_companies;
    this.production_countries = production_countries;
    this.seasons = seasons;
    this.spoken_languages = spoken_languages;
    this.status = status;
    this.tagline = tagline;
    this.type = type;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
}

export {LibraryItem, Movie, MovieDetails, Series, SeriesDetails};
