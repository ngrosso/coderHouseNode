//*Modules */
import express from 'express';
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import exphbs from "express-handlebars";
import path from "path";

const app = express();

//*[Middlewares]*//

//*Session *//

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 20000 }
}))

//*Templates*//
app.set('views', path.join(path.dirname(''), './views'));
app.engine('.hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  extname: '.hbs'
}))
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

let users = [];

//*Routes*//

app.get('/', (req, res) => {
  if(req.session.user){
  res.redirect('/login');
  }else{
    res.render('/register');
  }
})

app.get('/login', (req, res) => {
  res.render('login')
});

app.post('/login', (req, res) => {
  let {username, password} = req.body;
  if(users.find(user => user.username === username && user.password === password)){
    res.redirect('/ ');
  }else{
    res.redirect('/login');
  }
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  const { username, password,direccion } = req.body;
  const newUser = users.find(user => user.username == username);
  if(newUser){
    res.render('register-error');
  }else{
    users.push({
      username,
      password,
      direccion
    });
    res.redirect('/login');
  }
})

app.get('/datos',(req,res)=>{
  res.render('datos',{})
})





//*Server*//
const PORT = 4141;
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

server.on('error', error => {
  console.log(`Error en el servidor ${error}`);
})