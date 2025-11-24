import express from 'express';
import {login , signUp , logout , updateProfile , checkAuth} from '../controllers/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.post("/login", login);

router.post("/signUp", signUp);

router.post("/logout", logout);

router.put('/update_profile' ,protectRoute, updateProfile);

router.get('/check' , protectRoute , checkAuth); // this route will be called to ckeck the authenticity of the user on the refress and decide wether to redirect to login page or the dashboard


export default router;
