// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9AleI83nTxoFGQ2Om3SzfOoxfT9Y9STA",
  authDomain: "proyectointegrador-65b53.firebaseapp.com",
  projectId: "proyectointegrador-65b53",
  storageBucket: "proyectointegrador-65b53.appspot.com",
  messagingSenderId: "229701552046",
  appId: "1:229701552046:web:4ae0278beea1ca03392a3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.salir = function salir() {
  const auth = getAuth();
  signOut(auth).then(() => {
    console.log("salio");
    document.location.href = "/index.html";
  }).catch((err) => {
    alert("Se produce error al cerrar la sesion");
    console.log(err);
  });
}
export function verAutenticacion() {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Inicio sesion");  
      console.log(user);
      /*
      console.log(user);
      if (user.photoURL != null)
        document.getElementById("imgFotoUsuario").src = user.photoURL;
      else
        document.getElementById("imgFotoUsuario").src = "asset/img/nouser.jpg";
      if (user.displayName != null)
        document.getElementById("lblNombreUsuario").innerHTML = user.displayName;
      else if (user.email != null)
        document.getElementById("lblNombreUsuario").innerHTML = user.email;
      else if (user.reloadUserInfo.screenName != null)
        document.getElementById("lblNombreUsuario").innerHTML = user.reloadUserInfo.screenName;
      else
        document.getElementById("lblNombreUsuario").innerHTML = "";*/
        
    } else {
      document.location.href = "/index.html";
    }
  });
}