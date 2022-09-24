import React from 'react';
import {
	Switch,
	Route
} from 'react-router-dom';

import Homepage from './Homepage';
import FlashcardPage from './FlashcardPage';
import FlashcardEdit from './FlashcardEdit';

const App = (props) => {

	const [state, setState] = React.useState({
		active: null
	});

	const setActiveNote = note => setState({...state, active: note});

	return (
		<div className="App">
			<Switch>
				<Route path='/view' render={ rprops => <FlashcardPage {...rprops} fileId={state.active}/> } />
				<Route path='/edit' render={ rprops => <FlashcardEdit {...rprops} fileId={state.active}/> } />
				<Route path='/' render={ rprops => <Homepage {...rprops} setActiveNote={setActiveNote} /> } />
				{/*<Route path='/' render={ rprops => <Homepage {...rprops} categories={state.categories} setActiveCat={setActiveCat}/> } />*/}
			</Switch>
		</div>
	)
}

export default App;