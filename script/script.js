'use strict'
const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const history = document.getElementById('list')
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


// let dummyTransactions = [
//   { id: 1, text: 'Flower', amount: -20 },
//   { id: 2, text: 'Salary', amount: 300 },
//   { id: 3, text: 'Book', amount: -10 },
//   { id: 4, text: 'Camera', amount: 150 }
// ];


// console.log(dummyTransactions.map((a)=>a.amount).filter((a)=>a>0).reduce((acc,val)=>val+acc,0))


const localStorageTransactions = JSON.parse(
    localStorage.getItem('transactions')
    
  );
let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

const updateValue = function(){
    const amounts = transactions.map((a)=>a.amount)

    const plusTransaction = amounts.filter((a)=>a>0)

    const minusTransaction = amounts.filter((a)=>a<0)

    const income = plusTransaction.reduce((acc,val)=>acc+val,0)

    const expense = minusTransaction.reduce((acc,val)=>acc+val,0)


    moneyPlus.innerHTML = `Rs ${income}`
    moneyMinus.innerHTML =  `Rs ${expense}`
    balance.innerHTML= `Rs ${amounts.reduce((acc,val)=>acc+val,0)}`
}


const updateDom = function(transaction) {
    const sign = transaction.amount < 0 ? '-':'+'
    const item = document.createElement('li')
    
    if(sign === '-'){
        item.classList.add('minus')
    }
    else{
        item.classList.add('plus')
    }
    console.log("update",transaction)

    item.innerHTML = `${transaction.text}
    <span>${sign} Rs ${transaction.amount}</span>
    <button class="delete-btn" onclick=removeTransaction(${transaction.id})>X</button>`

    history.appendChild(item)
}

const updateLocalStorage = function(){
    localStorage.setItem('transaction',JSON.stringify(transactions))
}




// updateValue();



const removeTransaction = function(id){
    console.log(id)
    dummyTransactions = dummyTransactions.filter((i)=>i.id !== id)
    console.log(dummyTransactions.filter((i)=>i.id !== id))
    updateValue();
    updateLocalStorage
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === '' ){
        alert("Please fill")
    }
    else{
        let transactionsDetails = {
            id:Math.floor(Math.random()*10000),
            text:text.value,
            amount:Number(amount.value)
    
    
        }
        
    
        transactions.push(transactionsDetails)
    
        updateDom(transactionsDetails)
        updateValue()
        updateLocalStorage()
    
    
        text.value = '';
        amount.value = '';

    }
    
    
    
})
//updateValue();
// dummyTransactions.forEach((a)=>updateDom(a))


// console.log(dummyTransactions.forEach((a)=>console.log(a.amount)))




