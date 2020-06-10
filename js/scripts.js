let xVariable = 10;
function calculateFibonacci(xVariable){
    let prev = 0, next = 1;
    for(let i = 0; i < xVariable; i++){
        let temp = next;
        next = prev + next;
        prev = temp;
    }
    return prev;

}

let yVariable = calculateFibonacci(xVariable);

document.getElementById('X').innerText = xVariable.toString();
document.getElementById('Y').innerText = yVariable.toString();