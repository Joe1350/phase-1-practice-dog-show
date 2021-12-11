// document.addEventListener('DOMContentLoaded', () => {
    
// })

    // url
const dogsURL = 'http://localhost:3000/dogs'

    // helpers
const create = el => document.createElement(el)
const select = el => document.querySelector(el)

    // grab stuff
const tableBody = select('#table-body')
const form = select('#dog-form')
const inputName = select('#name')
const inputBreed = select('#breed')
const inputSex = select('#sex')
const inputID = select('#id')

    // create dog image
const jumpDogPicture = create('img')
    // assign picture attributes
jumpDogPicture.src = '../assets/dog-show.jpg'
jumpDogPicture.style.marginTop = "500px"
jumpDogPicture.style.marginLeft = "10%"
jumpDogPicture.style.width = "80%"
    // append dog image
select('#picture').append(jumpDogPicture)

    // render function
function renderOneDog(dog) {
        // make stuff
    const tableRow = create('tr')
    const tableDataName = create('td')
    const tableDataBreed = create('td')
    const tableDataSex = create('td')
    const tableDataEdit = create('td')
    const editButton = create('button')

        // assign attributes
    tableDataName.innerText = dog.name
    tableDataBreed.innerText = dog.breed
    tableDataSex.innerText = dog.sex
    editButton.innerText = 'Edit Dog'

        //addEventListeners
    editButton.addEventListener('click', () => {
        inputName.value = dog.name
        inputBreed.value = dog.breed
        inputSex.value = dog.sex
        inputID.value = dog.id
    })
    

        // append stuff
    tableDataEdit.append(editButton)
    tableRow.append(tableDataName, tableDataBreed, tableDataSex, tableDataEdit)
    tableBody.append(tableRow)
}

    // addEventListener
form.addEventListener('submit', handleSubmit)

    // callback
function handleSubmit(e) {
    e.preventDefault()

    let dogObj = {
        id: e.target[0].value,
        name: e.target[1].value,
        breed: e.target[2].value,
        sex: e.target[3].value
    }
        // renderOneDog(dogObj)
    updateDog(dogObj) //console unhappy
}

    // crud
function getAllDogs() {
    fetch(dogsURL)
        .then(r => r.json())
        .then(dogs => dogs.forEach(dog => renderOneDog(dog)))
}

function updateDog(dog) {
    fetch(`http://localhost:3000/dogs/${dog.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dog)
    })
    .then(r => r.json())
    .then(dog => dog)
    .then(() => {
        tableBody.innerText = '';
        getAllDogs()
    })
}

// initialize
getAllDogs();