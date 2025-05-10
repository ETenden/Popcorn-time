import React, { useState } from 'react';
import { Film, Popcorn, Shuffle, RefreshCw } from 'lucide-react';
import { movies as initialMovies, type Movie } from './data/movies';

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const unpickedMovies = movies.filter(movie => !movie.picked);

  const pickRandomMovie = () => {
    if (unpickedMovies.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * unpickedMovies.length);
    const pickedMovie = unpickedMovies[randomIndex];
    
    setSelectedMovie(pickedMovie);
    setMovies(movies.map(movie => 
      movie.title === pickedMovie.title ? { ...movie, picked: true } : movie
    ));
  };

  const resetMovies = () => {
    setMovies(movies.map(movie => ({ ...movie, picked: false })));
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-black/50 p-6 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Film className="h-8 w-8 text-yellow-500" />
            <h1 className="text-2xl font-bold">IMDB Top 100 Movie Picker</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-gray-400">{unpickedMovies.length} movies left</span>
              <Popcorn className="h-6 w-6 text-yellow-500" />
            </div>
            <button
              onClick={resetMovies}
              className="flex items-center gap-1 rounded-full bg-gray-800 p-2 text-yellow-500 hover:bg-gray-700"
              title="Reset all movies"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6">
        {/* Random Movie Picker */}
        <div className="mb-12 text-center">
          <button
            onClick={pickRandomMovie}
            disabled={unpickedMovies.length === 0}
            className="group relative inline-flex items-center gap-2 bg-yellow-500 px-6 py-3 text-lg font-semibold text-black transition-all hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Shuffle className="h-5 w-5" />
            Pick a Random Movie
          </button>

          {selectedMovie && (
            <div className="mt-8 rounded-lg bg-black/50 p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-yellow-500">{selectedMovie.title}</h2>
              <p className="mt-2 text-xl text-gray-400">
                {selectedMovie.year} • Rating: {selectedMovie.rating}/10
              </p>
            </div>
          )}
        </div>

        {/* Movie List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie) => (
            <div
              key={movie.title}
              className={`rounded-lg bg-gray-800 p-4 transition-all ${
                movie.picked ? 'opacity-50' : 'hover:bg-gray-700'
              }`}
            >
              <h3 className={`text-lg font-semibold ${movie.picked ? 'line-through' : ''}`}>
                {movie.title}
              </h3>
              <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
                <span>{movie.year}</span>
                <span className="flex items-center gap-1">
                  ⭐ {movie.rating.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;