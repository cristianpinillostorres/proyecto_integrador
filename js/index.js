import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, TwitterAuthProvider, GithubAuthProvider,FacebookAuthProvider} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";


window.iniciarSesion = function iniciarSesion() {

    const email = document.getElementById("txtcorreo").value;
    const password = document.getElementById("txtcontrasenia").value;

    if (email == "" || password == "") {
        document.getElementById("alertErrorLogueo").style.display = "block";
        document.getElementById("alertErrorLogueo").innerHTML = "Email y/o contraseña son obligatorios";
        return false;

    } else {

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            //va al index
            document.location.href = "/interfazPrincipal.html";
        }).catch((error) => {
            document.getElementById("alertErrorLogueo").style.display = "block";
            document.getElementById("alertErrorLogueo").innerHTML = error.message;
        });
    }

}

window.authGoogle = function authGoogle() {
    const provider = new GoogleAuthProvider();
    authGeneric(provider, "Google");
}

window.authTwitter = function authTwitter() {
    const provider = new TwitterAuthProvider();
    authGeneric(provider, "Twitter");
}

window.authGithub = function authGithub() {
    const provider = new GithubAuthProvider();
    authGeneric(provider, "GitHub");
}

window.authFacebook = function authFacebook() {
    const provider = new FacebookAuthProvider();
    authGeneric(provider, "Facebook");
}

function authGeneric(provider, providerName) {
    const auth = getAuth();
    signInWithPopup(auth, provider)
        .then((result) => {
            actualizarPerfil(result.user, providerName);
        }).catch((error) => {
            //const errorCode = error.code;
            //const email = error.email;
            const errorMessage = error.message;
            document.getElementById("alertErrorLogueo").style.display = "block";
            document.getElementById("alertErrorLogueo").innerHTML = errorMessage;
        });
}
