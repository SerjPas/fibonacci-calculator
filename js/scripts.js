function callServer() {

    let xVariable = document.getElementById('number-input').value;
    const SERVER_URL = `http://localhost:5050/fibonacci/${xVariable}`;
    const y = document.querySelector('.Y');
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    y.classList.add('d-none');
    const errorMoreThan50 = document.querySelector('.error50');
    const input = document.querySelector('#number-input');

    if (xVariable > 50) {
        errorMoreThan50.classList.remove("d-none");
        input.classList.add('error50');

    } else {
        fetch(SERVER_URL)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                const yVariable = document.querySelector(".Y");
                yVariable.innerText = data.result;
                spinner.classList.add('d-none');
                y.classList.remove('d-none');
            });
    }
}




