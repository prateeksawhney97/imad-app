var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articleOne = {
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
app.get('/article-one', function(req, res){
   res.send(createTemplate(articleOne));
    
});

app.get('/article-two', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
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
