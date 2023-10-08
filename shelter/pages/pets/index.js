import data from '../main/pets.json' assert {type: 'json'}
let widthBody = window.innerWidth
let burgerButton = document.querySelector('.nav__button');
let navMenu = document.querySelector('.popup');
let menu = document.querySelector('.navigation__list').cloneNode(1);
let links = Array.from(menu.children);
let owerLay = document.querySelector('.owerlay');
let namePets;
let petsInfo;
let activePets = document.querySelector('.active__card')
let buttonX = document.querySelector('.button__x')
let popupPets = document.querySelector('.popup__pets')
let pagPets = document.querySelector('.pagination__pets')

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

//pagination
let cardsCenter = document.querySelector('.cards__center')
let cardsRight = document.querySelector('.cards__right')
let cardsLeft = document.querySelector('.cards__left')
let nextSlider = document.querySelector('.next')
let prevSlider = document.querySelector('.prev')
let endSlider = document.querySelector('.end')
let oneSlider = document.querySelector('.start')
let pageNum = document.querySelector('.page')
let arr = [0, 1, 2, 3, 4, 5, 6, 7]
let repeat;
let size;
let animationProgress = false;
let random;

function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    random = Math.floor(Math.random() * (max - min + 1)) + min;

}

endSlider.classList.add('active__button')
nextSlider.classList.add('active__button')
oneSlider.classList.add('no__active__button')
prevSlider.classList.add('no__active__button')


switch (true) {
    case widthBody > 1279:
        size = 8;
        repeat = 6;
        break;
    case widthBody < 1279 && widthBody > 767:
        size = 6;
        repeat = 6;
        break;
    case widthBody < 767 && widthBody > 318:
        size = 3;
        repeat = 6;
        break;
}
console.log(widthBody)
function getRandomArr(array, repeatNum) {
    let newArr = []
    let initialArr = array

    for (let i = 0; i < repeatNum; i++) {
        array = initialArr.concat()

        for (let j = 0; j < initialArr.length; j++) {
            let index = Math.floor(Math.random() * array.length)
            let item = array[index]
            array = array.filter((_, i) => i!== index)
            newArr.push(item)
        }
    }
    return newArr;
}
function formArr(array,size) {
    let subarray = [];
    for (let i = 0; i < Math.ceil(array.length / size); i++) {
        subarray[i] = array.slice((i * size), (i * size) + size);
    }
    
    subarray.forEach(element => {
getRandom(0,7)
      let  output = element.map((el, i) => element.indexOf(el) === i ? el : random)
      element=output
      console.log(element)
    });

    array = subarray
    return array
}
let newArr = getRandomArr(arr, repeat)
console.log(newArr)
arr =newArr
newArr =formArr(newArr,size)

console.log(newArr)


window.addEventListener("resize", () => {
    console.log(window.innerWidth)
    switch (true) {
        case window.innerWidth > 1279:
            size = 8;
           repeat = 6;
           newArr = formArr(arr,size)
           console.log(newArr)
           if(step>0){
            cardsLeft.innerHTML = ''
            createSlider(newArr[step-1], cardsLeft);
           }
           cardsCenter.innerHTML = ''
           createSlider(newArr[step], cardsCenter);
           if(step<repeat-1){
            cardsRight.innerHTML = ''
        createSlider(newArr[step+1], cardsRight);}
            break;
        case window.innerWidth < 1279 && window.innerWidth > 767:
            size = 6;
            repeat = 6;
            newArr =formArr(arr,size)
            console.log(newArr)
            if(step>0){
                cardsLeft.innerHTML = ''
                createSlider(newArr[step-1], cardsLeft);
               }
               cardsCenter.innerHTML = ''
               createSlider(newArr[step], cardsCenter);
               if(step<repeat-1){
                cardsRight.innerHTML = ''
            createSlider(newArr[step+1], cardsRight);}
                break;
                case window.innerWidth < 767 && window.innerWidth > 318:
                    size = 3;
                    repeat = 6;
                    newArr =formArr(arr,size)
                    console.log(newArr)
            if(step>0){
                cardsLeft.innerHTML = ''
                createSlider(newArr[step-1], cardsLeft);
               }
               cardsCenter.innerHTML = ''
               createSlider(newArr[step], cardsCenter);
               if(step<repeat-1){
                cardsRight.innerHTML = ''
            createSlider(newArr[step+1], cardsRight);}
                break;

    }

});

