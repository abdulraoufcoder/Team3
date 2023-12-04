const form = document.getElementById('form');
const carId = getQueryParam('id');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formObj = {
        name: this.name.value,
        fuel: this.fuel.value,
        speed: this.speed.value,
        price: this.price.value,
        image: this.url.value,
    };

    // Use carId if available (for update), otherwise, use null (for create)
    const urlForSubmit = carId ? `${url}/${carId}` : url;

    const methodForSubmit = carId ? 'PUT' : 'POST';

    fetch(urlForSubmit, {
        method: methodForSubmit,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formObj)
    })
    .then(() => {
        window.location.href = 'index.html';
    })
    .catch(error => console.error('Error submitting form:', error));
});

// Fetch car data by ID and populate
if (carId) {
    fetch(`${url}/${carId}`)
        .then(res => res.json())
        .then(item => {
            form.name.value = item.name;
            form.fuel.value = item.fuel;
            form.speed.value = item.speed;
            form.price.value = item.price;
            form.url.value = item.image;
        })
        .catch(error => console.error('Error fetching car details:', error));
}

// Function to get query parameter from URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
