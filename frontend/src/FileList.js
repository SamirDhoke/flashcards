import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { faFile } from '@fortawesome/free-regular-svg-icons'

import './FileList.css'

const FileListItem = props => {
	const { onclick, file } = props;

	const handleClick = () => onclick(file.id);
	
	const icon = file.isDir ? faFolder : faFile;
	const className = file.isDir ? 'dir' : 'file';

	return (
		<li className='file-item'>
			<div className={className} onClick={handleClick}>
				<span className='icon'><FontAwesomeIcon icon={icon} /></span>
				<span className='name'>{ file.name }</span>
			</div>
		</li>
	)
}

const FileList = props => {
	const { files, dirclick, fileclick } = props;

	return (
		<ul className='file-list'>
			{
				files.map(file => {
					if (file.isDir)						
						return <FileListItem key={file.id} onclick={dirclick} file={file} />
					else
						return <FileListItem key={file.id} onclick={fileclick} file={file} />
				})
			}
		</ul>
	)
}

export default FileList;