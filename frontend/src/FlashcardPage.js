import React from 'react';
import FlashcardPreview from './FlashcardPreview';

import api from './api';

const FlashcardPage = props => {
	const { fileId, ...rest } = props;
	
	const [file, setFile] = React.useState(null);

	React.useEffect(() => {
		api
			.getFile({ fileId })
			.then(data => setFile(data))
			.catch(e => console.error(e));

	}, [fileId])

	if (!file) {
		return null;
	}

	return <FlashcardPreview card={file.content} editable={true} {...rest}/>;
}

export default FlashcardPage;