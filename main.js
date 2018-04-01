
const writeToDom = (string, id) => {
    document.getElementById(id).innerHTML = string;
};

const planetCardBuilder = (planetArray) => {
        let planetString = "";
    for (let i=0; i<planetArray.length; i++) {
        planetString += `<div class="planet-card">`;
        planetString += `<h2 class="planet-names">${planetArray[i].name}</h2>`;
        planetString += `<img class="planet-images hide" src="${planetArray[i].imageUrl}" alt"">`;
        planetString += `<p class="planet-descriptions hide">${planetArray[i].description}</p>`;
        planetString += `<h3 class="planet-moon-amounts hide"><strong>Number of Moons: </strong>${planetArray[i].numberOfMoons}</h3>`;
        planetString += `<h4 class="planet-largest-moon hide"><strong>Largest Moon: </strong>${planetArray[i].nameOfLargestMoon}</h4>`;
        planetString += `</div>`
    }
    writeToDom(planetString, "planet-card-holder");
};
 

function xhrCall () {
   const data = JSON.parse(this.responseText);
   planetCardBuilder(data.planets);
   nameDisappearListener();
   imageAppearListener()
//    clickListener();
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


//---------event listeners--------//

const nameDisappearListener = () => {
const planetImages = document.getElementsByClassName("planet-card");
    for (let i=0; i<planetImages.length; i++) {
        planetImages[i].addEventListener("mouseenter", makeNameAppear);
        planetImages[i].addEventListener("mouseleave", makeNameDisappear);
    }
}

const imageAppearListener = () => {
    const planetImages = document.getElementsByClassName("planet-card");
        for (let j=0; j<planetImages.length; j++) {
            planetImages[j].addEventListener("mouseenter", makeImageAppear);
            planetImages[j].addEventListener("mouseleave", makeImageDisappear);
        }
    }

    // const clickListener = () => {
    //     const planetImages = document.getElementsByClassName("planet-card");
    //         for (let k=0; k<planetImages.length; k++) {
    //             planetImages[k].addEventListener("click", makeInfoAppear);
    //         }
    //     }
    

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

// const makeInfoAppear = (e) => {
//     const infoAppear = e.target.children[2];
//     infoAppear.classList.remove("hide");
// }

//----------------------//

const clickListener = () => {
        const planetImages = document.getElementsByClassName("planet-card");
            for (let k=0; k<planetImages.length; k++) {
                planetImages[k].addEventListener("click", makeInfoAppear);
            }
        }


startTheThing();



       