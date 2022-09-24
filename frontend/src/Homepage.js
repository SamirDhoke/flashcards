import React from 'react';
import FileModal from './FileModal';
import FolderModal from './FolderModal';
import FileList from './FileList';

import api from './api';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolderOpen, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faClone } from '@fortawesome/free-regular-svg-icons'

import './Homepage.css';

const Homepage = (props) => {
	const { setActiveNote } = props;

	const [state, setState] = React.useState({
		children: [],
		parent: {
			id: 0,
			name: 'root',
			parent: 0
		},
		path: ['root'],
		isFileModalOpen: false,
		isDirModalOpen: false,

	});

	const hideFileModal = () => setState({...state, isFileModalOpen: false});
	const showFileModal = () => setState({...state, isFileModalOpen: true});

	const hideFolderModal = () => setState({...state, isFolderModalOpen: false});
	const showFolderModal = () => setState({...state, isFolderModalOpen: true});

	const stateRef = React.useRef({parent: state.parent, path: state.path});

	React.useEffect(() => {

		// this is to fetch the last directory user was in before leaving the homepage.
		// the last directory is stored in localStorage.

		// const fsStateString = window.localStorage.getItem('fsState');
		
		const fsStateString = '';

		if (!fsStateString) {
			// if no such directory, fetch the root directory listing.
			// console.log('GETTING ROOT LISTING...')
			api
				.getRootListing()
				.then(data => {
					// console.log('RES', data);
					setState({...state, children: data.children, parent: data.parent})
				})
				.catch(e => console.error(e.message))

		} else {

			const fsState = JSON.parse(fsStateString);

			api
				.getListing({ dirId: fsState.parent.id })
				.then(data => {
					setState({
						...state,
						children: data.children,
						parent: fsState.parent,
						path: fsState.path
					})
				})
				.catch(e => console.error(e.message));	
		}

		return () => {
			// called when unmounting.
			cleanup(); 
		}

	}, [])

	React.useEffect(() => {
		// this is to ensure that cleanup() gets called when user suddenly closes window or refreshes tab.
		window.addEventListener('beforeunload', cleanup);

	}, []);

	React.useEffect(() => {
		// stateRef is used because the state is not holding correct values when calling cleanup() from useEffect hooks.
		stateRef.current = { path: state.path, parent: state.parent };
	}, [state])

	const cleanup = () => {
		const fsState = stateRef.current;
		window.localStorage.setItem('fsState', JSON.stringify(fsState));
	}

	const handleDirClick = dirId => {
		const folder = state.children.find(f => f.id === dirId);
		
		api
			.getListing({ dirId: dirId })
			.then(data => {		
				setState({
					...state,
					parent: { id: folder.id, name: folder.name, parent: folder.parent },
					children: data.children,
					path: folder.id === 0 ? state.path : state.path.concat(folder.name)
				});
			})
	}

	const handleParentClick = e => {
		let children;
		api
			.getListing({ dirId: state.parent.parent })
			.then(data => {	
				setState({
					...state,					
					children: data.children,
					parent: { id: data.id, name: data.name, parent: data.parent.id },
					path: state.path.length === 1 ? state.path : state.path.slice(0, state.path.length - 1)
				})
			}) 
	}

	const handleSetActive = (noteId) => {
		setActiveNote(noteId);
		props.history.push('/view')		
	}

	const handleFileCreate = () => showFileModal();
	const handleFolderCreate = () => showFolderModal();


	const handleFileListUpdate = (data) => setState({ 
		...state, 
		children: data.children, 
		isFolderModalOpen: false, 
		isFileModalOpen: false 
	});

	const path = state.path.join('/');

	// console.log('STATE', state);

	return (
		<div className="NewHomePage">
			<div className='controls'>
				<button className='icon-btn' onClick={handleParentClick}><FontAwesomeIcon icon={faArrowLeft} /></button>
				<div className='btns'>
					<button className='icon-btn' onClick={handleFileCreate}><FontAwesomeIcon icon={faClone} /></button>
					<button className='icon-btn' onClick={handleFolderCreate}><FontAwesomeIcon icon={faFolderOpen} /></button>
				</div>
			</div>
			<div className='header'>
				<h4>{path}</h4>				
			</div>
			<FileList
				dirclick={handleDirClick}
				fileclick={handleSetActive}
				files={state.children}
			/>
			<FileModal 
				open={state.isFileModalOpen} 
				path={path} 
				hide={hideFileModal}
				parent={state.parent}
				updateFiles={handleFileListUpdate}
			/>
			<FolderModal 
				open={state.isFolderModalOpen} 
				path={path} 
				hide={hideFolderModal}
				parent={state.parent}
				updateFiles={handleFileListUpdate}
			/>
		</div>
	)
}

export default Homepage;