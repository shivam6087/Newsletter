const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const { status } = require("express/lib/response");


const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
// we can use all upper code in every single new project
// we use app.use to use those function which we require in upper linke 
// exaple =express,bodyParser

app.get("/",function(req,res){
    res.sendFile(__dirname +"/signup.html");
});



app.post("/",function(req,res){

const firstName =req.body.fName;
const lastName=req.body.lName;
const email =req.body.email;

var data={
    members:[
        {
        email_address:email,
        status: "subscribed",
        merge_fields:{
            FNAME:firstName,
            LNAME:lastName
        }
    }
    ]
};
var jsonData=JSON.stringify(data);

const url="https://us14.api.mailchimp.com/3.0/lists/1278e37baa";

const options={
    method:"POST",
    auth:"shivam123@:b8897a6abbf28a28fc02f65f8d332ffc-us14"
}
const request=https.request(url,options,function(response){

    if(response.statusCode==200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

response.on("data",function(data){

console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT ||3000 ,function(){
    console.log("server is running on 3000");
});

// b8897a6abbf28a28fc02f65f8d332ffc-us14
// 1278e37baa