import React from 'react';

import './Search.scss';

const Search = ({ onSubmit, placeholder, onChange, value }) => {

	return (
		<div className='search-wrapper'>

			<form
				className='search-form'
				onSubmit={onSubmit}
			>

				<input
					className='search-input'
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={onChange}
				/>

				<input
					className='search-button'
					type='submit'
					value={'search'}
				/>

			</form>
		</div>
	)
}

export default Search;