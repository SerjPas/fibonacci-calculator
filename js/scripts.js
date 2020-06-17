let output = document.querySelector('#place-for-result');
let loaders = document.querySelectorAll('.loader');
let errorMoreThan50 = document.querySelector('.error50');
let error42 = document.querySelector('#error42');
let listOfResults = document.getElementById('list-of-results');


function hideResult() {
    output.classList.add('d-none');
}

function showResult() {
    output.classList.remove('d-none');
}

function callServer(validInput) {
    const SERVER_URL = `http://localhost:5050/fibonacci/${validInput}`;
    loaderShow(loaders);
    // hideResult();
    // if (error42.classList.contains('is-present')) {
    //     error42.classList.add('d-none');
    // }
    fetch(SERVER_URL)
        .then(function (response) {
            return validateResponse(response);
        })
        .then(function (data) {
            console.log(data);
            output.innerText =  data.result;
            // showResult();
            loaderHide(loaders);
        })
}
//
// function callResultsOnPageLoad() {
//     const SERVER_URL = `http://localhost:5050/getFibonacciResults`;
//     fetch(SERVER_URL)
//         .then(function (response) {
//             return validateResponse(response);
//         })
//         .then(function (data) {
//             console.log(data);
//             for (let i = 0; i < data.results.length; i++) {
//                     let date = new Date(data.results[i].createdDate); // Converting milliseconds to a date
//                     let node = document.createElement("li");                 // Create a <li> node
//                     let textnode = document.createTextNode(`The Fibonacci Of ${data.results[i].number} is
//                 ${data.results[i].result}. Calculated at: ${date.toString()}`);         // Create a text node
//                     node.appendChild(textnode);                              // Append the text to <li>
//                     document.getElementById("list-of-results").appendChild(node);     // Append <li> to <ul> with id="list-of-results"
//                     loaderHide(loaders);
//                 }
//             }
//         )
// }
//
function loaderShow(loaders) {
    for (const loader of loaders) {
        loader.classList.remove('d-none');
    }

}

function loaderHide(loaders) {
    for (const loader of loaders) {
        loader.classList.add('d-none');
    }
}

function validateResponse(response) {
    if (!response.ok) {
        response.text()
            .then(function (text) {
                error42.innerText = `Server error: ${text}`;
                error42.setAttribute("class", "is-present");
                output.classList.add('d-none');
                // loaderHide(loaders);
            });
    }
    return response.json();
}
//
// function refreshResults() {
//     listOfResults.innerHTML = "";
//     callResultsOnPageLoad();
//
// }

function calcFibonacciLocal(validInput) {
    let prev = 0, next = 1;
    for (let i = 0; i < validInput; i++) {
        let temp = next;
        next = prev + next;
        prev = temp;
    }
    return prev;
}

function checkThatError50presented() {
    if (!errorMoreThan50.classList.contains("d-none")) {
        errorMoreThan50.classList.add("d-none")
    }
}

function validateInput(input) {
    checkThatError50presented();
    if (input <= 50) {
        return input;
    } else {
        errorMoreThan50.classList.remove('d-none');
    }

}

function getInput() {
    return document.querySelector('#number-input').value;
}

function fibonacci(event) {
    let myInput = getInput();
    let validInput = validateInput(myInput)
    event.preventDefault();
    let check = document.getElementById('check');
    if (check.checked) {
        // refreshResults();
        callServer(validInput);
    } else {
        output.innerText = calcFibonacciLocal(validInput);
    }

}

let form = document.getElementById('calcFiboButton');
form.addEventListener("submit", fibonacci);
// document.addEventListener('DOMContentLoaded', callResultsOnPageLoad);
