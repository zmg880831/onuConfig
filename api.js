var http = require('http');
http.createServer(function(request,response){
    response.setHeader('Access-Control-Allow-Origin','*');
    var url = request.url.substring(2); //获取点位名称
    
    response.end();
    console.log('hello,anyone here?');


}).listen(8881);