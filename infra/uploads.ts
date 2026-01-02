import multer = require("multer");
import { deflate } from "node:zlib";

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null,"uploads/")
    },
    filename: function(req, file, callback){
        callback(null, file.originalname);
    }
});

const uploads = multer({storage : storage});

export default uploads;