import BionamicSdk from "bionamic-api-sdk";
const sdk = new BionamicSdk();

// API KEY
sdk.getAPIKeys(1,2).then((res) => {
    console.log(res);
});

sdk.insertApiKey(3).then((res) => {
    console.log(res);
});

// USER
sdk.getUsers(1,2).then((res) => {
    console.log(res);
});


