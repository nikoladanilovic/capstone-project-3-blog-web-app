import express from "express"
import bodyParser from "body-parser"

const app = express();
const port = 3000;

let blogPosts = [];
let data;
let blogPostToEdit;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));



app.get("/", (req, res) => {
    res.render("index.ejs", {blogPostsww: blogPosts});
});

app.get("/newBlogPost", (req, res) => {
    res.render("newBlogPost.ejs");
});

app.get("/about", (req, res) => {
    res.render("about.ejs");
});

app.post("/submit", (req, res) => {

    
    data = {
        numberOfPost: blogPosts.length,
        blogTitle : req.body["titleBlog"],
        blogerName : req.body["nameBloger"],
        content :  req.body["blogContent"]
    }
    

    blogPosts.push(data);
    //console.log(blogPosts.length);
    res.render("index.ejs", {blogPostsww: blogPosts});
    
  });

  app.post("/submitDelete", (req, res) => {
    let numOfPostToDelete = parseInt(req.body["delete"]);
    //console.log(numOfPostToDelete);

    blogPosts.splice(numOfPostToDelete, 1);

    blogPosts.forEach((item, index) => {
        item.numberOfPost = index;
    });
    
    res.render("index.ejs", {blogPostsww: blogPosts});
    
  });

  app.post("/submitEdit", (req, res) => {
    blogPostToEdit = parseInt(req.body["edit"]);
    
    res.render("editBlogPost.ejs", {
      numOfBlogPostToEdit: blogPostToEdit
    });
    
  });

  app.post("/submitEditExsistingPost", (req, res) => {
    let dataa = {
      numberOfPost: blogPostToEdit,
      blogTitle : req.body["titleBlog"],
      blogerName : req.body["nameBloger"],
      content :  req.body["blogContent"]
    }

    blogPosts.forEach((item, index) => {
      if(item.numberOfPost === blogPostToEdit){
        console.log(blogPostToEdit);
        item.blogTitle = dataa.blogTitle;
        item.blogerName = dataa.blogerName;
        item.content = dataa.content;
      }
    });
    
    res.render("index.ejs", {blogPostsww: blogPosts});
  });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    
  });
  
//$(".btn-danger").click(() => {
//    console.log("delete this article!");
//});


