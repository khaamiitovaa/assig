const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ejs = require('ejs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const blogPosts = [];

app.get('/', function(req, res) {
  res.render('index', { blogPosts });
});

app.get('/new-post', function(req, res) {
  res.render('new-post');
});

app.post('/create-post', function(req, res) {
  const { title, content } = req.body;
  if (title && content) { // Проверка наличия данных
    const newPost = {
      id: Date.now(),
      title,
      content,
      createdAt: new Date(),
    };
    blogPosts.push(newPost);
  }
  res.redirect('/');
});

app.get('/post/:id', function(req, res) {
  const postId = parseInt(req.params.id);
  const post = blogPosts.find((p) => p.id === postId);
  if (post) { 
    res.render('post', { post });
  } else {
    res.status(404).send('Post not found');
  }
});

app.listen(port, function() {
  console.log(`Server is running on port ${port}`);
});
