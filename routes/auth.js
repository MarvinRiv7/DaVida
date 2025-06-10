const {Router} = require('express')
const router = Router()


router.get('/', (req, res) => {
    console.log('Se require el /')
    res.json({
        ok: true,
    })
})

module.exports = router