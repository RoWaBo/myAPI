module.exports = (req, res, next) => {

    if (!req.headers.authorization) {
        res.status(401).end()
        return
    }

    if (req.headers.authorization !== `Bearer ${process.env.TOKEN}`) {
        res.status(403).send(`<img src="https://static.wixstatic.com/media/836406_c8df9df76b1f436b961f4f8850352207~mv2.gif">`)
        return    
    }
    
    next()
}
