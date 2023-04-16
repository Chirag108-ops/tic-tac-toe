const heading = document.querySelector('.game-info')
const boxes = document.querySelectorAll('.box')
const btn = document.querySelector('.btn')

let currentPlayer = "X"
let filledBoxes = 0
let boxContent = ["","","","","","","","",""]
let winningPositions = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]
init()

function init(){
    currentPlayer = "X"
    filledBoxes = 0
    heading.innerText = `Current Player - ${currentPlayer}`
    boxContent = ["","","","","","","","",""]
}
boxes.forEach((box, index) => {
    box.addEventListener('click',() => {
        handleClick(index)
    })
})

function handleClick(index){
    filledBoxes++
    boxes[index].innerText = currentPlayer
    boxContent[index] = currentPlayer
    let str = `.box${index+1}`
    const bx = document.querySelector(str)
    bx.style.pointerEvents = "none"
    let check = checkGameOver()
    if(check){
        btn.classList.add('active')
        return
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    heading.innerText = `Current Player - ${currentPlayer}`
}

function checkGameOver(){
    let winner = ""
    winningPositions.forEach((position) => {
        if(boxContent[position[0] - 1] !== "" && (boxContent[position[0] - 1] === boxContent[position[1] - 1] && boxContent[position[1] - 1] === boxContent[position[2] - 1])){
            winner = currentPlayer
            heading.innerText = `Winner is - ${currentPlayer}`
            console.log(winner)
            boxes.forEach((box, index) => {
                let str = `.box${index+1}`
                const bx = document.querySelector(str)
                bx.style.pointerEvents = "none"
                if((index + 1 === position[0]) || (index + 1 === position[1]) || (index + 1 === position[2])){
                    bx.classList.add('win')
                }
            })
        }
    })
    if(winner !== "") return true
    if(filledBoxes === 9){
        heading.innerText = "Game Tied"
        boxes.forEach((box, index) => {
            let str = `.box${index+1}`
            const bx = document.querySelector(str)
            bx.style.pointerEvents = "none"
        })
        return true
    }
    return false
}

btn.addEventListener('click', () => {
    handlebtn()
})

function handlebtn() {
    btn.classList.remove('active')
    init()
    boxes.forEach((box, index) => {
        box.className = `box box${index+1}`
        box.innerText = ""
        box.style.pointerEvents = "auto"
    })
}