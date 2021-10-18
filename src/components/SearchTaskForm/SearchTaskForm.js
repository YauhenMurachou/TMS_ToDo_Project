import React from 'react';

import './SearchTaskForm.scss';

const SearchTaskForm = ({ onSubmit, placeholder, onChange, value }) => {

	return (
		<div className='search-wrapper'>

			<form
				className='search-form'
				onSubmit={onSubmit}
			>

				<label htmlFor="search-task">
					Search task:
				</label>

				<input
					className='search-input'
					id="search-task"
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

export default SearchTaskForm;