import {decodeBuffer } from "./util.js";
let currentOffset = 0;

export async function loadMatrix() {
  const users = await fetch(
    `https://localhost/api/matrix?offset=${currentOffset}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((response) => response.json());

  console.log("front-end matrix: ",users)
  const tableBody = document.querySelector("#tableMatrix");
  tableBody.innerHTML = "";

  users.forEach((data) => {
    const row = tableBody.insertRow();
    const matrixString = decodeBuffer(data.matrix.data);
    row.insertCell(0).textContent = data.item_count;
    row.insertCell(1).textContent = matrixString;
    row.insertCell(2).textContent = data.repository_id;
    row.insertCell(3).textContent = data.event_id;
  });
}

export async function loadMatrixID() {
  const matrix = await fetch(`https://localhost/api/matrix/:id`).then(
    (response) => response.json()
  );

  const tableBody = document.getElementsByClassName("#tableMatrix");
  tableBody.innerHTML = "";
  matrix.forEach((data) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = data.user_id;
  });
}
