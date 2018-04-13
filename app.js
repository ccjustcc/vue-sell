var express = require('express');
        app = express();
var appData = require('./data.json');
var apiRouters = express.Router();
var goods = appData.goods;
var seller = appData.seller
var ratings = appData.ratings
app.get('/api/goods', function (req, res) {
    res.json({
        code:0,
        data:goods
      })
});
app.get('/api/seller', function (req, res) {
    res.json({
        code:0,
        data:seller
      })
});
app.get('/api/ratings',function(req,res){
    res.json({
        code:0,
        data:ratings
      })
})
var config = {
    host:'192.168.1.62',
    port: 1000
};
app.use(express.static(__dirname+'/dist'));
console.log(__dirname+'dist')
app.listen(config.port,'192.168.1.62')
console.log('app run in'+config.host+':'+config.port)