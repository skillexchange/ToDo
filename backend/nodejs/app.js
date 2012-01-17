var app=require('express').createServer();
/*path
 * /
 * status
 * add
 * updatejson
 * search
 * remove
 */

/*
 * init mongoose
 */
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/todo');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

var mySchema = new Schema({
  user: {type: String, default: 'firemen' }
  , title: {type: String, default: '' }
  , body:  {type: String, default: ''}
  , status:  {type: Number, default: 0}
  , date:  {type: Date, default: Date.now}
  , deadline: {type: Number, default: 0}
})
mongoose.model('Todo',mySchema);


app.get('/',function(req,res){
  res.send('Hi messy!');
});

app.get('/change/:id/:status',function(req,res){
  var Todo=mongoose.model('Todo');
  Todo.update({_id:req.params.id}, {status:req.params.status},{multi: true},function(err){
    if(!err) res.send('ok');
  });
});


app.get('/add/:user/:title/:body/:deadline',function(req,res){
  /*
   * make update query
   * alias for update
   */
  var Todo=mongoose.model('Todo');
  var todo=new Todo({user: req.params.user, title: req.params.title, user: req.params.user, body: req.params.body});
  todo.save(function(err){
    if(!err) res.send({"status":"ok"})
  });
});

app.get('/remove/:id',function(req,res){
  /*
   * connect mongo
   * mongo update request
   * check status
   * return ok or false
   */
  var Todo=mongoose.model('Todo');
  console.log('id:'+req.params.id);
  Todo.remove({_id:req.params.id},function(err){
    if(!err) res.send('ok');
  });
});

app.get('/search',function(req,res){
  /*
   * connect mongo
   * make mongo query 
   * do mongo query
   * return mongoquery results as json (res.json)
   */
  var body=new Array();
  var Todo=mongoose.model('Todo');
  Todo.find({},{},function(err,docs){
    if(!err){
      var size=docs.length;
      for(var i=0;i<size;i++){
       body.push(docs[i]);
      } 
      res.json(body);
    }
  });
});

app.listen(3000);
