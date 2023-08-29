const singlePersonDiv = document.getElementById("singlePerson")
const allPeopleDiv = document.getElementById("allPeople")

const state = {
    singlePerson: null,
    allPeople: []
}

window.addEventListener("hashchange", selectPerson);

function selectPerson() {
    console.log("hashevent")
    getEventFromHash();
    renderPersonDetails();

}

function getEventFromHash() {
    // We need to slice the # off
    let name = window.location.hash.slice(1);
    if (name.includes("%20")) {
        name = name.replaceAll("%20", " ")

        console.log("eventhash ", name)
    }

    state.singlePerson = state.allPeople.find((person) => {

        return person.name === name
    })
    console.log("state ==> ", state)
}

function renderPersonDetails() {
    if (state.singlePerson) {
        renderSinglePerson()
    }
}


const getAllPeople = async () => {
    const getPeople = await fetch("https://swapi.dev/api/people")
    const peopleData = await getPeople.json()
    console.log(peopleData)
    state.allPeople = peopleData.results


}

const renderAllPeople = () => {
    const people = state.allPeople.map((person) => {
        return `
            <div><a href="#${person.name}"> ${person.name} </a></div>
        `
    })
    allPeopleDiv.innerHTML = people.join('')
}


const renderSinglePerson = async () => {
    const singlePerson = await fetch(state.singlePerson.url)
    const personData = await singlePerson.json()
    console.log(personData)
    singlePersonDiv.innerHTML = `
        <div> ${personData.name} </div>
    `



}



async function render() {
    await getAllPeople()
    renderAllPeople()
    selectPerson()
}

render()