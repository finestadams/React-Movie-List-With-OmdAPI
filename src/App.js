import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MoviesList';
import SearchBox from './components/Search';
import AddFavourites from './components/AddFav';
import RemoveFavourites from './components/RemoveFav';
import MainHeader from './components/MainHeader';
import { Footer } from './components/Footer';
import { BrowserRouter, Route,Switch} from 'react-router-dom';


const App = () => {
	let d = new Date();
	let newY = d.getFullYear();
	console.log(newY)
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [dateValue, setDateValue] = useState(newY);
	const [isGenre, setGenre] = useState('movie');
	const getMovie = async (searchValue, dateValue, isGenre) => {
		const key = process.env.REACT_APP_API_KEY;
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${key}&y=${dateValue}&type=${isGenre}`;
		const response = await fetch(url);
		const responseJson = await response.json();
		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovie(searchValue, dateValue, isGenre);
	}, [searchValue, dateValue, isGenre]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};
	return (
		<BrowserRouter>
		<MainHeader />
		<Switch>
			<Route path = '/' exact render={(props) => 	<div className='row d-flex align-items-center mt-4 mb-4'>
				<SearchBox {...props} searchValue={searchValue} setSearchValue={setSearchValue} 
				dateValue = {dateValue}
				setDateValue = {setDateValue}
				isGenre = {isGenre} 
				setGenre={setGenre}/>
			</div>} />
			<Route path = '/favourites' exact render = {()=> <div  className='row d-flex align-items-center mt-4 mb-4'>
				<h2 className='text-center'>My Favourites</h2>
			<MovieList 
				movies={favourites}
				handleFavouritesClick={removeFavouriteMovie}
				favouriteComponent={RemoveFavourites}
			/></div>}/>
		</Switch>
		
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieList
					movies={movies}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
		</div>
		<Footer/>
	
		</BrowserRouter>
	);
};

export default App;
