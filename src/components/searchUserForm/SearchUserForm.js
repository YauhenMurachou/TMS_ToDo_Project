import React from 'react';

import './SearchUserForm.scss';

const SearchUserForm = ({ onSubmit, placeholder, onChange, value }) => {

	return (
		<div className='search-wrapper'>

			<form
				className='search-form'
				onSubmit={onSubmit}
			>

				<label htmlFor="search-task">
					Search user:
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

export default SearchUserForm;