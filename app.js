const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https =  require("https");


var app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){

   var firstName = req.body.fName;
   var lastName = req.body.lName;
   var emailAddress = req.body.email;
   console.log("firstName ="+firstName+"lastName ="+lastName+"email ="+emailAddress);
   var data ={
     members: [
       {
         email_address : emailAddress,
         status : "subscribed",
         merge_fields : {
           FNAME :firstName,
           LNAME :lastName
         }

       }
     ]
   };

   const jsonData = JSON.stringify(data);

   const url = "https://us19.api.mailchimp.com/3.0/lists/8ee311d855";

   const options = {
     method : "POST",
     auth:"roshini:9878a094ed64c8929c9b5b8a672bbf15-us19"
   }



    const request = https.request(url, options, function(response) {

     if(response.statusCode === 200){
       //res.send("Successfully subscribed!!");
       res.sendFile(__dirname+"/success.html");
          }
     else{
       res.sendFile(__dirname+"/failure.html");
     }

      response.on("data" ,  function(data){
        console.log(JSON.parse(data));
      });
    });

    //list id : 8ee311d855
    //Api key : 9878a094ed64c8929c9b5b8a672bbf15-us19

    //request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("listening...");
});
