<?php
$servername = "localhost";
$username = "dat2c2-4";
$password = "t95oqnsuoqLpR27r";
$dbname = "dat2c2_4";

$id = $_GET['var1'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT UserLogin FROM Users WHERE UserLoginId = `$id`";
$result = $conn->query($sql);
echo json_encode($result);