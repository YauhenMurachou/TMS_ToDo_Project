import React from 'react';

const CorrectButton = (props) => {

	const { checked, item, onClick } = props;

	return (
		
			<button className="correct-btn" onClick={() => onClick()}>
				correct
			</button>
		

	)
}

export default CorrectButton;

