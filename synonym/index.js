const express = require('express');
const app = express();

const exec = require('child_process').exec;

// The one utility this program really needs
function query (word, callback) {
    exec("./get_syn " + word, function(error, stdout, stderr) {
        callback(stdout);
    });
}

// We use the Pug templating engine here
app.set('view engine', 'pug');
app.set('views', './pages');

// Expose our CSS files
app.use(express.static('./css'));

app.get('/', function(req, res) {
    res.render('home');
});

app.get('/:word', function(req, res) {
    word = req.params.word;
    query(word, function(synonyms) {
        res.render('result', {
            word: word,
            synonyms: synonyms
        });
    });
});

// Retrieve Synonyms for a word
app.get('/synonym/:word/find', function(req, res) {
    word = req.params.word;
    query(word, function(synonyms) {
        res.send(synonyms);
    });
});

const port = 3000;
app.listen(port, function() {
    console.log("Listening on port " + port);
});
