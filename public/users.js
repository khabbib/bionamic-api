let currentOffset = 0;
const LIMIT = 10;

export async function loadUsers() {
    try {
        const response = await fetch(`https://localhost/api/users?offset=${currentOffset}`);
        const users = await response.json();
        const tableBody = document.querySelector("#repositoriesTableUser tbody");
        tableBody.innerHTML = "";
        const userDropdown = document.getElementById("userDropdown");
        userDropdown.innerHTML = "";

        users.forEach(data => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = data.user_id;
            row.insertCell(1).textContent = data.email;
            row.insertCell(2).textContent = data.name;
            row.insertCell(3).textContent = data.permission;
            row.insertCell(4).textContent = data.status;
            const option = new Option(data.name, data.user_id);
            userDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading users:", error);
    }
}

export async function nextUsers() {
    currentOffset += LIMIT;
    loadUsers();
}

export async function previousUsers() {
    if (currentOffset >= LIMIT) {
        currentOffset -= LIMIT;
        loadUsers();
    } else {
        console.log("You're already on the first page!");
    }
}
