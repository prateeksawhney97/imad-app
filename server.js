var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
user: 'prateeksawhney97',
database: 'prateeksawhney97',
host: 'db.imad.hasura-app.io',
port: '5432',
password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));


var articles = {
'article-one': {
    title: 'Article One | Prateek Sawhney',
    heading : 'Article One',
    date: 'March 02, 2018',
    content:  `<p>
                Lorem ipsum dolor sit amet, dolor a dolor orci feugiat eu, duis praesent viverra, fusce vestibulum lorem. Vitae nonummyluctus turpis, dictum vel, commodo platea nunc amet, eget vefames pellentesque. Bibendum commodo eros pulvinar sed, rhoncus scelerisque malesuada. Pulvinar sed sed mollis dolor eros leo.
            </p>
            <p>
               Ipsum enim vestibulum torquent. Et ipsum mauris praesent, curabitur sed malesuada semper vestibulum et nunc. Sed sodales eros blandit vestibulum, sollicitudin ac arcu tempor a enim, ac et, placerat fusce luctus. Posuere eu a proin a, et dapibus fusce bibendum id, tortor tempus blandit wisi urna, lc vulputate. 
            </p>
            <p>
               Et consequat cras, at dapibus in lectus, fringilla scelerisque necipit sed aliquam eros interdum odio auctor, suscipit et. Mauris neque ut, in sed ultricies, elit veniam praesent rhoncuornare in, ullamcorper sem ut et, lacus at gravida. Optio mattis maecenas, ad pellentesque pulvinar eu ut phasellus lectus. Orci mi commodo volutpat wisi, nostra curabitur tincidunt mi eleifend, eu quam enim feugiat. 
            </p>`
},
'article-two': {
    title: 'Article Two | Prateek Sawhney',
    heading : 'Article Two',
    date: 'March 03, 2018',
    content:  `<p>
            This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.This is my second page.
            </p>`
},
'article-three': {
    title: 'Article Three | Prateek Sawhney',
    heading : 'Article Three',
    date: 'March 04, 2018',
    content:  `            <p>
            This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.This is my third page.
            </p>`
}
};

function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
var htmlTemplate =`
<html>
    <head>
        <title>
            ${title}
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="/ui/style.css" rel="stylesheet" />
        </head>
    <body>
        <div class="container">
        <div>
            <a href="/">Home</a>
        </div>
        <hr>
        <h3>
            ${heading}
        </h3>
            <div>
            ${date}
            </div>
        <div>
        ${content}
        </div>
        </div>
        </body>
</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function(req, res){
    //Make a select request.
        pool.query('SELECT * FROM test', function(err, result) {
        if (err) {
            res.status(500).send(err.toString());
        } else {
            res.send(JSON.stringify(result.rows));
        }
    });
    //Return a response with the results.
});

var counter = 0;
app.get('/counter', function(req, res){
   counter = counter + 1;
   res.send(counter.toString());
});
var names = [];
app.get('/submit-name', function(req, res) { //submit-name?name=xxxxx
    //Get the name from the request.
    var name = req.query.name;
    names.push(name);
    //JSON : Javascript Object Notation.
    res.send(JSON.stringify(names));
});

app.get('/articles/:articleName', function(req, res){
    // articleName == article-one
    // articles[articleName] = {} content object for article one
   //var articleName = req.params.articleName;
   
   pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function(err, result){
       if (err) {
           res.status(500).send(err.toString());
       } else {
           if (result.rows.length === 0) {
               res.status(404).send('Article Not Found');
           } else {
               var articleData = result.rows[0];
               res.send(createTemplate(articleData));
   
           }
       }
   });
    
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
