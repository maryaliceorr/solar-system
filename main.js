
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
        planetString += `<img class="planet-images hide child2" src="${planetArray[i].imageUrl}" alt"">`;
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
    imageAppear.classList.remove("hide");
}

const makeImageDisappear = (e) => {
    const imageDisappear = e.target.children[1];
    imageDisappear.classList.add("hide");
}


//---------MAKE BIG CARD EVENT------//


const makeBigCard = (e) => {
    if (e.target.classList.contains("parent")) {
     const bigCard = e.target.parentNode.innerHTML;
    } else if (e.target.classList.contains("child1")) {
    const bigCard = e.target.parentNode.children[0].innerHTML;
    } else {
    const bigCard = e.target.parentNode.children[1].innerHTML;
    }
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
             } else {
                 console.log("nope");
                }   
        }
    }
}



//-------BIG CARD STRING BUILDER----------//

const bigCardBuilder = (planetArray) => {
    let planetString = "";
    for (let i=0; i<planetArray.length; i++) {
        planetString += `<div class="planet-card parent">`;
        planetString += `<h2 class="planet-names child">${planetArray[i].name}</h2>`;
        planetString += `<img class="planet-images hide child" src="${planetArray[i].imageUrl}" alt"">`;
        planetString += `<p class="planet-descriptions hide child">${planetArray[i].description}</p>`;
        planetString += `<h3 class="planet-moon-amounts hide child"><strong>Number of Moons: </strong>${planetArray[i].numberOfMoons}</h3>`;
        planetString += `<h4 class="planet-largest-moon hide child"><strong>Largest Moon: </strong>${planetArray[i].nameOfLargestMoon}</h4>`;
        planetString += `</div>`
    }
    writeToDom(planetString, "big-card-holder");
}



startTheThing();



       