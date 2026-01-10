
import router from "express";
import { authmiddleware } from "../middlewares/authmiddleware.js";
import { admininfo, check2fa, creatadmin, enable2FA, loginadmin, logoutadmin, refreshtoken, verify2FA } from "../controllers/admin/admin.controller.js";

const userRouter = router.Router();
userRouter.post('/createadmin',creatadmin)
.post('/login',loginadmin)

.get('/refresh-token',refreshtoken)
.post('/logout',logoutadmin)
.get('/me',authmiddleware,admininfo)
.post('/twofactor',authmiddleware,enable2FA)
.post('/verify',authmiddleware,verify2FA)
.get('/check2fa',authmiddleware,check2fa)
// .post('/loginverify',authmiddleware,verifylogin2fa)

export default userRouter;   