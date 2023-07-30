const Image = require("../model/imageModel");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

function getdatetime () {
  const today = new Date();
  var yyyy = today.getFullYear();
  var m = (today.getMonth() + 1);
  var dd = today.getDate();
  var time = today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()+":"+today.getMilliseconds();
  var mm=0;
  if(m<10){
      mm=("0"+m);
  }
  else{
      mm=m;
  }
  var result = (dd+"/"+mm+"/"+yyyy)+"-"+(dd+"/"+mm+"/"+yyyy+"_"+time);

  return result;
} 


exports.image_upload = async(req, res, next) => {
  
  var dttm = getdatetime().split("-")[1];
  var dt = getdatetime().split("-")[0];
  console.log(req.file.path)
  console.log(req.file)
  const obj = {
    img: {
      data: fs.readFileSync(
        path.join("images/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };
  const newImage = new Image({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.imageName.split(".")[0] + "_" + dttm,
    category: req.body.category,
    th: req.body.th,
    imagefile: obj.img,
    date: dt
  });
  const savingImage = newImage.save();
  //const savingImage = req.body.category
  // console.log(newImage)
    if(savingImage) 
    { 
      fs.unlinkSync(req.file.path);
      res.status(201).json({
        message: "Image uploaded successfully",
        result : savingImage
      });
      
    } 
    else { 
      fs.unlinkSync(req.file.path);
      res.status(500).json({
        message: "Image upload failed",
        result : savingImage
      });
      console.log(err);
    }
  
  
};


exports.image_get = async(req, res, next) => {
  console.log(req.params.id)
  var result = await Image.find({category: req.params.id});
  //console.log(result[0].category)
  if (result && result.length > 0) {
    res.status(200).json(result); // Send the array directly in the response
  } 
  else {
    res.status(500).json({ message: "No images found for the specified category." });
  }
};

exports.image_th_get = async(req, res, next) => {
  
  
    const category = req.params.id; // Get the image category from the request parameters
    console.log(category)
    const image = await Image.findOne({ category: category, th:"yes" }); // Retrieve a single image from MongoDB based on the category
    
    if (image) {
      // If an image is found for the category, send it in the response
      console.log(image.category)
      res.status(200).json(image);
    } else {
      // If no image is found for the category, send a 404 Not Found response
      res.status(404).json({ message: "No image found for the category" });
    }
  
  
};

exports.image_delete = async(req, res, next) => {
  
  console.log(req.params.id)
  const id = req.params.id; // Get the image id from the request parameters
  
  const delimage = await Image.deleteOne({ _id: id}); // Retrieve a single image from MongoDB based on the id
  
  if (delimage) {
    
    res.status(200).json(delimage);
  } else {
    // If no image is found for the category, send a 404 Not Found response
    res.status(404).json({ message: "No image found for the id" });
  }


};



