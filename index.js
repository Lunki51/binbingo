const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const data = require("./data.json")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/bingo",function (req,res){
    let html="<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />";
    html =+createTab("c++");
    html+="<form action='' method='post'><select name='test'><option value='c++'>c++</option><option value='c'>c</option><option value='reseau'>Réseau</option><option value='genie'>Génie</option></select><button>Générer</button></form>"
    res.send(html)
})

app.post("/bingo",function (req,res){
    let html="<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />";
    html+=createTab(req.body.test);
    html+="<form action='' method='post'><select name='test'><option value='c++'>c++</option><option value='c'>c</option><option value='reseau'>Réseau</option><option value='genie'>Génie</option></select><button>Générer</button></form>"
    res.send(html)
})


function createTab(way){
    let size = Object.keys(data[way]).length;
    let choosen = new Array();
    let number;
    let html = "<table>"
    for(let i=0;i<Math.sqrt(size);i++){
        html+="<tr>"
        for(let i=0;i<Math.sqrt(size);i++){
            do{
                number = Math.trunc(Math.random()*size);
            }while (choosen.includes(number))
            choosen.push(number)
            html+="<td><label class='switch'>"+data[way][number]+"<input type='checkbox'><span class=\"slider\"></span></label></td>"
        }
        html+="</tr>"
    }
    html+="</table>"
    return html;
}

app.listen(3000);