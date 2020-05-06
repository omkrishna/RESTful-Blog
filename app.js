var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

var blogSchema = new mongoose.Schema({
	title:String,
	image:String,
	body:String,
	created:{type:Date, default: Date.now}
});

var Blog = mongoose.model("Blog",blogSchema);

/*Blog.create({
	title : "Test Blog Post",
	image : "https://images.unsplash.com/photo-1588481099794-53f68518d597?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=900&q=60",
	body : "Hello this is my first blog post"
});*/

app.get("/",function(req,res){
	res.redirect("/blogs")
})

app.get("/blogs",function(req,res){
	Blog.find({},function(err,blogs){
		if(err){
			console.log("Error");
		} else {
			res.render("index",{blogs:blogs})
		}
	})
	
})

app.get("/blogs/new",function(req,res){
	res.render("new");
})

app.post("/blogs",function(req,res){
	Blog.create(req.body.blog,function(err,Blog){
		if(err){
			console.log("Error");
		}else{
			res.redirect("/blogs");
		}
	})
})


app.get("/blogs/:id",function(req,res){
	Blog.findById(req.params.id,function(err,Blog){
		if(err){
			console.log("Err");
		}else{
			res.render("show",{blog:Blog})
		}
	})
})


app.listen(3000,function(){
	console.log("Blog server running")
})