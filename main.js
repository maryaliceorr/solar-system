
const writeToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
};

const planetCardBuilder = (planetArray) => {
        let planetString = "";
    for (let i=0; i<planetArray.length; i++) {
        planetString += `<div class="planet-card">`;
        planetString += `<h2 class="planet-names">${planetArray[i].name}</h2>`;
        planetString += `<img class="planet-images hide" src="${planetArray[i].imageUrl}" alt"">`;
        planetString += `</div>`;
    }
    writeToDom(planetString, "planet-card-holder");
};
 

function xhrCall () {
   const data = JSON.parse(this.responseText);
   planetCardBuilder(data.planets);
   nameDisappearListener();
   imageAppearListener();
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


//---------mouse over event listeners--------//

const nameDisappearListener = () => {
const planetImages = document.getElementsByClassName("planet-card");
    for (let j=0; j<planetImages.length; j++) {
        planetImages[j].addEventListener("mouseenter", makeNameAppear);
        planetImages[j].addEventListener("mouseleave", makeNameDisappear);
    }
}

const imageAppearListener = () => {
    const planetImages = document.getElementsByClassName("planet-card");
        for (let k=0; k<planetImages.length; k++) {
            planetImages[k].addEventListener("mouseenter", makeImageAppear);
            planetImages[k].addEventListener("mouseleave", makeImageDisappear);
        }
    }

//---------make appearance functions------//

const makeNameAppear = (e) => {
    const nameAppear = e.target.children[0];
    nameAppear.classList.add("hide");
}

const makeNameDisappear = (e) => {
    const nameDisappear = e.target.children[0];
    nameDisappear.classList.remove("hide");
}

const makeImageAppear = (e) => {
    const imageAppear = e.target.children[1];
    imageAppear.classList.remove("hide");
}

const makeImageDisappear = (e) => {
    const imageDisappear = e.target.children[1];
    imageDisappear.classList.add("hide");
}


startTheThing();



