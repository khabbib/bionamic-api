import { decodeBuffer } from "./util.js";

export async function loadApiKeys() {
    try {
        const response = await fetch(`https://localhost/api/api-keys`);
        const apiKeys = await response.json();
        const tableBody = document.querySelector("#apiKeyTable tbody");
        tableBody.innerHTML = "";

        apiKeys.forEach(data => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = data.api_id;
            row.insertCell(1).textContent = data.key;
            row.insertCell(2).textContent = data.permission_level;
            row.insertCell(3).textContent = new Date(data.expires).toLocaleDateString();
        });
    } catch (error) {
        console.error("Error loading API keys:", error);
    }
}
