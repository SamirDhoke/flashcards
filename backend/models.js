const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const transformSchema = (doc, updated) => {
	updated.id = updated._id.toString();
	delete updated._id;
	delete updated.__v;
}

const fileSchema = new Schema({
	name: String,
	parent: {
		type: mongoose.Types.ObjectId,
		isRequired: true,
		ref: 'File'
	},
	children: {
		type: [{
			type: mongoose.Types.ObjectId,
			ref: 'File'	
		}],
		default: []
	},
	content: {
		type: mongoose.Types.ObjectId,
		ref: 'Card',
		isRequired: false
	},
	isDir: {
		type: Boolean,
		isRequired: true
	}
})

const cardSchema = new Schema({
	question: String,
	answer: String,
	isStarred: {
		type: Boolean,
		default: false
	}
})


fileSchema.set( 'toJSON', { transform: transformSchema } )
cardSchema.set( 'toJSON', { transform: transformSchema } )

const File = model('File', fileSchema);
const Card = model('Card', cardSchema);

module.exports = {
	File,
	Card
}