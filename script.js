const url = 'http://localhost:3000/cars';
const userTable = document.getElementById('userTable');

function gettingData() {
    fetch(url)
        .then(res => res.json())
        .then(cars => {
            if (cars.length > 0) {
                userTable.classList.remove('hidden');
                displayData(cars);
            } else {
                userTable.classList.add('hidden');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function displayData(cars) {
    let str = '';
    cars.forEach(car => {
        str += `
            <tr>
                <td>${car.name}</td>
                <td>${car.fuel}</td>
                <td>${car.speed}</td>
                <td>${car.price}</td>
                <td>
                <button class="update-button" onclick="getCarById(${car.id})">
                <img src="/edit.png">
            </button>
            <button class="delete-button" onclick="deleteCar(${car.id})">
                <img src="/delete.png">
            </button>
            
                </td>
            </tr>
        `;
    });
    document.querySelector('#userData').innerHTML = str;
}

function getCarById(carId) {
    window.location.href = `form.html?id=${carId}`;
}

function deleteCar(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE'
    })
    .then(() => gettingData())
    .catch(error => console.error('Error deleting car:', error));
}

gettingData();
