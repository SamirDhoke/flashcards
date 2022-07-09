import React from 'react';
import api from './api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faCheck, faCircleInfo } from '@fortawesome/free-solid-svg-icons'

import './FolderModal.css';

const INITIAL_STATE = {
	filename: '',
	error: ''
};

const FolderModal = (props) => {

	const {
		hide,
		open,
		path,
		parent,
		updateFiles
	} = props;

	const [state, setState] = React.useState(INITIAL_STATE);

	const handleSubmit = e => {
		e.preventDefault();

		if (!state.filename.length) {
			return;
		}

		api
			.createFolder({ parent: parent.id, name: state.filename })
			.then(data => {				
				updateFiles(data)
				setState(INITIAL_STATE);				
			})
			.catch(e => setState({...state, error: e.message}));
	}

	const handleFilenameChange = e => {
		setState({...state, filename: e.target.value})
	}

	const handleHide = e => {
		setState(INITIAL_STATE);
		hide();
	}

	if (!open) {
		return null;
	}

	return (
		<div className='folder-modal-wrapper'>
			<div className="folder-modal">
				<div className='row'>
					<h1>Create a folder</h1>
					<span className='icon' onClick={handleHide}><FontAwesomeIcon icon={faXmark}/></span>
				</div>
				<div className='row'>
					<form onSubmit={handleSubmit}>
						<div className='form-control'>
							<label>Name</label>
							<input 
								type='text' 
								placeholder='e.g. physics-kinetic-motion' 
								value={state.filename}
								onChange={handleFilenameChange}
							/>
						</div>
						<div className='form-control'>
							<label>Path</label>
							<input 
								type='text' 
								value={path} 
								readOnly={true} 
							/>
						</div>
					</form>
				</div>
				<div className='row'>
					<button className='action-btn' onClick={handleHide}><FontAwesomeIcon icon={faXmark}/><span>Cancel</span></button>
					<button className='action-btn' onClick={handleSubmit}><FontAwesomeIcon icon={faCheck}/><span>Submit</span></button>
				</div>
				{
					state.error.length 
					? (
						<div className='row err-msg'>
							<span className='err-icon'><FontAwesomeIcon icon={faCircleInfo} /></span>
							<span className='text'>{state.error}</span>
						</div>
					) : null
				}
			</div>
		</div>
	)
}

export default FolderModal;