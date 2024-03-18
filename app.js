const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const app = express();

const port = 3010;

//motor de plantillas
app.set("view engine", "ejs");
//ruta donde donde voy a usar los views
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index", { titulo: "¡Hola mundo!" });
});

app.get("/about", (req, res) => {
  res.render("about", {
    titulo: "Soy Desarrolladora Back end en Java"
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", { titulo: "este es mi contacto" });
});

//  configurado el middleware para parsear el cuerpo de la solicitud a Express.
app.use(bodyParser.urlencoded({ extended: true }));

// Manejar la solicitud POST del formulario de contacto
app.post("/contact", (req, res) => {
  const nombre = req.body.nombre;
  const apellido = req.body.apellido;
  const email = req.body.email;
  const mensaje = req.body.mensaje;


  console.log("Nombre:", nombre);
  console.log("Apellido:", apellido);
  console.log("Email:", email);
  console.log("Mensaje:", mensaje);

  res.send("¡Gracias por tu mensaje!");
});

//manejo de subida de archivos usando el Middleware de Muler 

app.get("/upload", (req, res) => {
  res.render("upload"); 
});

const storage = multer.diskStorage({
  // Directorio donde se guardarán los archivos subidos
  destination: function (req, file, cb) {
    cb(null, "upload/");
  },
  // Nombre del archivo almacenado en el servidor
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("archivo"), (req, res) => {
  console.log(req.file);
  res.send("Archivo subido exitosamente");
});

//iniciar un servidor
app.listen(port, () => {
  console.log("Servidor en el puerto: ", port);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocurrió un error en el servidor");
});