import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { verAutenticacion } from "./firebase.js";

import { getStorage, uploadBytesResumable, getDownloadURL, ref } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";

const db = getFirestore();
var operacion = 1;
var idUsuarioGlobal;

window.onload = function () {
    verAutenticacion();
    cargarUsuarios();
}

window.operar = function operar() {
    if (operacion == 1) {
        guardar();
    } else {
        editar();
        limpiarDatos();
    }
}

window.abrirModal = function abrirModal(idUsuario) {
    if (idUsuario == 0) {
        operacion = 1;
    } else {
        operacion = 2;
        idUsuarioGlobal = idUsuario;
        cargarDatos(idUsuario);

        //guardar(band,idUsuario);
    }
    limpiarDatos();
}

function limpiarDatos() {
    document.getElementById("txtUsuario").value = "";
    document.getElementById("txtCorreo").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtCedula").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtRol").value = "";

    document.getElementById("alertaErrorCrearUsuario").style.display = "none";
    document.getElementById("alertaErrorCrearUsuario").innerHTML = "";
}

function cargarUsuarios() {

    let contenido = "<table class='table mt-2'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<th>Nombre</th>";
    contenido += "<th>Apellido</th>";
    contenido += "<th>Telefono</th>";
    contenido += "<th>Rol</th>";
    contenido += "<th>Opciones</th>";

    contenido += "</tr>";
    contenido += "</thead>";

    contenido += "<tbody>";

    const q = query(collection(db, "usuarios"), where("visible", "==", true));
    getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(rpta => {
            const fila = rpta.data();
            contenido += "<tr>";
            contenido += "<td>" + fila.nombre + "</td>";
            contenido += "<td>" + fila.apellido + "</td>";
            contenido += "<td>" + fila.telefono + "</td>";
            contenido += "<td>" + fila.rol + "</td>";
            contenido += "<td>";
            contenido += "<input type='button' class='btn btn-info' value='Editar' onclick='abrirModal(\"" + rpta.id + "\")' data-toggle='modal' data-target='#exampleModal' />";
            contenido += "&nbsp&nbsp&nbsp&nbsp&nbsp";
            contenido += "<input type='button' value='Eliminar' class='btn btn-danger' onclick='eliminar(\"" + rpta.id + "\")' />";
            contenido += "</td>";
            contenido += "</tr>";
        });

        contenido += "</tbody>";
        contenido += "</table>";
        document.getElementById("divUsuarios").innerHTML = contenido;

    }).catch((error) => {
        console.log(error);
    });
}

function guardar() {

    //Agregar validaciones
    const usuario = document.getElementById("txtUsuario").value;
    const correo = document.getElementById("txtCorreo").value;
    const nombre = document.getElementById("txtNombre").value;
    const apellido = document.getElementById("txtApellido").value;
    const cedula = document.getElementById("txtCedula").value;
    const telefono = document.getElementById("txtTelefono").value;
    const rol = document.getElementById("txtRol").value


    const newUser = doc(collection(db, "usuarios"));
    setDoc(newUser, {
        usuario: usuario,
        correo: correo,
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        telefono: telefono,
        rol: rol,
        visible: true
    }).then(() => {
        alert("Agregado correctamente");
        location.reload();

    }).catch(error => {
        document.getElementById("alertaErrorCrearUsuario").style.display = "block";
        document.getElementById("alertaErrorCrearUsuario").innerHTML = error.errorMessage;
    });
}

function editar() {
     //Agregar validaciones
     const usuario = document.getElementById("txtUsuario").value;
     const correo = document.getElementById("txtCorreo").value;
     const nombre = document.getElementById("txtNombre").value;
     const apellido = document.getElementById("txtApellido").value;
     const cedula = document.getElementById("txtCedula").value;
     const telefono = document.getElementById("txtTelefono").value;
     const rol = document.getElementById("txtRol").value

    const usuarioRef = doc(db, "usuarios", idUsuarioGlobal);
    updateDoc(usuarioRef, {
        usuario: usuario,
        correo: correo,
        nombre: nombre,
        apellido: apellido,
        cedula: cedula,
        telefono: telefono,
        rol: rol,
        visible: true
    }).then(() => {
        alert("Editado correctamente");
        cargarUsuarios();
    }).catch(error => {
        document.getElementById("alertaErrorCrearUsuario").style.display = "block";
        document.getElementById("alertaErrorCrearUsuario").innerHTML = error.errorMessage;

    });
}

window.eliminar = function eliminar(idUser) {
    const usuarioRef = doc(db, "usuarios", idUser);
    updateDoc(usuarioRef, {
        visible: false
    }).then(() => {
        alert("Eliminado correctamente");
        cargarUsuarios();
    }).catch((error) => {
        alert("Ocurrio un error al eliminar");
        console.log(error);
    });
}

function cargarDatos(idUsuario) {

    const docRef = doc(db, "usuarios", idUsuario);
    getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {

            const data = docSnap.data();

            document.getElementById("txtUsuario").value = data.usuario;
            document.getElementById("txtCorreo").value = data.correo;
            document.getElementById("txtNombre").value = data.nombre;
            document.getElementById("txtApellido").value = data.apellido
            document.getElementById("txtCedula").value = data.cedula;
            document.getElementById("txtTelefono").value = data.telefono;
            document.getElementById("txtRol").value = data.rol;


        } else {
            alert("No se puede encontrar el usuario");
        }
    }).catch((error) => {
        alert("Ocurrio un error" + error.message);
    });

}


