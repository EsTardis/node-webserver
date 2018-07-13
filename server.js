const express = require('express');
const hbs =require('hbs');
const fs=require('fs'); // dosyaya yazmak için

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname+'/views/partials');// partial kısımlar için
app.set('view engine','hbs');           //home about tuşları

//middleware eklemek!
app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n',(err)=>{
        if(err){
            console.log('Unable to append to server.log')
        }
    });
    next();
});


// app.use((req,res,next)=>{//tüm sayfaları bakım için kapamak! fakat üstteki app.use ları etkilemiyor!
//     res.render('maintanance.hbs',{
//         pageTitle:`We'll be right back`,
//         // currentYear:new Date().getFullYear(),
//         welcomeMessage:'Wait'
//     });
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{//dynamic data için ,
    return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});//inputlu func!

app.get('/',(req,res)=>{
    //res.send('<h1>hi!<h/1>');
    //res.send('hi!!!!!');
    // res.send({
    //     name: 'ES',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });
    res.render('home.hbs',{
        pageTitle:'Home Page',
       // currentYear:new Date().getFullYear(),
        welcomeMessage:'Hi'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        //currentYear:new Date().getFullYear()

    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Portfolio Page',
        //currentYear:new Date().getFullYear()

    });
});

app.get('/bad',(req,res)=>{
    res.send({
        BAD:'Request',
        errorMessage: 'Unable to handle that request'
    });
});

app.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});
//server local

// 1 git status 2 git add . 3 git status  4  git commit -m "asdasd" 5 git push 6 git push heroku  7 heroku open