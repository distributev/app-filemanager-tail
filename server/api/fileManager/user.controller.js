var fs = require('fs');

module.exports={
	setup:function(app){
    app.post('/user/login',this.login);
    app.put('/user/theme',this.updateTheme);
  },
  login:function(req,res){
     var username = req.body.username;
     var password = req.body.password;

     fs.readFile('./test/'+username+'.txt', 'utf8', function (err,data) {
          if (err) {
            console.log(err)
              res.status(500).send('Authorize failure');
          }else{
            var userinfo = data.split(",");
            if(userinfo[1] !== password){
              res.status(401).send('Authorize failure');
            }else{
              var user = {username:userinfo[0],password:userinfo[1],"theme":userinfo[2]};
              res.send({user:user});
            }
          }
          
        });
  },
  updateTheme:function(req,res){
     var data = req.body.data;
     var username = req.body.username;
     fs.writeFile('./test/'+username+'.txt', data, function (err) {
        if (err) throw err;
        else res.send({"result":"ok"});
     }); 
  }
}


