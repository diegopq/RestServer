const { Router } = require('express');
const { getUsers, postUsers, putUsers, deleteUsers, patchUsers } = require('../controllers/users_controller');

const router = Router();


router.get('/', getUsers);

router.post('/', postUsers);

//leer parametros de segmento
router.put('/:id', putUsers);

router.delete('/', deleteUsers);

router.patch('/', patchUsers)


module.exports = router;