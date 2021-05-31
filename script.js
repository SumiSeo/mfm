const cursor = document.querySelector(".cursor");
const first = document.querySelector(".first");
const second = document.querySelector(".second");
const third = document.querySelector(".third");
const fourth = document.querySelector(".fourth");
const fifth = document.querySelector(".fifth");
const sixth = document.querySelector(".sixth");
const seventh = document.querySelector(".seventh");
const bank = document.querySelector(".gringotts");
const hat = document.querySelector(".sortingHat");
const tmDiary = document.querySelector(".tm__diary");
const libraryHermione = document.querySelector(".library__hermione")
const frogChocolate = document.querySelector(".frog__chocolate")
const padfootMap= document.querySelector(".padfoot__map")
const tellCountry= document.querySelector(".tell__country")


const tableContainer = document.querySelector(".table__container");
const tableBox = document.querySelectorAll(".table__box")


const gringottsMovements = document.querySelector(".gringotts__movements");
const gringottsBalance = document.querySelector(".gringotts__balance")
const btnGringottsSort = document.querySelector(".gringotts__sort");
const inputSavings = document.querySelector(".input__text--savings");
const inputExpenses = document.querySelector(".input__text--expenses");
const savingsbutton = document.querySelector(".input__button--savings");
const expensebutton = document.querySelector(".input__button--expenses");
const summaryPlus = document.querySelector(".gringotts__summary--plus");
const summaryMinus = document.querySelector(".gringotts__summary--minus");


const inputSortingHat = document.querySelector(".sortinghat__name");
const btnSortingCheck = document.querySelector(".sortinghat__check");
const sortingHatResult = document.querySelector(".sortinghat__result");
const btnSortingSort = document.querySelector(".sortinghat__sort");

const tmDiaryToday = document.querySelector(".tm__diary__today");
const harrySpeaking = document.querySelector(".tm__diary--harry");
const tmSpeaking = document.querySelector(".tm__diary--tm");
const harrySpeaking2 = document.querySelector(".tm__diary--harry2");
const tmSpeaking2 = document.querySelector(".tm__diary--tm2");
const harrySpeaking3 = document.querySelector(".tm__diary--harry3");
const tmSpeaking3 = document.querySelector(".tm__diary--tm3");
const tmDiaryContent = document.querySelectorAll(".tm__diary__content")
const tmDiaryLetter= document.querySelector(".tm__diary__letter")

const btnHermione = document.querySelector(".hermione__button");
const inputHermione = document.querySelector(".hermione__input")
const lineHermione =document.querySelectorAll(".hermione__line")
const linesHermione = document.querySelector(".hermione__template");



const btnRight = document.querySelector(".btn--right");
const btnLeft = document.querySelector(".btn--left");



const btnLumos = document.querySelector(".lumos__btn");
const inputMap = document.querySelector(".map__input");
const mapContainer = document.querySelector(".map__container");
const mapMap = document.querySelector(".map__map");


const aboutCountry = document.querySelector(".about__country");
const countryInput = document.querySelector(".country__header--input");
const countryButton = document.querySelector(".country__header--button");
const loadingSpinner = document.querySelector(".fa-spinner");
const countryLists = document.querySelector(".country__lists");


// document.addEventListener("mousemove", function(e){
//     cursor.setAttribute("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;");
// })

const handleFirst = function () {
    bank.classList.toggle("visible");
};

const handleSecond = function () {
    hat.classList.toggle("visible");
};

let showingDiary = false;
const handleThird = function () {
    tmDiary.classList.toggle("visible");
    showingDiary = true;
    if (showingDiary){
        displayDiary();
    }
   
};

const handleFourth = function () {
    libraryHermione.classList.toggle("visible");
};

const handleFifth = function () {
    frogChocolate.classList.toggle("visible");
};
const handleSixth = function(){
    padfootMap.classList.toggle("visible");
}

const handleSeventh = function(){
    tellCountry.classList.toggle("visible");
}

first.addEventListener("click", handleFirst);
second.addEventListener("click", handleSecond);
third.addEventListener("click", handleThird);
fourth.addEventListener("click", handleFourth);
fifth.addEventListener("click", handleFifth);
sixth.addEventListener("click", handleSixth);
seventh.addEventListener("click", handleSeventh)


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Gringott wizarding bank


const sumi = {
    name: 'Sumi',
    gringottsMovements: [],
    pin: 1209,
};

//Get data from local Storage;

