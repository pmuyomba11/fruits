const express = require('express');
const fruits = require('./models/fruits')
const app = express();
const methodOverride = require('method-override')

app.use(express.urlencoded({extended:false}));
app.use(methodOverride("_method"));

// const vegetables = ['Carrots', 'Potatoes', 'Tomatoes', 'Cabbage'];


//index route
app.get('/fruits/', (req,res) => {
    res.render('index.ejs', {
        allFruits : fruits,
    })
})

//new route
app.get('/fruits/new', (req,res) => {
    res.render('new.ejs',{})
})

app.post('/fruits', (req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true
    }else{
        req.body.readyToEat = false
    }
    fruits.push(req.body)
    res.redirect('/fruits')
})

//delete route
app.delete('/fruits/:id', (req,res) => {
    fruits.splice(req.params.id, 1);
    res.redirect('/fruits')
})

//edit route
app.get('/fruits/:id/edit', (req,res) => {
    res.render('edit.ejs', {
        fruit : fruits[req.params.id],
        id : req.params.id
    })
})

//update route
app.put('/fruits/:id',(req,res) => {
    if(req.body.readyToEat === 'on'){
        req.body.readyToEat = true;
    }else{
        req.body.readyToEat = false;
    }
    fruits[req.params.id] = req.body;
    res.redirect('/fruits')
})

//show route
app.get('/fruits/:id', (req,res) => {
    res.render("show.ejs", {
        fruit : fruits[req.params.id]
    })
})






app.listen(3000, () => {
    console.log('Server is running on port 3000')
})