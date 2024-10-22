# Express cookies and session 
Cookies are pieces of information that you send to the client to be saved in the browser for later retrieval for various purposes. A session, on the other hand, is a chunk of data that stores client authentication and interactions with your site. You provide a session ID to the browser, which is stored for later use to restore client interactions.

Best practices recommend storing session data in a database.

```
app.use(cookieParser())
app.use(session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60,
        httpOnly: false,
        withCredentials: true,
    },
    store: MongoStore.create({
        client: mongoose.connection.getClient()
    })
}))
```
Above given code store sessions in mongoose

## How to store cookies and sessions

### cookies
```
 res.cookie(***cookie name in string***,**data**, { maxAge: 900000, httpOnly: true })
```

### sessions
```
req.session.user = **any data**
```

## How to check client side cookies and sessions

## cookies
```
req.cookies.<--cookie name-->
```

## session
```
 req.sessionStore.get(req.sessionID, (err, sessionData) => {
        if (err) {
            res.send("no data")
        }
        res.send(sessionData)
```

```
let int = 0
router.post("/login", async (req, res) => {
    int++
    const { name, password } = req.body
    const findUser = await User.findOne({ name: name })
    if (password === findUser.password) {
        res.cookie("makeb", "6768", { maxAge: 900000, httpOnly: true })
        req.session.user = `${int}`
        req.sessionStore.get(req.session.id, (err, sessionData) => {
            if (err) {
                throw err
            }
            console.log(sessionData)
        })
        res.send(`${int}`)
    } else {
        res.send("no oth")
    }
})

router.post("/signin", async (req, res) => {
    const data = req.body
    const user = new User(data)
    await user.save()
    console.log(data)
    res.sendStatus(201)
})

router.get("/home", (req, res) => {
    console.log('home')
    console.log(req.cookies.makeb)
    req.sessionStore.get(req.sessionID, (err, sessionData) => {
        if (err) {
            res.send("no data")
        }
        res.send(sessionData)
    })
})
```
