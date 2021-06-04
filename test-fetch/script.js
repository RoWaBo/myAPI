console.log('script loaded');

(async function fetchAnimals() {
    const req = await fetch("http://rowabo-myapi.herokuapp.com/api/v1/animals")
    const res = await req.json()
    console.log(res);
    document.querySelector('body').innerText = JSON.stringify(res)
})()
