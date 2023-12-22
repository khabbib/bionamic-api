import { loadEvents } from './event.js';
import { loadMatrix, loadMatrixID } from './matrix.js';
import { loadRepositories } from './repo.js';
import { loadUsers } from './users.js';
import { setupEventListeners } from './handleEvent.js';
import { loadApiKeys } from './apikeys.js';
import { showToast, formatDate } from './util.js';


document.addEventListener('DOMContentLoaded', () => {
    loadContent();
});

async function loadContent() {
    await loadEvents();
    await loadUsers();
    await loadRepositories();
    //await showToast('Welcome!');
    await loadMatrix();
    // await loadMatrixID();
    await setupEventListeners();
    await loadApiKeys();
}

// async function sendMatrixAPIRequest(operation, event_id) {
//     const adjustment = parseFloat(document.getElementById("adjustmentInput").value);
//     const repository_id = document.getElementById("repositoryDropdown").value;
//
//     // Prepare data to be sent
//     const data = {
//         matrix: adjustment,
//         repository_id,
//         event_id,
//         operation, // "increment" or "decrement"
//     };
//
//     try {
//         // Send the request to the server
//         const response = await fetch("https://localhost/api/matrix", {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data)
//         });
//
//         // Handle the response
//         if (response.ok) {
//             console.log("Success:", await response.json());
//         } else {
//             console.error("Server Error:", response.statusText);
//         }
//     } catch (error) {
//         console.error("Network Error:", error);
//     }
// }


async function adjust(operation) {
    const event_id = String(Math.floor(Math.random() * 10000) + 1);
    const adjustment = parseFloat(document.getElementById('adjustmentInput').value);
    const operationType = operation === 'add' ? 'increment' : 'decrement';

    console.log(`${operationType} ${adjustment}`);
    await sendEventAPIRequest(operationType, adjustment);
    // await sendMatrixAPIRequest(operationType, event_id);
}

async function sendEventAPIRequest(operation, value) {
    const userId = document.getElementById('userDropdown').value;
    const repositoryId = document.getElementById('repositoryDropdown').value;

    const data = {
        type: operation,
        repositoryId,
        userId: userId,
        value
    };

    try {
        const response = await fetch('https://localhost/api/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            console.log('Success:', await response.json());
        } else {
            console.error('Server Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('increment').addEventListener('click', () => adjust('add'));
document.getElementById('decrement').addEventListener('click', () => adjust('subtract'));
