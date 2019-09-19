import { Router } from 'express';
import PersonController from '../controllers/PersonController';

const router = Router();

router.get('/', PersonController.getAllPersons);
router.post('/', PersonController.addPerson);
router.get('/:id', PersonController.getAPerson);
router.put('/:id', PersonController.updatedPerson);
router.delete('/:id', PersonController.deletePerson);

export default router;
