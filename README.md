<h2>Backend: </h2>
El backend está en https://github.com/ezewheel/Parking

<h3>api/auth:</h3>
<p>POST /login : recibe Username y Password y retorna {status = "ok", msg = "Login successful", token}</p>
<p>POST /register : agrega un usuario. Recibe Username, Name y Password y retorna {status = "ok", msg = "Login successful", token}</p>

<h3>api/slots:</h3>
<p>GET / : retorna una lista de {Id, Description, Parking, IsAvailable}</p>
<p>POST / : agrega una cochera. Recibe Description y retorna {Id, Description, Parking, IsAvailable}</p>
<p>PUT /{id} : modifica una cochera. Recibe Description e IsAvailable y retorna {Id, Description, Parking, IsAvailable}</p>
<p>DELETE /{id} : elimina una cochera.</p>

<h3>api/parking:</h3>
<p>POST /add : añade un estacionamiento. Recibe un slotId (id de la cochera) y Plate (patente)</p>
<p>PUT /close : cierra una venta. Recibe un Plate</p>
<p>GET /reports : devuelve una lista de {Month, ParkingCount, TotalValue}</p>

<h3>api/fees:</h3>
<p>GET / : obtiene los importes. Retorna una lista de {Type (tipo de estacionamiento), Value}</p>
<p>PUT / : modifica un importe. Recibe Type y Value y retorna {Type, Value}</p>

<h2>Notas: </h2>
<p>- El token dura 5 minutos, al expirar se retorna a /login, puede modificarse desde el servicio de autenticación del backend</p>
<p>- El backend tiene configurado abrirse en el puerto 5155</p>
<p>- Hay un usuario precargado con credenciales admin, admin</p>
