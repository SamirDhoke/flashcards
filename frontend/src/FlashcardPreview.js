import React from 'react';
import './FlashcardPreview.css';

// import { withRouter } from 'react-router-dom';

const FlashcardSide = props => {
	const { side, type, data, flip } = props;

	return (
		<div className={`card ${side}`}>
			<div className='content'>
				<div className='meta'>
					<span className='card-type'>
					{ type }
					</span>						
				</div>					
				<h1 className={type}>{ data }</h1>
			</div>
			<span className='flip-text' onClick={flip}>click to flip</span>				
		</div>
	)
}

const FlashcardPreview = props => {
	const { card, ...rest } = props;

	const [isFlipped, setFlipped] = React.useState(false);

	const flip = e => setFlipped(!isFlipped);

	const style = { transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' };

	const handleEdit = e => rest.history.push('edit')

	return (
		<div className="flash-card">
			{ rest.external ? <span className='close' onClick={rest.close}>close</span> : null }
			<div className="container" style={style}>
				<FlashcardSide
					side='front'
					type='question'
					data={card.question}
					flip={flip}
				/>
				<FlashcardSide
					side='back'
					type='answer'
					data={card.answer}
					flip={flip}
				/>				
			</div>
			{ rest.editable ? <button onClick={handleEdit} className='btn edit'>edit</button> : null }
		</div>
	)
}

export default FlashcardPreview;