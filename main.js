
const writeToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
};

const planetCardBuilder = (planetArray) => {
        let planetString = "";
    for (let i=0; i<planetArray.length; i++) {
        planetString += `<div class="planet-card">`;
        planetString += `<h2>${planetArray[i].name}</h2>`;
        planetString += `</div>`;
    }
    writeToDom(planetString, "planet-card-holder");
};


function xhrCall () {
   const data = JSON.parse(this.responseText);
   planetCardBuilder(data.planets);
};

function doesNotWork() {
    console.log("you failed at life");
};

const startTheThing = () => {
    let request = new XMLHttpRequest();
    request.addEventListener("load", xhrCall);
    request.addEventListener("error", doesNotWork);
    request.open("GET", "planets.json");
    request.send();
}

startTheThing();

// name, imageURL, description, isGasPlanet, numberOfMoons, nameOfLargestMoon