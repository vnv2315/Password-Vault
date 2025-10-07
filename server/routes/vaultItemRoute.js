import express from 'express'
import {addVaultItem,listVaultItem,removeVaultItem,singleVaultItem,updateVaultItem} from "../controllers/vaultItemController.js";
import userAuth from '../middleware/userAuth.js';


const vaultItemRouter=express.Router();

vaultItemRouter.post('/add',userAuth,addVaultItem);
vaultItemRouter.get('/lists',userAuth,listVaultItem);
vaultItemRouter.delete('/remove/:id', userAuth, removeVaultItem);
vaultItemRouter.get('/list/:id',userAuth,singleVaultItem);
vaultItemRouter.put('/update/:id',userAuth,updateVaultItem);

export default vaultItemRouter;