import { getAuth, onAuthStateChanged , updateProfile } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { verAutenticacion } from "./firebase.js";
import { getStorage, uploadBytesResumable, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

window.onload = function () {
    verAutenticacion();
}
const db = getFirestore();
const storage = getStorage();

const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    
    const docRef = doc(db, "administrador", user.uid);
    getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {

            document.getElementById("nombre").innerHTML = user.displayName;
            document.getElementById("correo").innerHTML = user.email;
            document.getElementById("foto_admin").src = user.photoURL;

        } else {
        }
    }).catch((error) => {
        console.log(error.message);
    });
    
  } else {

  }
});


    
