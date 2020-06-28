const express=require('express');
const request=require('request');
const bodyParser=require('body-parser')
const app=express()

app.engine('ejs',require('ejs').__express);
app.set('view engine','ejs');
app.set('views','./views');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/views'));

app.get('/',(req,res)=>
{
  res.render('index',{title:'Covid19'});
});

app.post('/',(req,res)=>{
  var options = {
    method: 'GET',
    url: 'https://corona-virus-world-and-india-data.p.rapidapi.com/api_india?',
    headers: {
      'x-rapidapi-host': 'corona-virus-world-and-india-data.p.rapidapi.com',
      'x-rapidapi-key': 'f4c9f7aba1msh2670d70c69a0fc3p1c7e9cjsn0a43cacfc396',
      useQueryString: true
    }
  };

   request(options,function(err,respose,body){
     var data=JSON.parse(body);

  res.render('result',{title: req.body.city+' Cases', city: req.body.city+'('+req.body.state+')',
  total:data.state_wise[req.body.state].district[req.body.city].confirmed,
  active:data.state_wise[req.body.state].district[req.body.city].active,
  recover:data.state_wise[req.body.state].district[req.body.city].recovered,
  death:data.state_wise[req.body.state].district[req.body.city].deceased,
  todayp:data.state_wise[req.body.state].district[req.body.city].delta['confirmed'],
  todayn:data.state_wise[req.body.state].district[req.body.city].delta['recovered'],
  todayd:data.state_wise[req.body.state].district[req.body.city].delta['deceased']

  })


  });
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