console.log(newArr)
function createCard(num, cards) {
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
    cards.append(card)
}
function createSlider(array, cardsNew) {
    array.forEach(el => {
        createCard(el, cardsNew)
    })
}

createSlider(newArr[0], cardsCenter);
createSlider(newArr[0], cardsRight);
createSlider(newArr[1], cardsLeft);

let step = 1;
function slideRight() {
    if (animationProgress) {
        return false
    }
    if (step > 1) {
        pagPets.classList.add('slide__right')
        animationProgress = true;
        step--
    }
    if (step === 1) {
        return false
    }


}



function slideLeft() {
    if (step === newArr.length) {
        return false
    }
    if (animationProgress) {
        return false
    }
    pagPets.classList.add('slide__left')
    step++
    animationProgress = true;
}

nextSlider.addEventListener('click', slideLeft)
prevSlider.addEventListener('click', slideRight)

pagPets.addEventListener('webkitAnimationEnd', () => {
    pageNum.textContent = step
    animationProgress = false;
    if (step > 1) {
        oneSlider.classList.remove('no__active__button')
        oneSlider.classList.add('active__button')
        prevSlider.classList.remove('no__active__button')
        prevSlider.classList.add('active__button')
    }
    else {
        oneSlider.classList.add('no__active__button')
        oneSlider.classList.remove('active__button')
        prevSlider.classList.add('no__active__button')
        prevSlider.classList.remove('active__button')
        pagPets.classList.remove('slide__one')
        cardsCenter.innerHTML = ''
        createSlider(newArr[step - 1], cardsCenter)
        cardsRight.innerHTML = ''
        createSlider(newArr[step], cardsRight)
    }
    if (step === newArr.length) {
        endSlider.classList.remove('active__button')
        endSlider.classList.add('no__active__button')
        nextSlider.classList.remove('active__button')
        nextSlider.classList.add('no__active__button')
        pagPets.classList.remove('slide__end')
        cardsCenter.innerHTML = ''
        createSlider(newArr[newArr.length - 1], cardsCenter)
        cardsLeft.innerHTML = ''
        createSlider(newArr[newArr.length - 2], cardsLeft)
    }
    else {
        endSlider.classList.add('active__button')
        endSlider.classList.remove('no__active__button')
        nextSlider.classList.add('active__button')
        nextSlider.classList.remove('no__active__button')
    }
    if (pagPets.classList.contains('slide__left')) {
        pagPets.classList.remove('slide__left')


        cardsLeft.innerHTML = ''
        cardsLeft.innerHTML = cardsCenter.innerHTML
        cardsCenter.innerHTML = ''
        cardsCenter.innerHTML = cardsRight.innerHTML
        cardsRight.innerHTML = ''
        if (step < newArr.length) {
            createSlider(newArr[step], cardsRight)
            console.log(newArr[step])
        }

    }
    if (pagPets.classList.contains('slide__right')) {
        pagPets.classList.remove('slide__right')
        cardsRight.innerHTML = ''
        cardsRight.innerHTML = cardsCenter.innerHTML
        cardsCenter.innerHTML = ''
        cardsCenter.innerHTML = cardsLeft.innerHTML
        cardsLeft.innerHTML = ''
        createSlider(newArr[step], cardsLeft)
        console.log(newArr[step])
        console.log(step)
    }
})

console.log(endSlider)
function slideEnd() {
    
    if (step === newArr.length) {
        return false
    }
    step = newArr.length
    pagPets.classList.add('slide__end')
}
function slideOne() {
    if (step === 1) {
        return false
    }
    step = 1
    pagPets.classList.add('slide__one')
}
endSlider.addEventListener('click', slideEnd)
oneSlider.addEventListener('click', slideOne)


//popup
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
    console.log(namePets)
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
