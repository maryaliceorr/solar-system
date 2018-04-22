
//----------WRITE TO DOM FUNCTION -------//

const writeToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
};

//----------FIRST PLANET CARDBUILDER------//

const planetCardBuilder = (planetArray) => {
        let planetString = "";
    for (let i=0; i<planetArray.length; i++) {
        planetString += `<div class="planet-card parent">`;
        planetString += `<h2 class="planet-names child1">${planetArray[i].name}</h2>`;
        planetString += `<img id="${planetArray[i].name}" class="planet-images hide child2" src="${planetArray[i].imageUrl}" alt"">`;
        planetString += `</div>`
    }
    writeToDom(planetString, "planet-card-holder");
};
 

//----------ORIGINAL XHR CALL------------//

function xhrCall () {
   const data = JSON.parse(this.responseText);
   planetCardBuilder(data.planets);
   eventListener()
};


//------------
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


//---------event listeners--------//

const eventListener = () => {
    const planetImages = document.getElementsByClassName("planet-card");
        for (let j=0; j<planetImages.length; j++) {
            planetImages[j].addEventListener("mouseenter", makeImageAppear);
            planetImages[j].addEventListener("mouseleave", makeImageDisappear);
            planetImages[j].addEventListener("click", makeBigCard); 
        }
    }

const makeImageAppear = (e) => {
    const imageAppear = e.target.children[1];
    const nameDisappear = e.target.children[0];
    imageAppear.classList.remove("hide");
    nameDisappear.classList.add("hide");
}

const makeImageDisappear = (e) => {
    const imageDisappear = e.target.children[1];
    const nameAppear = e.target.children[0];
    imageDisappear.classList.add("hide");
    nameAppear.classList.remove("hide");
}


//---------MAKE BIG CARD EVENT------//


const makeBigCard = (e) => {
    let bigCard = e.target.id
    let request = new XMLHttpRequest();
    request.addEventListener("load", newXhrCall);
    request.addEventListener("error", doesNotWork);
    request.open("GET", "planets.json");
    request.send();

    function newXhrCall () {
        const data = JSON.parse(this.responseText).planets;
        for (let k=0; k<data.length; k++) {
            if (data[k].name === bigCard) {
                bigCardBuilder(data[k]);
                }      
        }
    }
}



//-------BIG CARD STRING BUILDER----------//

const bigCardBuilder = (planetObject) => {
    let planetString = "";
        planetString += `<div class="big-card">`;
        planetString += `<h3 id="close-x">X</h3>`;
        planetString += `<h2 class="planet-names child">${planetObject.name}</h2>`;
        planetString += `<img class="planet-images child" src="${planetObject.imageUrl}" alt"">`;
        planetString += `<p class="planet-descriptions child">${planetObject.description}</p>`;
        planetString += `<h3 class="planet-moon-amounts child"><strong>Number of Moons: </strong>${planetObject.numberOfMoons}</h3>`;
        planetString += `<h4 class="planet-largest-moon child"><strong>Largest Moon: </strong>${planetObject.nameOfLargestMoon}</h4>`;
        planetString += `</div>`

    writeToDom(planetString, "planet-card-holder");

    const buttonClass = document.getElementById("close-x").addEventListener("click", startOver);
}

const startOver = () => {
    startTheThing();
}


//---------SEARCH BAR-------------//

const getSearchBarInput = () => {
    const searchBarInput = document.getElementById("search").value;
    findPlanets(searchBarInput);
    }
   

const searchBarClick = () => {
    const searchBarButton = document.getElementById("search-button");
    searchBarButton.addEventListener("click", getSearchBarInput);
}

searchBarClick();

const findPlanets = (input) => {
    let request = new XMLHttpRequest();
    request.addEventListener("load", lastXhrCallIPromise);
    request.addEventListener("error", doesNotWork);
    request.open("GET", "planets.json");
    request.send();

    function lastXhrCallIPromise () {
        const data = JSON.parse(this.responseText).planets;
        let newPlanetArray = [];
        for (let l=0; l<data.length; l++) {
            if (data[l].name.includes(input)) {
                newPlanetArray.push(data[l]);
            } else if (data[l].description.includes(input)) {
                newPlanetArray.push(data[l]);
            }                       
        }
        planetCardBuilder(newPlanetArray);
    }
}


startTheThing();


       