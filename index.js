import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

let posts = [];
function createTitle(content){
  return content.split("\n")[0]||"Untitled Post";
}

app.get("/", (req, res) => {
  res.render("index", { posts: posts })
});

app.get("/posts/:id", (req,res) =>{
  const postID = req.params.id;;
  const post = posts.find(p=>p.id==postID);
  if(post){
     res.render("post.ejs",{post:post})
  }
  else{
    res.status(404).send("Post not found",);

  }
}
);

app.post("/submit", (req, res) => {
    const content = req.body.content;  
    const title = createTitle(content);
    
    const id = posts.length;
    const post = {id,title,content};
    posts.push(post);
    
    res.redirect('/');
});

app.post("/posts/:id/delete", (req, res) => {
  const postID = req.params.id;
  posts = posts.filter(p => p.id != postID);
  res.redirect('/');
});


  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

