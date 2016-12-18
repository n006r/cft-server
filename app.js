var express = require('express');
var session = require('express-session');
var pug = require('pug');
var app = express();

app.use(session({ secret: 'keyboard cat'}));
app.set('view engine', 'pug')

app.get('/', function (req, res) {

    res.render('mainPage', { 'stringsWithNumbers': 0, 'nonumberStrings': 0 });
});

app.get('/submitstring', function (req, res) {

    var sess = req.session;

    if(!sess.stringsWithNumbers)
        sess.stringsWithNumbers= 0;
    if(!sess.nonumberStrings)
        sess.nonumberStrings = 0;

    if (req.query.userinput){
        if (/\d/.test(req.query.userinput)){
            //Строка содержит хот бы одну цифру
            sess.stringsWithNumbers++;
        }else {
            //В строке нет ни одной цифры
            sess.nonumberStrings++;
        }
    }

    res.render('statContainer', { 'stringsWithNumbers': sess.stringsWithNumbers, 'nonumberStrings': sess.nonumberStrings });

});

app.get('/flushsession', function (req, res) {
    req.session.destroy();
    res.send();
});

var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Приложение запущено и работает на http://localhost:3000');
});

