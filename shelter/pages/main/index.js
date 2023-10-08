//burger

let burgerButton = document.querySelector('.nav__button');
let navMenu = document.querySelector('.popup');
let menu = document.querySelector('.navigation__list').cloneNode(1);
let links = Array.from(menu.children);
let owerLay = document.querySelector('.owerlay');
burgerButton.addEventListener('click', activePopup)
function activePopup() {
    burgerButton.classList.toggle('rotate');
    navMenu.classList.toggle('open__navigation');
    owerLay.classList.toggle('active')
    renderCont();
    document.body.classList.toggle('fix__scroll')
}
function renderCont() {
    navMenu.appendChild(menu);
}
function closePopup() {
    navMenu.classList.remove('open__navigation');
    burgerButton.classList.remove('rotate');
    owerLay.classList.remove('active')
    document.body.classList.remove('fix__scroll')
    popupPets.classList.remove('open')
    popupPets.innerHTML = '';
    buttonX.classList.remove('open')
};
links.forEach(function (link) {
    link.addEventListener('click', closePopup)
});
owerLay.addEventListener('click', closePopup)

//slider
let widthBody = window.innerWidth
let sliderPets = document.querySelector('.slider__pets')
let cardsCenter = document.querySelector('.cards__center')
let cardsRight = document.querySelector('.cards__right')
let cardsLeft = document.querySelector('.cards__left')
let nextSlider = document.querySelector('.slider__next')
let prevSlider = document.querySelector('.slider__prev')
let arr = [];
let arr_2 = [];
let steps = 1;
let newArr;
let random;
let num;
let step = 1;
import data from '../main/pets.json' assert {type: 'json'}
console.log(widthBody)
function createCard(num, cardsNew) {

    let card = document.createElement('div');
    card.classList.add('our__friends__card');
    let image = document.createElement('img')
    image.classList.add('card__image')
    image.src = data[num].img
    card.append(image)
    let text = document.createElement('p')
    text.classList.add('card__name')
    text.textContent = data[num].name
    card.append(text)
    let button = document.createElement('button')
    button.classList.add('card__button')
    button.textContent = 'Learn more'
    card.append(button)
    cardsNew.append(card)
}
switch (true) {
    case widthBody > 1080:
        while (arr.length < 3) {
            getRandom(0, 7)
            if (!arr.includes(random)) {
                arr.push(random)
            }
        }

        num = 6;
        break;
    case widthBody < 1080 && widthBody > 768:
        while (arr.length < 2) {
            getRandom(0, 7)
            if (!arr.includes(random)) {
                arr.push(random)
            }
        }
        num = 4;
        break;
    case widthBody < 768 && widthBody > 319:
        while (arr.length < 1) {
            getRandom(0, 7)
            if (!arr.includes(random)) {
                arr.push(random)
            }
        }
        num = 2;
        break;
}


function createSlider(array, cardsNew) {
    array.forEach(el => {
        createCard(el, cardsNew)
    })

}
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    random = Math.floor(Math.random() * (max - min + 1)) + min;

}

function createNewArr(array) {
    newArr = [...array]
    while (newArr.length < num) {
        getRandom(0, 7)
        if (!newArr.includes(random)) {
            newArr.push(random)
           
        }
    }console.log(newArr)
    newArr.splice(0, num / 2)
    
}
createNewArr(arr)
 arr = newArr
createSlider(arr, cardsCenter);
createNewArr(arr)
arr = newArr
arr_2=newArr
createSlider(arr, cardsRight);
createSlider(arr, cardsLeft);


let animationProgress = false;


function slideRight() {
    if (animationProgress) {
        return false
    }
    sliderPets.classList.add('slide__right')
    animationProgress = true;
    step--
}


function slideLeft() {
    if (animationProgress) {
        return false
    }
    sliderPets.classList.add('slide__left')
    animationProgress = true;
    step++
}

nextSlider.addEventListener('click', slideLeft)
prevSlider.addEventListener('click', slideRight)

