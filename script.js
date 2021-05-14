const first = document.querySelector(".first");
const bank = document.querySelector(".gringotts");
const gringottsMovements = document.querySelector(".gringotts__movements");
const gringottsBalance = document.querySelector(".gringotts__balance")
const inputSavings = document.querySelector(".input__text--savings");
const inputExpenses = document.querySelector(".input__text--expenses");
const savingsbutton = document.querySelector(".input__button--savings");
const expensebutton = document.querySelector(".input__button--expenses");


const handleFirst = function(){
    bank.classList.toggle("visible")
};

first.addEventListener("click", handleFirst);



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
    inputExpenses.value='';
    }
}

savingsbutton.addEventListener("click", handleSavingsButton);
expensebutton.addEventListener("click", handleExpensesButton);
