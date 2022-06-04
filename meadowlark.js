var express = require('express');
var app = express();

var app = express();
// Установка механизма представления handlebars
var fortunes = [
    "Победи свои страхи, или они победят тебя.",
    "Рекам нужны истоки.",
    "Не бойся неведомого.",
    "Тебя ждет приятный сюрприз.",
    "Будь проще везде, где только можно.",
    ];
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);
// промежуточное по
app.use(express.static(__dirname + '/public'));
// маршруты 
app.get('/', function(req, res) {
    var randomFortune =fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
    });

app.get('/about', function(req, res) {
    res.render('about');
    });

    // Обобщенный обработчик 404 (промежуточное ПО)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
    });

    // Обработчик ошибки 500 (промежуточное ПО)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
    });

app.listen(app.get('port'), function(){
   console.log( 'Express запущен на http://localhost:' +
       app.get('port') + '; нажмите Ctrl+C для завершения.' );
});