// write your code here



document.addEventListener('DOMContentLoaded', () => {
const url = 'http://localhost:3000/ramens'
const ramBar = document.querySelector('#ramen-menu')
const ramDetail = document.querySelector('#ramen-detail')
const ramRating = document.querySelector('#ramen-rating')
let ramData 


function fetchRamen(){
    fetch(url)
    .then(response => response.json())
    .then(ramObj => renderAllRamen(ramObj))
}

function renderOneRamen(ramObj){
    // spam across top-bar

    const thisRamen = document.createElement('span')
    thisRamen.setAttribute('ramen-id', ramObj.id)
    
    const thisRamenImg = document.createElement('img')
    thisRamenImg.src = ramObj.image
    thisRamenImg.alt = ramObj.name
    thisRamenImg.classList = 'ramen-img'

    thisRamen.append(thisRamenImg)
    ramBar.append(thisRamen)
}

function renderAllRamen(ramObj){
    ramObj.forEach(ramens => {
        renderOneRamen(ramens)
    })
}

ramBar.addEventListener('click', ramView)

function ramView(event){

    const ramId = event.target.parentElement.getAttribute('ramen-id')
    const ramIdVal = parseInt(ramId)
    console.log(ramIdVal)

    fetch(`${url}/${ramIdVal}`)
        .then(response => response.json())
        .then(data => ramData = data)
        .then(ramData => renderRamInfo(ramData))
}

function renderRamInfo(ramObj){
    ramDetail.innerHTML = ""
    ramRating.innerHTML = ""
    const ramDiv = document.createElement('div')
    ramDiv.setAttribute('ramDiv-id', ramObj.id)

    ramDiv.innerHTML = `<img class="detail-image" src= "${ramObj.image}" alt="${ramObj.name}"/>
    <h2 class="name">${ramObj.name}</h2>
    <h3 class="restaurant">${ramObj.restaurant}</h3>`

    // deliverable 2 add existing rating and comment

    const div = document.createElement('div')
    div.setAttribute('div-id', ramObj.id) 
    
    div.innerHTML = `<label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value="${ramObj.rating}" />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramObj.comment}</textarea>
    <input type="submit" value="Update" />`

    ramRating.append(div) 
    ramDetail.append(ramDiv)
    
}

ramRating.addEventListener('submit', updateRamInfo)

function updateRamInfo(event){

    event.preventDefault();

    const ramen = event.target.firstChild
    const ramenId = ramen.getAttribute('div-id')
    const ramenIdVal = parseInt(ramenId)
    // console.log(ramenIdVal)

    // console.log(event.target.firstChild.element[0])

    const ramNumRating = event.target.firstChild.childNodes

    const ramNumRatingVal = ramNumRating[2].value

    const ramCommentVal = ramNumRating[6].textContent.value

    ramRating.rating.value = ramNumRatingVal

    // console.log(ramNumRatingVal)

    // create fetch 

    fetch(`${url}/${ramenIdVal}`)
        .then(response => response.json())
        .then(data => console.log(data))
}

// function editRamen(ramObj){
//     const 
// }




fetchRamen()

})