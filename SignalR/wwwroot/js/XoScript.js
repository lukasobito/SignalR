"use strict";

var connection =                                                                    //Préparation d'une variable réceptionnant notre HUB
    new signalR                                                                     //Appel de SignalR pour la création de l'objet du Hub
        .HubConnectionBuilder()                                                         //Appel du Builder pour préparation de l'objet du Hub
        .withUrl('/XoHub')                                                            //Assignation de infos nécessaire à la génération du Hub, ici c'est l'URL correspondant au endpoint défini dans le startup.cs
        .build(); 
var player = new Object();
player.isOk = false;
connection.start().then(function () {
    console.log("Connecté!");
    connection.invoke("AddPlayer").catch(function (err) { console.log(err.toString)});
}).catch(function (err) {
    console.error(err.toString());
})


var elements = document.getElementsByClassName("XoCase");
for (var i = 0; i < elements.length; i++) {
    elements[i].addEventListener('click', test);
}
function test() {
    console.log("click");

    connection.invoke("SendCase", player.sign, this.id)
        .catch(function (err) {
            console.error(err.toString());                                        
        });

    this.innerHTML = player.sign;
    this.removeEventListener('click',test);
    this.classList.remove("pointer");
}

connection.on("ReceivePlayer", function (p) {
    if (!player.isOk) {
        player.sign = p;
        player.isOk = true;
        if (player.sign == "O") {
            document.getElementsByClassName("XoCase").classList.remove("pointer");
        }
    }
    console.log("player = " + player.sign);
});

connection.on("ReceiveCase", function (user, c) {
    document.getElementById(c).innerHTML = user;
    document.getElementById(c).removeEventListener('click', test);
    document.getElementById(c).classList.remove("pointer");

})

function verify() {
    
}