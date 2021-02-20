const router = require("express").Router();
var cors = require('cors')

const Listing = require("../model/Listing");

// Add New contact
router.post("/create", cors(), async (req, res) => {
  const listing = new Listing(req.body);
    console.log(req.body)
    const savedListing = await listing.save();
    res.send(savedListing);
});   

router.post("/uploadFile", cors(), async (req, res) => {
  var fileMetadata = {
    'name': 'photo.jpg'
  };
  var media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('files/photo.jpg')
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, file) {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('File Id: ', file.id);
    }
  });
});  

// getOne contact
router.get("/:id", async(req, res) => {
 var abc = await Listing.findOne({
  _id:req.params.id
  })
  res.send(abc);
});

// Update contact
router.put("/update/:id", async(req, res) => {
  Listing.findByIdAndUpdate(req.params.id, req.body,
  function (err, docs) { 
if (err){ 
console.log(err) 
} 
else{ 
console.log("Updated User : ", docs); 
res.send(docs)
} 
}); 
});

// Delete listing
router.delete("/:id", (req, res) => {
  Listing.deleteOne({ _id: req.params.id },function(err, ress){
    if(err) {res.send(err)}else {res.send(ress)}

  })
 });
 router.get("/abc/getAllPagination", async(req, res) => {
   var matchObj = {}
   //search by company name
   if(req.body.searchText){
     matchObj.companyName = req.body.searchText
   }
   //set page limit
   var page = req.body.page?req.body.page:0;
   var limit = req.body.limit?req.body.limit:5;
//display lists   
 var ListOfListing = await Listing.find(matchObj).sort({  firstName: -1 }).skip(page * limit).limit(limit)
 res.send(ListOfListing)
 });

module.exports = router;
