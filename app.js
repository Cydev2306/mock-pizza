// require the dependencies we installed
var app = require('express')();
var morgan = require('morgan');
var slow = require('./slow');

var headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    Authorization: `luc.cyril`,
};
var port = process.env.PORT || 3000;
var enableSlow = false
if(process.env.SLOW == "true"){
  enableSlow = true
}else enableSlow = false
app.use(morgan('dev'));
app.use(slow(enableSlow));
var orders =[{"id":1,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:01:55.387698613Z"},
        {"id":2,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:07:27.898098861Z"},
        {"id":3,"pizza":{"id":2,"name":"Regina","price":1240},"status":"finished","CreatedAt":"2016-10-19T12:07:31.380289161Z"},
        {"id":4,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:08:05.789792804Z"},
        {"id":5,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:21:54.873452553Z"},
        {"id":6,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:23:11.815170092Z"},
        {"id":7,"pizza":{"id":2,"name":"Regina","price":1240},"status":"finished","CreatedAt":"2016-10-19T12:40:13.51264093Z"},
        {"id":8,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T12:52:31.901825156Z"},
        {"id":9,"pizza":{"id":2,"name":"Regina","price":1240},"status":"finished","CreatedAt":"2016-10-19T12:56:27.138775787Z"},
        {"id":10,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T13:17:23.277712093Z"}]


app.get('/orders', function(req, res) {
  console.log("orders")
  res.send(orders);
});
app.get('/orders/:id', function(req, res) {
  console.log("orders")
  res.send(orders.filter(function(item){
    return item.id == req.params.id
  }));
});
//pizzas
app.get('/pizzas', function(req, res) {
  console.log("pizzas")
  value = [{"id":1,"name":"Margharita","price":1320},{"id":2,"name":"Regina","price":1240}];
  res.send(value);
});

var count = 10;

// POST REQUEST
app.post('/orders', function(req, res) {

  librato.increment('CreateOrder');
  res.status(200).json({"id":count++,"pizza":{"id":1,"name":"Margharita","price":1320},"status":"finished","CreatedAt":"2016-10-19T13:17:23.277712093Z"})
});


app.listen(port, function(){
  console.log('Server listening on port: ', port);
});
