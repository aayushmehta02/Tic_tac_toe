const cellElements = document.querySelectorAll('.cell')
const board = document.querySelector('.board')



let circleTurn
const X = 'x'
const circle = 'circle'


const winning_combs = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1.4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]



const winningMessageTextElement = document.querySelector('[data-winning-msg-text]')
const winningMessageElement = document.querySelector('.winning-msg')
const restartButton = document.querySelector('.restart')


startGame()


// restartButton.addEventListener('click', ()=>{
//     startGame()
// })

function startGame(){
    circleTurn = false
    
    cellElements.forEach(cell => {
        // cell.classList.remove(X)
        // cell.classList.remove(circle)
        // cell.removeEventLlisten('click', handleClick)
        cell.addEventListener('click', handleClick, {once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')

}  
function handleClick(e){
   const cell= e.target
   const currentClass = circleTurn ? circle : X
   placeMark(cell, currentClass)
    swapTurns()
   setBoardHoverClass()

   if(checkWin(currentClass)){
    endGame(false)
   }else if(isDraw()){
    endGame(true)}
    else{
     swapTurns()
     setBoardHoverClass()
    }
}

function endGame(draw){
    
    if(draw){
    winningMessageTextElement.innerText = "DRAW!"
    }else{
     winningMessageTextElement.innerText = `${!circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}


function placeMark(cell, currentClass){
    cell.classList.add(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X)
    board.classList.remove(circle)
    if(circleTurn){
        board.classList.add(circle)
        
    }else{
        board.classList.add(X)
    }
}


function checkWin(currentClass){
    return winning_combs.some(combinations =>{
        return combinations.every(index =>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}


function isDraw(){
    return[...cellElements].every(cell =>{
        return cell.classList.contains(X)|| cell.classList.contains(circle)
    })
}



