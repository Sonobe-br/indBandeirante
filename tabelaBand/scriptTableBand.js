let dados = ["Daniel", "João Roberto", "Juan", "John", "Marin"];

let tbody = document.getElementById ("tbody");

for (i = 0; i < dados.length; i++) {
    
    let tr = "<tr>" + 
    "<td>" + dados[i][0] + "</td>" +
    "<td>" + dados[i][1] + "</td>" +
    "<td>" + dados[i][2] + "</td>" +
    "<td>" + dados[i][3] + "</td>" +
    "</tr>"; 

    tbody.innerHTML += tr;

}

let tr = tbody.childNodes;
console.log(tr);

document.getElementById("txtBusca").addEventListener("keyup", function() {

    let buscar = document.getElementById ("txtBusca").value.toLowerCase();
    console.clear();

    for (let i = 0; i < tbody.length; i++) {
        
        let achou = false;
        let tr = tbody.childNodes[i];
        let td = tr.childNodes;
    
        for (let k = 0; k < td.length; k++) {
            let value = td[k].childNodes[0].nodeValue.toLowerCase();
            console.log(value);

            if (value.indexOf(buscar) >= 0) {

                achou = true;
            }

        }

        if (achou) {

            tr.style.display = "table-row";

        } else {

            tr.style.display = "none";
        }

    }

});