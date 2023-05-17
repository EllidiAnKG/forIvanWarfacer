const express = require("express")
const bodyParser = require ("body-parser")

const sqlite3 = require('sqlite3')
const{open} =require('sqlite')

const app = express()
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

open({
    filename: "./db/TESTABOB.db",
    driver: sqlite3.Database
}).then((db)=>{
    app.get('/people', async(req, res)=>{
        const people = await db.all("SELECT * FROM People")
        res.json(people)
    })
    app.get('/team', async(req, res)=>{
        const people = await db.all("SELECT * FROM Team")
        res.json(people)
    })
    app.get('/people/lk', async(req, res)=>{
        const people = await db.all("SELECT * FROM LK")
        res.json(people)
    })



//.............................

app.post('/register', (req, res) => {
    const { nickname, email, password } = req.body;
  
    // Проверяем, что все поля заполнены
    if (!nickname || !email || !password) {
      return res.status(400).json({ message: 'Не все поля заполнены' });
    }
  
    // Проверяем, что пользователь с таким email не существует
    db.get('SELECT * FROM People WHERE email = ?', [email], (err, row) => {
      if (row) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
  
      // Добавляем пользователя в базу данных
      db.run('INSERT INTO People (nickname, email, password) VALUES (?, ?, ?)', [nickname, email, password], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Ошибка при добавлении пользователя в базу данных' });
        }
  
        // Возвращаем данные пользователя
        db.get('SELECT * FROM People WHERE email = ?', [email], (err, row) => {
          if (err) {
            return res.status(500).json({ message: 'Ошибка при получении данных пользователя из базы данных' });
          }
  
          const { id,nickname, email } = row;
          return res.json({ id, nickname, email });
        });
      });
    });
  });
  
//.............................
    app.listen(3000,()=>{
        console.log("rabotaet"+3000)
    })
})




// expres nodemon sqlite sqlite3 установить