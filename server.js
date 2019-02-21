var fs = require ("fs");
var colors = require ("colors");
var express = require('express');

//creo mi servidor:
var app = express();

//configuro el server para que parsee el body de las peticiones post
app.use(express.json())
app.use(express.urlencoded())


app.get("/products", function(req, res){
  fs.readFile("productos.json",function(error, respuesta){
    var productos  = JSON.parse(respuesta);
    return res.send(productos);
    console.log(productos);
  })
});

app.get("/products/:ID", function(req, res){
  fs.readFile("productos.json",function(error, respuesta){
    var productos  = JSON.parse(respuesta);
    for (var i=0; i<productos.length; i++){
      if (productos[i].productID == req.params.ID) {
        return res.send(productos[i]);
      }
    }
  });
});

app.post("/products/:ID", function(req, res){
  fs.readFile("productos.json",function(error, respuesta){
    var productos  = JSON.parse(respuesta);
    var idProducto = req.params.ID;
    var existe = false;

    for (var i=0; i<productos.length; i++){
        if (productos[i].productID == idProducto) {
          existe = true;
          break;
        }
    }

    if (existe){
      return res.send("ese producto ya existe, no se ha agregado nada.");
    }
    else {
      var nuevoProducto = req.body;
      productos.push(nuevoProducto);
      return res.send("el producto fue añadido");
    }
  });
});

app.listen(8000, function(){
  console.log('Server is listening in port 8000')
})
