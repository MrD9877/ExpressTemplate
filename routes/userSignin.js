import { Router } from "express";
import { User } from "../schemas/userSchema.js";
import { validationResult, checkSchema, matchedData } from 'express-validator'
import { Passport } from "passport";
import checkUserSchema from "../validation/userValidation.js";

const router = Router();

router.post("/singin", checkSchema(checkUserSchema), async (req, res) => {
    const result = validationResult(req)
    if (!result.isEmpty()) return res.send({
        "valid": false,
        "msg": result.errors[0].msg
    })
    const data = matchedData(req)
    const findDublicateUserName = await User.findOne({ name: data.name });
    if (findDublicateUserName) return res.send({
        "valid": false,
        "msg": "please use different name"
    })
    const user = new User(data);
    await user.save();
    res.sendStatus(201)
})

// router.get("/signin", passport.authenticate("local"))

// router.get("/auth", passport.authenticate("local"), (req, res) => {
//     console.log(`thiss is${req.user}`)
//     res.sendStatus(200)
// })

export default router