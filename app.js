
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
     apiKey: "AIzaSyBjzzTtIJl17ktCowriCEDjxBh--ztzJUI",
     authDomain: "identifierr.firebaseapp.com",
     databaseURL: "https://identifierr-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "identifierr",
     storageBucket: "identifierr.appspot.com",
     messagingSenderId: "1070781758437",
     appId: "1:1070781758437:web:c8f7396e6789af200c4d0c",
     measurementId: "G-GDFXKZZ1ZT"
};

let userInput = document.getElementById('user-input');
let submitBtn = document.getElementById('submit-button');
let result = document.getElementById('result');
let error = document.getElementById('error');


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const userData = ref(database, 'users/Data');


submitBtn.addEventListener('click', () => {
     if (userInput.value == '') {
          error.innerHTML = 'Please enter a name';
     } else {
          push(userData, {
               name: userInput.value
          });
          userInput.value = '';
          error.innerHTML = 'done! pushed to database';
     }
});

onValue(userData, (snapshot) => {
     let data = snapshot.val();
     let table = '';
     if (data !== null) {
          Object.keys(data).forEach(key => {
               table += `<tr>
               <td>${data[key].name}</td>
               <td><button onclick="deleteData('${key}')">Delete</button></td>
               </tr>`;
          });
     }
     result.innerHTML = table;
});

function deleteData(key) {
     remove(ref(database, 'users/Data/' + key));
}

