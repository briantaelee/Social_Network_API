const router = require('express').Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController');

router.get('/thoughts', getThoughts);

router.get('/:thoughtId', getThoughtById);

router.post('/', createThought);

router.put('/:thoughtId', updateThought);

router.delete('/:thoughtId', deleteThought);

module.exports = router;
