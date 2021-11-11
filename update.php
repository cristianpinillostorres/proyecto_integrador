<?php

include("conexion.php");
$con=conectar();

$id=$_POST['id'];
$cedula=$_POST['cedula'];
$nombre=$_POST['nombre'];
$apellidos=$_POST['apellidos'];

$sql="UPDATE administrador SET  cedula='$cedula',nombre='$nombre',apellidos='$apellidos' WHERE id='$id'";
$query=mysqli_query($con,$sql);

    if($query){
        Header("Location: administradorFuncionarios.html");
    }
?>