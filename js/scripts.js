function callServer() {


    let xVariable = document.getElementById('number-input').value;
    const SERVER_URL = `http://localhost:5050/fibonacci/${xVariable}`;
    const y = document.querySelector('.Y');
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('d-none');
    y.classList.add('d-none');
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




