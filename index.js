const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const data = require("./data.json")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/",function (req,res){
    res.send(
        "<link rel='stylesheet' type='text/css' href='style.css' />" +
        "<label>Choissisez un cours pour générer un bingo</label>"+
        "<form action='' method='post'>" +
        "   <select name='test'>" +
        "       <option value='c++' selected='"+(req.body.test=="c++"?"selected":"")+"'>c++</option>" +
        "       <option value='c'>c</option>" +
        "       <option value='reseau'>Réseau</option>" +
        "       <option value='genie'>Génie</option>" +
        "   </select>" +
        "   <button>Générer</button>" +
        "   </form>"
    )
})

app.post("/",function (req,res){
    if(req.body.test){
        res.send(
            "<link rel='stylesheet' type='text/css' href='style.css' />" +
            createTab(req.body.test)+
            "<form action='' method='post'>" +
            "   <select name='test'>" +
            "       <option value='c++' "+(req.body.test=="c++"?"selected":"")+">c++</option>" +
            "       <option value='c' "+(req.body.test=="c"?"selected":"")+">c</option>" +
            "       <option value='reseau' "+(req.body.test=="reseau"?"selected":"")+">Réseau</option>" +
            "       <option value='genie' "+(req.body.test=="genie"?"selected":"")+">Génie</option>" +
            "   </select>" +
            "   <button>Générer</button>" +
            "   </form>"
        )
    }

})

app.post("/result",function (req,res){
    let bingo = false;
    if(bingo){
        res.send("BINGO");
    }else{
        res.end()}
    console.log("Clicked")
})


function createTab(way){
    let size = Object.keys(data[way]).length;
    let choosen = new Array();
    let number;
    let html = "<form action='/result' method='post' id='myForm'><table>"
    for(let i=0;i<Math.sqrt(size);i++){
        html+="<tr>"
        for(let i=0;i<Math.sqrt(size);i++){
            do{
                number = Math.trunc(Math.random()*size);
            }while (choosen.includes(number))
            choosen.push(number)
            html+=
                "<td>" +
                "   <label class='switch'>" +
                "       "+data[way][number]+
                "           <input  class='submit' type='checkbox'>" +
                "       <span class=\"slider\"></span>" +
                "   </label><" +
                "/td>"

        }
        html+="</tr>"
    }
    html+="</table></form>"+
        "<script type='text/javascript'>" +
        "   const form = document.getElementById('myForm');" +
        "   document.querySelector('.submit').addEventListener('click',function(event){" +
        //"       form.submit();" +
        "   })" +
        "</script>"
    return html;
}

app.listen(8000);