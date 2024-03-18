const express = require("express");
const app = express();

const port = 3005;

//motor de plantillas
app.set("view engine", "ejs");
//ruta donde donde voy a usar los views
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index", { titulo: "¡Hola mundo!" });
});

app.get("/about", (req, res) => {
  res.render("about", { 
    titulo: "Soy Desarrolladora Back end en Java",
    descripcion: "Com"
   })
})

app.get('/contact', (req, res) => {
  res.render("contact", { titulo: "este es mi contacto" })
})

app.listen(port, () => {
  console.log("servidor a su servicio de puerto", port)
})
