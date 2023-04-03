const http = require('http');
const port = 3000;
const { homePage, catTemplate } = require('./view/homePage');
const css = require('./content/styles/site');
const addCatPage = require('./view/addCatPage');
const addBreedPage = require('./view/addBreedPage');
const cats = require('./dataBase.json');
const editPage = require('./view/editPage');

const server = http.createServer((req, res) => {
    if (req.url == '/content/styles/site.css') {
        res.writeHead(200, {
            "Content-Type": "text/css"
        });
        res.write(css);
        res.end();
    } else if (req.url == '/cats/add-cat') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addCatPage);
        res.end();
    } else if (req.url == '/cats/add-breed') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(addBreedPage);
        res.end();
    } else if (req.url == '/edit') {

        const cat = cats[0];
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.write(editPage(cat, onSubmit));

        function onSubmit(e) {
            e.preventDefault();
console.log('submit');
        }
        res.end();
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        const homePageResult = homePage.replace("{{cat}}", cats.map(el => catTemplate(el)).join(''));
        console.log(homePageResult);
        res.write(homePageResult);
        res.end();
    }


})


server.listen(port, () => console.log(`The server is listen for requests on port ${port} ...`));