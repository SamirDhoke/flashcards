const router = require('express').Router();
const useCases = require('./useCases');

router.get('/root', (req, res, next) => {
	useCases
		.getListingOfRoot()
		.then(data => res.json(data))
		.catch(e => next(e))
})

router.get('/dir/:fid', (req, res, next) => {
	const fileId = req.params.fid;

	useCases
		.getListingOf(fileId)
		.then(data => res.json(data))
		.catch(e => next(e))
})

router.get('/file/:fid', (req, res, next) => {
	const fileId = req.params.fid;

	useCases
		.getCard(fileId)
		.then(data => res.json(data))
		.catch(e => next(e))
})

router.put('/file/:fid', (req, res, next) => {
	const fileId = req.params.fid;
	const body = req.body;

	useCases
		.updateCard(fileId, body.question, body.answer)
		.then(data => res.json(data))
		.catch(e => next(e))
})

router.post('/dir/:fid', async (req, res, next) => {
	const fileId = req.params.fid;
	const body = req.body;

	let result;

	try {

		if (body.isDir) {
			result = await useCases.createDir(body.name, fileId);
		} else {
			result = await useCases.createCard(body.question, body.answer, body.name, fileId);
		}

		res.status(201).json(result);

	} catch (e) {

		next(e)

	}
});

module.exports = router;