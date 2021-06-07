import React from 'react';

const Search = (props) => {
	return (

	<div className= "col-sm-4 item-center">
			<h2>Search For Unilimited Movies</h2>
			<div className="input-group">
			<input type="text" className="form-control" value={props.value} 
			onChange={(event) => props.setSearchValue(event.target.value)}
			placeholder='Type to search...' 
			 />
			<input type="text" className="form-control"
				value={props.value}
				onChange={(event) => props.setDateValue(event.target.value)}
				placeholder = '2021'
			 />
			<select onChange={(event) => props.setGenre(event.target.value)}>
			<option value='movie'>Movies</option>
			<option value="series">Series</option>
			<option value="episode">Episode</option>
			</select>
		</div>
	</div>
	);
};

export default Search;
