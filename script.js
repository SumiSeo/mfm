const cursor = document.querySelector(".cursor");
const first = document.querySelector(".first");
const bank = document.querySelector(".gringotts");
const hat = document.querySelector(".sortingHat");
const second = document.querySelector(".second");
const gringottsMovements = document.querySelector(".gringotts__movements");
const gringottsBalance = document.querySelector(".gringotts__balance")
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


// document.addEventListener("mousemove", function(e){
//     cursor.setAttribute("style", "top: "+e.pageY+"px; left: "+e.pageX+"px;");
// })

const handleFirst = function(){
    bank.classList.toggle("visible")
};

const handleSecond = function(){
    hat.classList.toggle("visible")
};

first.addEventListener("click", handleFirst);
second.addEventListener("click", handleSecond);



const sumi = {
    name : 'Sumi',
    gringottsMovements : [],
    pin : 1209,
};


const displaymovements =function(movement) {
    gringottsMovements.innerHTML= '';
    movement.forEach(function(mov) {
        const type = mov > 0 ? 'deposit' : 'withdrawal';
        const html = `
        <div class="movement">
       <span class="movement__status__${type}">${type}</span>
       <span class="movement__context">She bought a coffee</span>
       <span class="movement__money">${mov}</span>
       </div>`;
       gringottsMovements.insertAdjacentHTML('afterbegin', html);
    });
};


displaymovements(sumi.gringottsMovements);

const displaySummary =function(movement){
    const summary = movement.filter(mov => mov>0).reduce((acc,cur) => acc+cur,0);;
    summaryPlus.textContent = summary;
    const summary2 = movement.filter(mov => mov<0).reduce((acc,cur) => acc+cur,0);
    summaryMinus.textContent = summary2;
}



displaySummary(sumi.gringottsMovements);

const displayBalance = function(sum){
    const balance = sum.reduce(function(acc,cur){ return acc+cur},0)
    gringottsBalance.textContent = balance;
}

displayBalance(sumi.gringottsMovements)



const handleSavingsButton = function(e){
    e.preventDefault();
    const amount = Number(inputSavings.value);
    if (amount > 0) {
    sumi.gringottsMovements.push(amount);
    displayBalance(sumi.gringottsMovements);
    displaymovements(sumi.gringottsMovements);
    displaySummary(sumi.gringottsMovements);
    inputSavings.value='';
    }
}

const handleExpensesButton = function(e) {
    e.preventDefault();
    const amount = Math.abs(inputExpenses.value) * -1;
    if (amount < 0) {
    sumi.gringottsMovements.push(amount);
    displayBalance(sumi.gringottsMovements);
    displaymovements(sumi.gringottsMovements);
    displaySummary(sumi.gringottsMovements);
    inputExpenses.value='';
    }
}

savingsbutton.addEventListener("click", handleSavingsButton);
expensebutton.addEventListener("click", handleExpensesButton);





const houses = ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin' ];

let currentName;

const handleSortingCheck = function(e){
    e.preventDefault();
    currentName = inputSortingHat.value;
    const lowerName = currentName.toLowerCase().slice(0,1);
    console.log(lowerName);
    if (lowerName ==='h' || lowerName ==='s' || lowerName ==='y' ||lowerName ==='r'  ) {
        sortingHatResult.textContent = `You are ${houses[0]} 🦁 !`
        inputSortingHat.value = '';
        inputSortingHat.blur();
    }
        else if (lowerName ==='a' || lowerName ==='b' || lowerName ==='m' ) {
            sortingHatResult.textContent = `You are ${houses[1]} 🦅 !`
            inputSortingHat.value = '';
            inputSortingHat.blur();
        } else if (lowerName ==='c' || lowerName ==='k' || lowerName ==='f' ) {
            sortingHatResult.textContent = `You are ${houses[2]} 🦡 !`
            inputSortingHat.value = '';
            inputSortingHat.blur();
        } else {
            sortingHatResult.textContent = `You are ${houses[3]} 🐍 !`
            inputSortingHat.value = '';
            inputSortingHat.blur();
        }
   
};


btnSortingCheck.addEventListener("click", handleSortingCheck);
