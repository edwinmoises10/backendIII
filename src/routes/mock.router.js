import { Router } from "express";
import { generateUserMock } from "../mocks/users.mock.js";
const router = Router();
router.get('/mockingusers', (req, res) => {
    const users = generateUserMock(50)
    res.status(200).json({
        status: 'success',
        payload: users
    })
})

export default router;