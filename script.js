// CONFIGURAÇÃO FIREBASE
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDq9cGqDjgWb4nsIW-cCsnOuUjkgFViihQ",
  authDomain: "sa5-iot.firebaseapp.com",
  databaseURL: "https://sa5-iot-default-rtdb.firebaseio.com",
  projectId: "sa5-iot",
  storageBucket: "sa5-iot.firebasestorage.app",
  messagingSenderId: "830559223381",
  appId: "1:830559223381:web:12373109293c4fd4289edc"
};


const app = initializeApp(firebaseConfig);

// INICIALIZA FIREBASE
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();
const ledRef = database.ref("leds/led1");

// FAZ LOGIN E LIBERA OS BOTÕES
auth.signInWithEmailAndPassword("henocosantos@gmail.com", "admin123")
  .then(() => {
    console.log("Autenticado no Firebase.");
    document.getElementById("ligar").disabled = false;
    document.getElementById("desligar").disabled = false;
  })
  .catch((error) => {
    console.error("Erro ao autenticar:", error.message);
    document.getElementById("status").innerHTML = "Erro de autenticação.";
    document.getElementById("status").style.color = "red";
  });

// BOTÃO LIGAR
document.getElementById("ligar").addEventListener("click", function () {
  ledRef.set(true);
});

// BOTÃO DESLIGAR
document.getElementById("desligar").addEventListener("click", function () {
  ledRef.set(false);
});

// ATUALIZA STATUS EM TEMPO REAL
ledRef.on("value", function (snapshot) {
  let estado = snapshot.val();
  if (estado === true) {
    document.getElementById("status").innerHTML = "Status: LED LIGADO";
    document.getElementById("status").style.color = "green";
  } else {
    document.getElementById("status").innerHTML = "Status: LED DESLIGADO";
    document.getElementById("status").style.color = "red";
  }
});