const displaymovements = function (movement) {
    gringottsMovements.innerHTML = '';
    movement.forEach(function (mov) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        let html;
        if (mov>0){
            html = `
            <div class="movement">
           <span class="movement__status__${type}">${type}</span>
           <span class="movement__context">KEEP SAVE YOUR MONEY ! 😝</span>
           <span class="movement__money">${mov}€</span>
           </div>`;
        } else {
            html = `
            <div class="movement">
           <span class="movement__status__${type}">${type}</span>
           <span class="movement__context">DO NOT SPEND TOO MUCH ! 😖</span>
           <span class="movement__money">${mov}€</span>
           </div>`;
        }
        
        gringottsMovements.insertAdjacentHTML('afterbegin', html);
    });
};


displaymovements(sumi.gringottsMovements);

const displaySummary = function (movement) {
    const summary = movement.filter(mov => mov > 0).reduce((acc, cur) => acc + cur, 0);
    summaryPlus.textContent = `${summary}€`;
    const summary2 = movement.filter(mov => mov < 0).reduce((acc, cur) => acc + cur, 0);
    summaryMinus.textContent = `${summary2}€`;
}



displaySummary(sumi.gringottsMovements);

const displayBalance = function (sum) {
    const balance = sum.reduce(function (acc, cur) { return acc + cur }, 0);
    gringottsBalance.textContent =`${balance}€`;
}
displayBalance(sumi.gringottsMovements);



const handleSavingsButton = function (e) {
    e.preventDefault();
    const amount = Number(inputSavings.value);
    if (amount > 0) {
        sumi.gringottsMovements.push(amount);
        displayBalance(sumi.gringottsMovements);
        displaymovements(sumi.gringottsMovements);
        displaySummary(sumi.gringottsMovements);
        inputSavings.value = '';
        setLocalStorage();

    }
}

const handleExpensesButton = function (e) {
    e.preventDefault();
    const amount = Math.abs(inputExpenses.value) * -1;
    if (amount < 0) {
        sumi.gringottsMovements.push(amount);
        displayBalance(sumi.gringottsMovements);
        displaymovements(sumi.gringottsMovements);
        displaySummary(sumi.gringottsMovements);
        inputExpenses.value = '';
        setLocalStorage();

        
    }
}

const setLocalStorage = function(){
    localStorage.setItem("moneyFlux", JSON.stringify(sumi));
};

const getLocalStorage = function(){
    const moneyData = JSON.parse(localStorage.getItem("moneyFlux"));
    if (!moneyData) return;
    const moneyData2 = moneyData.gringottsMovements;
    sumi.gringottsMovements = moneyData2;
    displaymovements(moneyData2);
    displayBalance(moneyData2);
    displaySummary(moneyData2);
};

getLocalStorage();

savingsbutton.addEventListener("click", handleSavingsButton);
expensebutton.addEventListener("click", handleExpensesButton);





////////////////////////////////////////////////////////////////////////
const houses = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'];


let currentName;
const handleSortingCheck = function (e) {
    e.preventDefault();
    currentName = inputSortingHat.value;
    if(!currentName) return;
    if(currentName){
    const lowerName = currentName.toLowerCase().slice(0, 1);
    console.log(lowerName);
    if (lowerName === 'h' || lowerName === 's' || lowerName === 'y' || lowerName === 'r') {
        sortingHatResult.textContent = `You are ${houses[0]} 🦁 !`
        inputSortingHat.value = '';
        inputSortingHat.blur();
    }
    else if (lowerName === 'a' || lowerName === 'b' || lowerName === 'n') {
        sortingHatResult.textContent = `You are ${houses[1]} 🦅 !`
        inputSortingHat.value = '';
        inputSortingHat.blur();
    } else if (lowerName === 'c' || lowerName === 'k' || lowerName === 'f') {
        sortingHatResult.textContent = `You are ${houses[2]} 🦡 !`
        inputSortingHat.value = '';
        inputSortingHat.blur();
    } else {
        sortingHatResult.textContent = `You are ${houses[3]} 🐍 !`
        inputSortingHat.value = '';
        inputSortingHat.blur();
    }
    }
};

btnSortingCheck.addEventListener("click", handleSortingCheck);
btnSortingSort.addEventListener("click", function(e){
    e.preventDefault();
    sortingHatResult.textContent = 'You are...';
});



//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
// setInterval(( ) => tmDiaryToday.textContent  = timeFinal, 1000)
// tmDiaryToday.textContent
// tmDiaryToday.textContent  = timeFi

const displayTime = function(){
    const today = new Date();
    const timeOptions = {
    hour : 'numeric',
    minute : 'numeric',
    day : 'numeric',
    month : 'long',
    year: 'numeric',
    weekday : 'long',
    second: 'numeric'
    };

    const timeFinal= new Intl.DateTimeFormat("en-GB", timeOptions).format(today);
    tmDiaryToday.textContent  = timeFinal;
}


