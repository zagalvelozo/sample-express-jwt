<?php
error_reporting(E_ALL);

echo "<h2>TCP/IP Connection</h2>\n";

/* Obtener el puerto para el servicio WWW. */
$service_port = 8080;  //getservbyname('www', 'tcp');

/* Obtener la dirección IP para el host objetivo. */
$address = '127.0.0.1';

/* Crear un socket TCP/IP. */
$socket = socket_create(AF_INET, SOCK_STREAM, SOL_TCP);
if ($socket === false) {
    echo "socket_create() falló: razón: " . socket_strerror(socket_last_error()) . "\n";
} else {
    echo "OK.\n";
}

echo "Intentando conectar a '$address' en el puerto '$service_port'...";
$result = socket_connect($socket, $address, $service_port);
if ($result === false) {
    echo "socket_connect() falló.\nRazón: ($result) " . socket_strerror(socket_last_error($socket)) . "\n";
} else {
    echo "OK.\n";
}

//$in = "HEAD / HTTP/1.1\r\n";  //$in .= "Host: localhost\r\n"; //$in .= "Connection: Close\r\n\r\n";
$out = '';
echo "Enviando petición HTTP HEAD ...";
echo "Leyendo respuesta:\n\n";
while(true){
$out = socket_read($socket, 2048);
echo "Servidor: $out";
$st=readline();
$length = strlen($st);
socket_write($socket, $st, $length);
socket_write ($socket, "\r\n", strlen ("\r\n"));
}
$sd='shutdown';
socket_write($socket, $sd, strlen($sd));
socket_write ($socket, "\r\n", strlen ("\r\n"));

echo "Cerrando socket...";
socket_close($socket);
echo "OK.\n\n";
?>