sliderPets.addEventListener('webkitAnimationEnd', () => {
    animationProgress = false;

if (sliderPets.classList.contains('slide__left')) {
   
    sliderPets.classList.remove('slide__left')
    cardsLeft.innerHTML = ''
    cardsLeft.innerHTML = cardsCenter.innerHTML
    cardsCenter.innerHTML = ''
    cardsCenter.innerHTML = cardsRight.innerHTML
    cardsRight.innerHTML = ''
    if(steps===step){
        createNewArr(arr_2)
        arr = newArr
    }
    else{
        if(step>2){
            steps++
            console.log(arr_2)
            createNewArr(arr)
            arr=newArr
            console.log(arr)
           }
           else if(step%2===0){
            console.log("arr_2 ok")
            arr_2=arr
            createNewArr(arr)
            arr=newArr
        }
           else{
            createNewArr(arr)
            arr = newArr
            console.log(arr)
            console.log(arr_2)
           }
    }
   
   createSlider(arr, cardsRight);
}

else if (sliderPets.classList.contains('slide__right')) {
    
    sliderPets.classList.remove('slide__right')
    cardsRight.innerHTML = ''
    cardsRight.innerHTML = cardsCenter.innerHTML
    cardsCenter.innerHTML = ''
    cardsCenter.innerHTML = cardsLeft.innerHTML
    cardsLeft.innerHTML = ''
    if(steps===step){
        createNewArr(arr_2)
        arr = newArr
    }
    else{
        if(step<0){
            steps--
             
             console.log(arr_2)
             createNewArr(arr)
             arr=newArr
             console.log(arr)
             
         }
         else if(step%2===0){
            console.log('arr2 ok')
            arr_2=arr
         }
            else{
             createNewArr(arr)
             arr = newArr
             console.log(arr)
             console.log(arr_2)
            }
    } 
            createSlider(arr, cardsLeft);
    
   
   console.log(newArr)
}
console.log(step)
console.log(steps)
})
window.addEventListener("resize", () => {
    switch (true) {
        case window.innerWidth > 1080:
            while (arr.length < 3) {
                getRandom(0, 7)
                if (!arr.includes(random)) {
                    arr.push(random)
                }
            }
            num = 6;
            if (newArr.length < 3) {
                cardsCenter.innerHTML = ''
                createSlider(arr, cardsCenter);
            }
            cardsRight.innerHTML = ''
            if (newArr.length < 3 || arr === newArr) {
                createNewArr()
            }
            createSlider(newArr, cardsRight);
            cardsLeft.innerHTML = ''
            createSlider(newArr, cardsLeft);
            break;
        case window.innerWidth < 1080 && window.innerWidth > 768:
            if (arr.length < 2) {
                getRandom(0, 7)
                if (!arr.includes(random)) {
                    arr.push(random)
                }
            }
            else if (arr.length > 2) {
                arr.pop()
            }
            num = 4;
            if (newArr.length !== 2) {
                cardsCenter.innerHTML = ''
                createSlider(arr, cardsCenter);
            }
            if (newArr.length !== 2 || arr === newArr) {
                createNewArr()
            }
            cardsRight.innerHTML = ''
            createSlider(newArr, cardsRight);
            cardsLeft.innerHTML = ''
            createSlider(newArr, cardsLeft);
            break;
        case window.innerWidth < 768 && window.innerWidth > 319:

            if (arr.length > 1) {
                arr.pop()
            }
            num = 2;
            if (newArr.length !== 1) {
                cardsCenter.innerHTML = ''
                createSlider(arr, cardsCenter);
            }
            if (newArr.length > 1 || arr === newArr) {
                createNewArr()
            }
            cardsRight.innerHTML = ''
            createSlider(newArr, cardsRight);
            cardsLeft.innerHTML = ''
            createSlider(newArr, cardsLeft);
            break;

        default:
            break;
    }

});

// popupPets
let namePets;
let petsInfo;
let buttonX = document.querySelector('.button__x')
let popupPets = document.querySelector('.popup__pets')
cardsCenter.addEventListener('click', function (event) {
    if (event.target.tagName === 'IMG') {
        namePets = event.target.nextSibling.textContent
    }
    if (event.target.tagName === 'P') {
        namePets = event.target.textContent
    }
    if (event.target.tagName === 'BUTTON') {
        namePets = event.target.previousSibling.textContent
    }
    for (let i = 0; i < data.length; i++) {
        if (data[i].name === namePets) {
            petsInfo = data[i]
        }
    }
    popupPets.classList.add('open')
    owerLay.classList.add('active')
    buttonX.classList.add('open')
    document.body.classList.toggle('fix__scroll')
    createInfoCards()
})
function createInfoCards() {

    let image = document.createElement('img')
    image.classList.add('popup__image')
    image.src = petsInfo.img2
    let content = document.createElement('div');
    content.classList.add('popup__content')
    popupPets.append(image)
    let namePets = document.createElement('h3')
    namePets.classList.add('popup__name')
    namePets.textContent = petsInfo.name
    content.append(namePets)
    let typeBreedPets = document.createElement('p')
    typeBreedPets.classList.add('pets__breed__type')
    typeBreedPets.textContent = petsInfo.type + '-' + petsInfo.breed
    content.append(typeBreedPets)
    let descriptionPets = document.createElement('p')
    descriptionPets.classList.add('description__pets')
    descriptionPets.textContent = petsInfo.description;
    content.append(descriptionPets);
    let petsChar = document.createElement('ul')
    petsChar.classList.add('pets__info')
    content.append(petsChar);
    let agePets = document.createElement('li')
    agePets.classList.add('age__pets', 'info__item')
    agePets.textContent = petsInfo.age;
    petsChar.append(agePets);
    let age = document.createElement('span')
    age.textContent = "Age:"
    agePets.append(age);

    let inoculationsPets = document.createElement('li')
    inoculationsPets.classList.add('inoculations__pets', 'info__item')
    inoculationsPets.textContent = petsInfo.inoculations;
    petsChar.append(inoculationsPets);
    let inoculations = document.createElement('span')
    inoculations.textContent = "Inoculations:"
    inoculationsPets.append(inoculations);


    let diseasesPets = document.createElement('li')
    diseasesPets.classList.add('diseases__pets', 'info__item')
    diseasesPets.textContent = petsInfo.diseases;
    petsChar.append(diseasesPets);
    let diseases = document.createElement('span')
    diseases.textContent = "Diseases:"
    diseasesPets.append(diseases);

    let parasitesPets = document.createElement('li')
    parasitesPets.classList.add('parasites__pets', 'info__item')
    parasitesPets.textContent = petsInfo.parasites;
    petsChar.append(parasitesPets);
    let parasites = document.createElement('span')
    parasites.textContent = "Parasites:"
    parasitesPets.append(parasites);

    popupPets.append(content)

}
buttonX.addEventListener('click', closePopup)