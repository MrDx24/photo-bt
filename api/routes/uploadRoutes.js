const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require("multer");
const UploadController = require('../controllers/imageUpload');

//date function
function getDate() {
  const today = new Date();
  var yyyy = today.getFullYear();
  var m = (today.getMonth() + 1);
  var dd = today.getDate();
  var time= today.getTime();
  var mm=0;
  if(m<10){
      mm=("0"+m);
  }
  else{
      mm=m;
  }
  var result = dd+""+mm+""+yyyy+"T"+time;

  return result;
}


//file handler
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname.split(".")[0] + '-' + getDate() + path.extname(file.originalname));
  },
});
const upload = multer({storage:storage})



//routes
router.post("/image", upload.single('image'), UploadController.image_upload);

router.get("/getimages/:id", UploadController.image_get);

router.get("/getimage/:id", UploadController.image_th_get);

router.delete("/deleteimage/:id", UploadController.image_delete);



module.exports = router;



