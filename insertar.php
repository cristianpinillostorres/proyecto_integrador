<?php
include("conexion.php");
$con=conectar();

$id=$_POST['id'];
$cedula=$_POST['cedula'];
$nombre=$_POST['nombre'];
$apellidos=$_POST['apellidos'];


$sql="INSERT INTO administrador VALUES('$id','$cedula','$nombre','$apellidos')";
$query= mysqli_query($con,$sql);

if($query){
    Header("Location: administradorFuncionario.html");
    
}else {
}
?>