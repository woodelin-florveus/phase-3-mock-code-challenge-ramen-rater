// write your code here



document.addEventListener('DOMContentLoaded', () => {
const url = 'http://localhost:3000/ramens'
const ramBar = document.querySelector('#ramen-menu')
const ramDetail = document.querySelector('#ramen-detail')
ramDetail.innerHTML = ""
const form = document.querySelector('#ramen-rating')
let ramData 


function fetchRamen(){
    fetch(url)
    .then(response => response.json())
    .then(ramObj => renderAllRamen(ramObj))
}

function renderOneRamen(ramObj){
    // spam across top-bar

    const thisRamen = document.createElement('span')
    thisRamen.setAttribute('data-ramen-id', ramObj.id)
    
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

    const ramId = event.target.parentElement.getAttribute('data-ramen-id')
    const ramIdVal = parseInt(ramId)
    console.log(ramIdVal)

    fetch(`${url}/${ramIdVal}`)
        .then(response => response.json())
        .then(data => ramData = data)
        .then(ramData => renderRamInfo(ramData))
}

function renderRamInfo(ramObj){
    ramDetail.innerHTML = ""
    form.innerHTML = ""
    // const ramDiv = document.createElement('div')
    // ramDiv.setAttribute('data-ramDiv-id', ramObj.id)

    ramDetail.innerHTML = `<img class="detail-image" src= "${ramObj.image}" alt="${ramObj.name}"/>
    <h2 class="name">${ramObj.name}</h2>
    <h3 class="restaurant">${ramObj.restaurant}</h3>`

    // deliverable 2 add existing rating and comment

    // const div = document.createElement('div')
    // div.setAttribute('data-div-id', ramObj.id) 
    form.setAttribute('data-id', ramObj.id)
    form.innerHTML = `<label for="rating">Rating: </label>
    <input type="text" name="rating" id="rating" value="${ramObj.rating}" />
    <label for="comment">Comment: </label>
    <textarea name="comment" id="comment">${ramObj.comment}</textarea>
    <input type="submit" value="Update" />`

    // ramRating.append(div) 
    // ramDetail
}
//const form = document.getElementById('ramen-rating')
console.log(form)
form.addEventListener('submit', updateRamInfo)

function updateRamInfo(event){
    event.preventDefault();
    console.log(event.target.dataset.id)
    const ramen = event.target.dataset.id

     const rating = event.target.rating.value
     const comment = event.target.comment.value
    console.log(comment, rating)

    const updatedRamen = {rating, comment}
    // newUpdate(ramen, updatedRamen)
    
    // function newUpdate(obj, updatedRamen){
        fetch(`${url}/${ramen}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json", 
                Accept: "application/json",
            },
            body: JSON.stringify(updatedRamen)
        })
            .then(response => response.json())
            .then(data => console.log(data))
    
    }



    // const ramenId = ramen.getAttribute('div-id')
    // const ramenIdVal = parseInt(ramenId)
    // // console.log(ramenIdVal)

    // // console.log(event.target.firstChild.element[0])

    // const ramNumRating = event.target.firstChild.childNodes
    // const ramNumRatingVal = ramNumRating[2].value

    // const ramCommentVal = ramNumRating[6].innerHTML
    // console.log(ramCommentVal)
    // console.log(event.target.firstChild.querySelector('#comment').innerHTML)

    // // create fetch 

    // fetch(`${url}/${ramenIdVal}`)
    //     .then(response => response.json())
    //     .then(data => console.log(data))


// function editRamen(ramObj){
//     const 
// }




fetchRamen()

})