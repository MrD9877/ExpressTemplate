import passport from 'passport'
import { Strategy } from 'passport-local';
import { User } from "../schemas/userSchema.js";

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id)
        if (!user) throw new Error('invalid codentials in deserializer');
        done(null, user)
    } catch (err) {
        done(err, null)
    }

})


export default passport.use(
    new Strategy(
        async (username, password, done) => {
            try {
                const user = await User.findOne({ username })
                if (!user) { return done(null, false) }
                // const checkPassword = bcrypt.compareSync(password, user.password)
                // if (!checkPassword) throw new Error('invalid password');
                const checkPassword = user.password;
                if (password !== checkPassword) return done(null, false)
                done(null, user)

            } catch (err) {
                done(err, null)
            }
        }
    ));