import express from 'express';
import { allRecipes, postRecip, categoryRecipes, patchRecip, deleteRecip } from '../controllers/recip.js';

const router = express.Router();


router.get('/', allRecipes);
router.get('/category/:category', categoryRecipes);
router.post('/', postRecip);
router.delete('/:id', deleteRecip);
router.patch('/:id', patchRecip);

export default router;