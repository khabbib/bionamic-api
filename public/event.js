import { decodeBuffer } from "./util.js";

export async function loadEvents() {
    try {
        const response = await fetch(`https://localhost/api/event`, {
         //   headers: {
         //       "Authorization": `Bearer ${token}`
          //  }
        });
        const events = await response.json();
        const tableBody = document.querySelector("#eventTable");
        tableBody.innerHTML = "";

        events.forEach(data => {
            const row = tableBody.insertRow();
            const eventString = decodeBuffer(data.event_.data);
            row.insertCell(0).textContent = data.event_id;
            row.insertCell(1).textContent = data.index;
            row.insertCell(2).textContent = data.time;
            row.insertCell(3).textContent = data.bionamic_user;
            row.insertCell(4).textContent = eventString; 
            row.insertCell(5).textContent = data.repository_id;
        });
    } catch (error) {
        console.error("Error loading events:", error);
    }
}