setInterval(displayTime, 1000)


//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Harry speaking
harrySpeaking.innerHTML='';
tmSpeaking.innerHTML='';
harrySpeaking2.innerHTML='';
tmSpeaking2.innerHTML='';
harrySpeaking3.innerHTML='';
tmSpeaking3.innerHTML='';
const displayDiary = function(){
    setTimeout(function(){
        harrySpeaking.textContent= 'My name is Harry Potter.';
        harrySpeaking.classList.add("tm__diary__animation")
    },1000);
    
    
    setTimeout(function() {
        tmSpeaking.textContent= "hello Harry Potter, my name is Tom Riddle.";
        tmSpeaking.classList.add("tm__diary__animation")
    
    },3000);
    
    setTimeout(function(){
        harrySpeaking2.textContent= '...Do you know anything about the chamber of secrets?';
        harrySpeaking2.classList.add("tm__diary__animation")
    },5000);
    
    setTimeout(function() {
        tmSpeaking2.textContent= "Yes.";
        tmSpeaking2.classList.add("tm__diary__animation")
    
    },7000);
    
    setTimeout(function(){
        harrySpeaking3.textContent= 'Can you tell me ?';
        harrySpeaking3.classList.add("tm__diary__animation")
    },9000);
    
    setTimeout(function() {
        tmSpeaking3.textContent= "No.";
        tmSpeaking3.classList.add("tm__diary__animation")
    
    },11000);
    
};

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//Hermione
let words=[];

btnHermione.addEventListener("click", function(e){
    e.preventDefault();
    console.log("clicked")
    const word = inputHermione.value;
    if(!word) return;
    words.push(word);
    console.log(words);
    inputHermione.value = '';
    const number = words.length
    if (number ===1) {
    lineHermione[number-1].textContent = words[number-1]}
    else {
        lineHermione[(number*2)-2].textContent = words[number-1]
    }
    // lineHermione.forEach(function(line, i){
    //  console.log(line, i)
    //     lineHermione[i].textContent = `${words[i]}`
    // })
   
});

mapContainer.classList.remove("map__none");

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
btnLumos.addEventListener("click", function(e){
    e.preventDefault();
    const magic = inputMap.value.toLowerCase();
    const trimMagic = magic.replaceAll(' ','');
    if(!trimMagic) return;
    // if(magic ==='nogood')
    console.log(trimMagic)
    if (trimMagic ==='nogood') {
        mapMap.classList.remove("map__bye");
    }
    inputMap.value='';
})



const map = L.map('map').setView([51.6902525, -0.4196959],20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('Snape')
    .openPopup();




////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
const countries = [];
const harry = {
    name : 'harry',
    country : 'uk',
    city : 'london',
}

const hermione = {
    name : 'hermione',
    country : '',
    city : '',
}

const ron= {
    name : 'ron',
    country : '',
    city : '',
}

countryButton.addEventListener("click", function(e){
        e.preventDefault();
        const search =countryInput.value;
        countryInput.value= '';
        // console.log(search);
        findCountry(search);
    })

const loadSpinner = function(){
    const parentElement = aboutCountry;
    const markup = `
    <div class="spinner">
    <i class="fas fa-spinner"></i>
    </div>`;
    parentElement.insertAdjacentHTML("afterbegin",markup);
};

countryLists.addEventListener("click", function(e) {
    const btn = e.target.closest(".country__list");
    const nameCountry = btn.querySelector(".country__country").textContent;
    console.log(nameCountry);
    findCountry(nameCountry);
    // console.log(btn)
})

const displayFindCountry = function(data){
    const markup = `
    <ul class="country__list">
        <li class="country__character">${data.callingCodes}</li>
        <li class="country__country">${data.name.slice(0,6)}</li>
        <li class="country__city">${data.capital.slice(0,9)}</li>
      </ul>
    `;
    countryLists.insertAdjacentHTML("afterbegin", markup);
};


const findCountry = async function(country){
    try {
    loadSpinner();
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`);
    const data = await res.json();
    const finalData = data[0];
    console.log(data);
    aboutCountry.innerHTML= '';
    if(!data) return;
    const markup = `
        <div class="country__flag"><img src="${finalData.flag}"/></div>
        <div class="country__name"><h1>${finalData.name.slice(0,6)} →</h1></div>
        <div class="country__city"><span>${finalData.capital.slice(0,9)}</span></div>
     `;
    aboutCountry.insertAdjacentHTML("afterbegin", markup);
  
    if(!countries.includes(finalData.name)) {
        displayFindCountry(finalData);
        countries.push(finalData.name); 
        console.log(countries)
    }
  
}
    catch(err) {
        console.log(`${err}  😗`)
    }
};

