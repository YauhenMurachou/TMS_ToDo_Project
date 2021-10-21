import React from 'react';
import { Link } from 'react-router-dom';

import './TimeOverWindow.scss'

import { Routes } from '../../utils/routes';

function TimeOverWindow(props) {

	const { text, onClick, link } = props;

	return (
		<>
			<div className='popup'>

				<div className='popup__body'>
					<div className='popup__content'>
						<a href='#' className='popup__close' onClick={() => onClick()}>X</a>
						<p className='time-text'>{text}</p>
						<Link to={Routes[link]}>
							<button className='time-btn'>SignIn</button>
						</Link>
					</div>
				</div>
			</div>
		</>
	)
}

export default TimeOverWindow;