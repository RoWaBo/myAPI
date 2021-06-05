console.log('script loaded');

// ==== FETCH ====
const myApiCollection = ["animals", "foods", "accessories"]

async function fetchMyApi(myApiCollection) {
    const req = await fetch(`http://rowabo-myapi.herokuapp.com/api/v1/${myApiCollection}`)
    const res = await req.json()

    console.log(res);

    print(res.result)
}

function print(data) {
    const body =  document.querySelector('body')
    
    data.forEach(element => {
        for ( const [key, value] of Object.entries(element)) {
            body.innerHTML += `<p><span style="font-weight:bold">${key}</span> : ${value}</p> \n`     
        }    
    })
}

// fetchMyApi(myApiCollection[0])

// ==== FORM ====
const form = document.querySelector("#createAnimal");

let submitAnimal = e => {
    console.log("submit animal");
    e.preventDefault()

    const myFormData = new FormData();
    myFormData.append("type", e.target.type.value)
    myFormData.append("breed", e.target.breed.value)
    myFormData.append("name", e.target.name.value)
    myFormData.append("age", e.target.age.value)
    myFormData.append("sex", e.target.sex.value)
    myFormData.append("colors", e.target.colors.value)

    console.log(myFormData);
}

form.addEventListener("submit", submitAnimal)