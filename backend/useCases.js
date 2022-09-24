const models = require('./models');

const ROOT_ID = '62c90f2bb4dd6e6f987e9bd0';

const getCard = (fileId) => {
	return models.File
		.findById(fileId)
		.populate({
			path: 'content',
			select: ['question', 'answer', 'isStarred']
		})
		.then(data => data)
}

const getListingOf = (dirId) => {
	return models.File
		.findById(dirId)
		.populate({
			path: 'children',
			select: ['name', 'parent', 'isDir']
		})
		.populate({
			path: 'parent',
			select: ['name', 'parent', 'isDir']
		})
		.then(data => data)
}


const createFile = async (name, parent, isDir, cardId=null) => {
	const existing = await models.File.exists({ name, parent, isDir });
	if (existing) {
		throw new Error('a file already exists with this name.');
	}

	const newFile = await models.File.create({ name, parent, isDir, content: cardId });
	const updatedParent = await models.File.findByIdAndUpdate(
		{ _id: parent }, 
		{
			$push: {
				children: newFile._id
			}
		},
		{ new: true }
	)
	.populate({
		path: 'children',
		select: ['name', 'parent', 'isDir']
	})
	.populate({
		path: 'parent',
		select: ['name', 'parent', 'isDir']
	})

	return updatedParent;
}

const getListingOfRoot = () => getListingOf(ROOT_ID);

const createDir = async (name, parent) => {
	return createFile(name, parent, true);
}

const createCard = async (question, answer, name, parent) => {
	const card = await models.Card.create({ question, answer });

	return createFile(name, parent, false, card._id);
}

const updateCard = async (fileId, question, answer) => {
	const existing = await models.File.findById(fileId);

	const updatedContent = await models.Card.findByIdAndUpdate(
		{ _id: existing.content }, 
		{ question, answer },
		{ new: true }
	);

	return getCard(existing._id);
}

module.exports = {
	createDir,
	createCard,
	getListingOf,
	getListingOfRoot,
	getCard,
	updateCard
}