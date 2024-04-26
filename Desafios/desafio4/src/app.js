import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';

const app = express();
const PORT = 8080;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname+ '/public'))

app.get('/', (req,res)=>{
    let user ={
        nombre : "coder",
        edad : 25
    }
    res.render('index', user)
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});