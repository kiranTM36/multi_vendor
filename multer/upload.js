const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req, file, cd)=>{
        cd(null, 'uploads')
    },
    filename : (req, file, cd)=> {
        cd(null, Date.now()+"_"+file.originalname)
    }})

const uploads = multer({storage : storage})

module.exports = uploads