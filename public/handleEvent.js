import { nextRepositories, previousRepositories } from "./repo.js";
import { nextUsers, previousUsers } from "./users.js";

export function setupEventListeners() {


    

    document.getElementById("loadMoreButton").addEventListener("click", nextRepositories);
    document.getElementById("loadPreviousButton").addEventListener("click", previousRepositories);
    document.getElementById("nextUsersButton").addEventListener("click", nextUsers);
    document.getElementById("previousUsersButton").addEventListener("click", previousUsers);
}
