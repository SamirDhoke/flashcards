import React from 'react';
import api from './api';
import './FlashcardPage.css';

const FlashcardSide = props => {
	const { side, note, type, toggleFlip } = props;

	return (
		<div className={`card ${side}`}>
			<div className='content'>
				<div className='meta'>
					<span className='card-type'>
					{ type }
					</span>						
				</div>					
				<h1 className={type}>{ note[type] }</h1>
			</div>
			<span className='flip-text' onClick={toggleFlip}>click to flip</span>				
		</div>
	)
}

const FlashcardPage = props => {
	const { fileId } = props;
	
	const [state, setState] = React.useState({
		isFlipped: false,
		file: null
	});

	React.useEffect(() => {
		api
			.getFile({ fileId })
			.then(file => setState({...state, file}))
			.catch(e => console.error(e));

	}, [fileId])

	const toggleFlip = () => setState({...state, isFlipped: !state.isFlipped});

	const style = { transform: state.isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }

	const note = state.file && state.file.content;

	if (!note) {
		return null;
	}

	return (
		<div className="flash-card">
			<div className="container" style={style}>
				<FlashcardSide
					side='front'
					type='question'
					note={note}
					toggleFlip={toggleFlip}
				/>
				<FlashcardSide
					side='back'
					type='answer'
					note={note}
					toggleFlip={toggleFlip}
				/>				
			</div>
		</div>
	)
}

export default FlashcardPage;