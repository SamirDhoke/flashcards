import React from 'react';
import FlashcardPreview from './FlashcardPreview';

import api from './api';

import './FlashcardEdit.css';

const FlashcardEdit = props => {
	const { fileId, ...rest } = props;
	
	const [state, setState] = React.useState({
		file: null,
		side: 0,
		preview: true
	});

	React.useEffect(() => {
		api
			.getFile({ fileId })
			.then(data => setState({...state, file: data}))
			.catch(e => console.error(e));

	}, [fileId])

	const togglePreview = e => setState({...state, preview: !state.preview});

	const changeQuestion = e => {
		const newQuestion = e.target.value;
		setState({
			...state, file: {
				...state.file,
				content: {
					...state.file.content,
					question: newQuestion
				}
			} 
		})
	}

	const changeAnswer = e => {
		const newAnswer = e.target.value;
		setState({
			...state, file: {
				...state.file,
				content: {
					...state.file.content,
					answer: newAnswer
				}
			} 
		})
	}

	const handleSubmit = e => {
		api
			.updateCard({
				fileId: state.file.id,
				question: state.file.content.question,
				answer: state.file.content.answer
			})
			.then(file => rest.history.push('/view'))
			.catch(e => console.error(e));
	}

	if (!state.file) {
		return null;
	}

	return (
		<React.Fragment>
			<div className='flash-card-edit'>
				<div className='header'>
					<span className='side'>
						Editing {state.side ? 'back' : 'front'} Side
					</span>
					<button className='btn save' onClick={handleSubmit}>
						save
					</button>
				</div>
				<div>
					<form onSubmit={handleSubmit}>
						<textarea 
							value={state.file.content.question}
							onChange={changeQuestion}
						/>
						<textarea 
							value={state.file.content.answer}
							onChange={changeAnswer}
						/>
					</form>
					<button className='icon-btn flip-side'>
						flip side
					</button>
				</div>
				<button onClick={togglePreview}>
					preview
				</button>				
			</div>
			{ 
				state.preview
					? <FlashcardPreview card={state.file.content} external={true} close={togglePreview} {...rest} />
					: null
			}
		</React.Fragment>
	);
}

export default FlashcardEdit;