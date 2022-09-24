import axios from 'axios';

const API = 'http://localhost:5000';

const getRootListing = async () => {
	const res = await axios.get(`${API}/root`);
	return res.data;
}

const getListing = async (props) => {
	const {dirId} = props;
	const listing = await axios.get(`${API}/dir/${dirId}`);
	// const dir = await getDir(props);
	// const response = { files: listing.data, dir };
	
	return listing.data;
}

const getFile = async (props) => {
	const { fileId } = props;

	const file = await axios.get(`${API}/file/${fileId}`);
	// const note = await axios.get(`${API}/notes/${file.data.content}`);

	return file.data;
}

const createFile = async (props) => {
	const { question, answer, name, parent: parentId } = props;

	const data = {
		question,
		answer,
		name,
		isDir: false
	}

    const response = await axios.post(`${API}/dir/${parentId}`, data)
    return response.data; 
}

const createFolder = async (props) => {
	const { question, answer, name, parent: parentId } = props;

	const data = {
		name,
		isDir: true
	}

    const response = await axios.post(`${API}/dir/${parentId}`, data)
    return response.data; 
}

const updateCard = async (props) => {
	const {question, answer, fileId} = props;

	const data = {
		question,
		answer
	};

	const response = await axios.put(`${API}/file/${fileId}`, data);
	return response.data;
}

export default {
	getListing,
	getRootListing,
	getFile,
	createFile,
	createFolder,
	updateCard
}