class Calculator {
    constructor(inputTextElement, resultTextElement){
        this.inputTextElement = inputTextElement
        this.resultTextElement = resultTextElement
        this.clear()
    }


    clear(){
        this.result = ""
        this.input = ""
        this.operation = undefined

    }

    delete(){
        this.result = this.result.toString().slice(0,-1)

    }

    appendNumber(number){
        if (number === "." && this.result.includes("."))return
        this.result = this.result.toString()+number.toString()

    }

    chooseOperation(operation){
        if(this.result === "")return
        if (this.input !== "") {
            this.compute()
        }
        this.operation = operation
        this.input = this.result
        this.result = ""


    }

    compute(){
        let computation
        const previous = parseFloat(this.input)
        const current = parseFloat(this.result)
        if (isNaN(previous) || isNaN(current)) return
        switch(this.operation){
            case "+":
                computation = previous + current
            break
                case "-":
                computation = previous - current
                break
                case "*":
                computation = previous * current
                break
                case "÷":
                computation = previous / current
                break
                default:
                return
        }
        this.result = computation
        this.operation = undefined
        this.input = ""

    }
    
    getDisplayNumber(number){
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]
        let integerDisplay
        if (isNaN(integerDigits)){
            integerDisplay = ""
        } else{
            integerDisplay = integerDigits.toLocaleString("en",{
                maximumFractionDigits: 0 })
        }
        if (decimalDigits != null){
            return `${integerDisplay}.${decimalDigits}`
        } else{
            return integerDisplay
        }
        
    }

    updateDisplay(){
        this.resultTextElement.innerText = this.getDisplayNumber(this.result)
        if(this.operation != null){
            this.inputTextElement.innerText = `${this.getDisplayNumber(this.input)} ${this.operation}`
        } else{
            this.inputTextElement.innerText = ""
        }
        
    }



}

const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const equalsButton = document.querySelector("[data-equals]")
const allClearButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")
const inputTextElement = document.querySelector("[data-input]")
const resultTextElement = document.querySelector("[data-result]")

const calculator = new Calculator(inputTextElement, resultTextElement)

numberButtons.forEach(button =>{
    button.addEventListener("click", () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})