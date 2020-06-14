function callServer() {
    let xVariable = document.getElementById('number-input').value;
    let y = document.querySelector('.Y');

    const SERVER_URL = `http://localhost:5050/fibonacci/${xVariable}`;
    let spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    y.classList.add('d-none');

    let errorMoreThan50 = document.querySelector('.error50');
    let input = document.querySelector('#number-input');
    let error42 = document.querySelector('#error42')

    if (xVariable > 50) {
        errorMoreThan50.classList.remove("d-none");
        input.classList.add('error50-input');

    } else {
        if (input.classList.contains('error50-input')) {
            input.classList.remove('error50-input')
        }
        if (!errorMoreThan50.classList.contains("d-none")) {
            errorMoreThan50.classList.add("d-none")
        }
        if (error42.classList.contains('is-present')) {
            error42.classList.add('d-none');
        }

        fetch(SERVER_URL)
            .then(function (response) {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                const yVariable = document.querySelector(".Y");
                yVariable.innerText = data.result;
                spinner.classList.add('d-none');
                y.classList.remove('d-none');
            })
            .catch(function (error) {
                error42.innerText = error;
                error42.setAttribute("class", "is-present")
                spinner.classList.add('d-none');
            });
    }
}

function callResultsOnPageLoad() {
    const SERVER_URL = `http://localhost:5050/getFibonacciResults`;
    fetch(SERVER_URL)
        .then(function (response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            for (let i = 0; i < data.results.length ; i++) {
                data.results.sort((a, b) => a.createdDate - b.createdDate); //sorting array
                let date = new Date(data.results[i].createdDate); // Converting milliseconds to a date

                let node = document.createElement("li");                 // Create a <li> node
                let textnode = document.createTextNode(`The Fibonacci Of ${data.results[i].number} is 
                ${data.results[i].result}. Calculated at: ${date.toString()}`);         // Create a text node
                node.appendChild(textnode);                              // Append the text to <li>
                document.getElementById("list-of-results").appendChild(node);     // Append <li> to <ul> with id="list-of-results"
                console.log(data.results[i]);
            }

        });
}


