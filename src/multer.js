import multer from "multer";

const config = multer.diskStorage({
    destination: function(req, res, cb) {
        cb(null, __dirname + "public/img")
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})