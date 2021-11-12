import { getFirestore, collection, query, where, getDocs, doc, setDoc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";

import { verAutenticacion } from "./firebase.js";

const db = getFirestore();
var operacion = 1;
var idClienteGlobal;

window.onload = function () {
    verAutenticacion();
    cargarClientes();
}

window.operar = function operar() {
    if (operacion == 1) {
        guardar();
    } else {
        editar();
        limpiarDatos();
    }
}

window.abrirModal = function abrirModal(idCliente) {
    if (idCliente == 0) {
        operacion = 1;
    } else {
        operacion = 2;
        idClienteoGlobal = idCliente;
        cargarDatos(idCliente);
    }
    limpiarDatos();
}

function limpiarDatos() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNit").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("alertaErrorCrearUsuario").style.display = "none";
    document.getElementById("alertaErrorCrearUsuario").innerHTML = "";
}

function cargarClientes() {

    let contenido = "<table class='table mt-2'>";

    contenido += "<thead>";
    contenido += "<tr>";
    contenido += "<th>Nombre Compañia</th>";
    contenido += "<th>Nit</th>";
    contenido += "<th>Telefono</th>";
    contenido += "</tr>";
    contenido += "</thead>";
    contenido += "<tbody>";

    const q = query(collection(db, "clientes"), where("visible", "==", true));
    getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(rpta => {
            const fila = rpta.data();
            contenido += "<tr>";
            contenido += "<td>" + fila.nombre + "</td>";
            contenido += "<td>" + fila.nit + "</td>";
            contenido += "<td>" + fila.telefono + "</td>";
            contenido += "<td>";
            contenido += "<input type='button' class='btn btn-info' value='Editar' onclick='abrirModal(\"" + rpta.id + "\")' data-toggle='modal' data-target='#exampleModal' />";
            contenido += "&nbsp&nbsp&nbsp&nbsp&nbsp";
            contenido += "<input type='button' value='Eliminar' class='btn btn-danger' onclick='eliminar(\"" + rpta.id + "\")' />";
            contenido += "</td>";
            contenido += "</tr>";
        });
        contenido += "</tbody>";
        contenido += "</table>";
        document.getElementById("divClientes").innerHTML = contenido;

    }).catch((error) => {
        console.log(error);
    });
}

function guardar() {
    //Agregar validaciones
    const nombre = document.getElementById("txtNombre").value;
    const nit = document.getElementById("txtNit").value;
    const telefono = document.getElementById("txtTelefono").value;

    const newCliente= doc(collection(db, "clientes"));
    setDoc(newCliente, {

        nombre: nombre,
        nit: nit,
        telefono: telefono,
        visible: true
    }).then(() => {
        alert("Agregado correctamente");
        location.reload();

    }).catch(error => {
        document.getElementById("alertaErrorCrearCliente").style.display = "block";
        document.getElementById("alertaErrorCrearCliente").innerHTML = error.errorMessage;
    });
}

function editar() {
     //Agregar validaciones
     const nombre = document.getElementById("txtNombre").value;
     const nit = document.getElementById("txtNit").value;
     const telefono = document.getElementById("txtTelefono").value;

    const clienteRef = doc(db, "clientes", idClienteGlobal);
    updateDoc(clienteRef, {
        nombre: nombre,
        nit: nit,
        telefono: telefono,
        visible: true
    }).then(() => {
        alert("Editado correctamente");
        cargarUsuarios();
    }).catch(error => {
        document.getElementById("alertaErrorCrearCliente").style.display = "block";
        document.getElementById("alertaErrorCrearCliente").innerHTML = error.errorMessage;
    });
}

window.eliminar = function eliminar(idClientes) {
    const clienteRef = doc(db, "clientes", idClientes);
    updateDoc(clienteRef, {
        visible: false
    }).then(() => {
        alert("Eliminado correctamente");
        cargarClientes();
    }).catch((error) => {
        alert("Ocurrio un error al eliminar");
        console.log(error);
    });
}

function cargarDatos(idClientes) {
    const docRef = doc(db, "clientes", idClientes);
    getDoc(docRef).then(docSnap => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            document.getElementById("txtNombre").value = data.nombre;
            document.getElementById("txtNit").value = data.nit;
            document.getElementById("txtTelefono").value = data.telefono;
        } else {
            alert("No se puede encontrar el usuario");
        }
    }).catch((error) => {
        alert("Ocurrio un error" + error.message);
    });
}