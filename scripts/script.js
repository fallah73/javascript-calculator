//!================ Var ==================
const numbers = [...document.querySelectorAll('.num')]  
const operators = [...document.querySelectorAll('.ops')] 
const view = document.querySelector('.view') 
const clear = document.querySelector('.clear') 
const equal = document.querySelector('.equal') 
let currentNum = ''  
let previousNum = ''
let operator = ''
let resultNum = 0  
let helpVar = 0  
let fontSize = 35
 

//!================ Functions ==================
const convertNumber = (number) => {
   
    const stringNumber = number.toString() 
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay

    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', 
                        { maximumFractionDigits: 5 })
    }
    if (decimalDigits != null) { 
      return `${integerDisplay}.${decimalDigits}`
    } else { 
      return integerDisplay
    }

}

//todo====================================
const displayNumberSize = (length) => {
 
    if( length > 10  ){                    
        if(fontSize == 23){
            view.style.fontSize = '23px' 
        }else{
            fontSize -= 6
            view.style.fontSize = fontSize + 'px'            
        }         
    } else{
        view.style.fontSize = '35px'
        fontSize = 35
    }
}

//todo====================================
const calculation = () => {
 
    previousNum = parseFloat(previousNum)
    currentNum = parseFloat(currentNum)  

    switch (operator) {
       
        case "+":  
            if(isNaN(currentNum)){ 
                resultNum = previousNum + previousNum  
            }else if(previousNum === 0){ 
                resultNum = currentNum + parseFloat(helpVar) 
            }else{
                resultNum = previousNum + currentNum   
            }
        break

        case "-":
            if(isNaN(currentNum)){ 
                resultNum = previousNum - previousNum 
            }else if(previousNum === 0){ 
                resultNum = currentNum - parseFloat(helpVar) 
            }else{
                resultNum = previousNum - currentNum 
            }
        break

        case "*":
            if(isNaN(currentNum)){ 
                resultNum = previousNum * previousNum 
            }else if(previousNum === 0){ 
                resultNum = currentNum * parseFloat(helpVar) 
            }else{
                resultNum = previousNum * currentNum 
            }
        break

        case "/": 
            if(currentNum === 0){
                resultNum = 'num/0' 
            }else if(isNaN(currentNum)){
                resultNum = previousNum / previousNum 
            }else if(previousNum === 0){ 
                resultNum = currentNum / parseFloat(helpVar) 
            }else{
                resultNum = previousNum / currentNum 
            }
        break
        
        default: 
        resultNum = currentNum
    }
    return resultNum
}

//todo====================================
const setNumber = (event) => {

    if (resultNum || view.innerHTML === '0') {   
        currentNum = event.target.dataset.num  
        resultNum = 0 
        view.style.fontSize = '35px'
        fontSize = 35
    }else if (event.target.dataset.num === '.' && currentNum.includes('.')){ 
            currentNum = currentNum                  
    }else if (event.target.dataset.num === '0' && view.innerHTML === '0'){ 
            currentNum = event.target.dataset.num
    }else if (currentNum === '0'){       
            currentNum = event.target.dataset.num    
    }else if(currentNum.length < 16){      
            currentNum += event.target.dataset.num 
    }
 
    if(currentNum.length < 17){
        displayNumberSize(currentNum.length)
        view.innerHTML = convertNumber(currentNum)  
        helpVar = currentNum 
    }  
    
} 

//todo====================================
const setOperator = (event) => {
 
    if(previousNum && currentNum === ''){
        operator = event.target.dataset.ops  
    }else if(previousNum ){
        previousNum = calculation() 
        operator = event.target.dataset.ops   
    }else {
        previousNum = currentNum   
        currentNum = ""
        operator = event.target.dataset.ops  
    }         
}

//todo====================================
const equalFunc = () => {
    
    resultNum = calculation()  
   
    displayNumberSize(`${resultNum}`.length )
    if(`${resultNum}`.length > 16){  
            view.style.fontSize = '19px'
    } 

    if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) {  
            if(resultNum == 'num/0'){
                resultNum = 'Cannot divide by zero'
                view.innerHTML = resultNum
            }else{
                resultNum = " undefined! " 
                view.innerHTML = resultNum
            }    
        } 
   
    }else if(`${resultNum}`.length > 16){ 
            view.innerHTML = resultNum.toExponential()  
        }else{
            view.innerHTML =   convertNumber(resultNum) 
    }   
    previousNum = 0
    currentNum = resultNum
}

//todo====================================
const clearNum = () =>{
    previousNum = ""
    currentNum = ""
    view.innerHTML = "0" 
    view.style.fontSize = '35px'
    fontSize = 35
}

//! ============ Events ===============
numbers.forEach((item) => { 
    item.addEventListener('click' ,  setNumber)
})
    
operators.forEach((item) => { 
    item.addEventListener('click', setOperator)
}) 
    
equal.addEventListener('click' , equalFunc )

clear.addEventListener('click' , clearNum)