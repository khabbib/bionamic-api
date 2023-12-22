import { showToast } from "./util.js";
let currentOffset = 0;
const LIMIT = 10;

export async function loadRepositories() {
    try {
        const response = await fetch(`https://localhost/api/repositories?offset=${currentOffset}`);
        const repositories = await response.json();
        const tableBody = document.querySelector("#repositoriesTable tbody");
        tableBody.innerHTML = "";

        repositories.forEach(data => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = data.repository_id;
            row.insertCell(1).textContent = data.name;
            row.insertCell(2).textContent = data.status;
        });

        await loadRepositoriesSelect();
    } catch (error) {
        console.error("Error loading repositories:", error);
    }
}


export async function loadRepositoriesSelect() {
    try {
        const response = await fetch(`https://localhost/api/repositories?offset=${currentOffset}`);
        const repositories = await response.json();
        const repositoryDropdown = document.getElementById("repositoryDropdown");
        repositoryDropdown.innerHTML = "";

        repositories.forEach(data => {
            const option = new Option(data.name, data.repository_id);
            repositoryDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Error loading repositories:", error);
    }
}

export async function nextRepositories() {
    currentOffset += LIMIT;
    loadRepositories();
}

export async function previousRepositories() {
    if (currentOffset >= LIMIT) {
        currentOffset -= LIMIT;
        loadRepositories();
    } else {
        showToast("You're already on the first page!");
    }
}
