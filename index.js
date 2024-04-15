var express = require('express');
var bodyParser = require('body-parser');

var MySql = require('./modulos/mysql.js');

var app = express();
var port = process.env.PORT || 3000;

// Convierte una petición recibida (POST-GET...) a objeto JSON
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', function(req, res){
	res.status(200).send({
		message: 'GET Home route working fine!'
	});
});

app.listen(port, function(){
	console.log(`Server running in http://localhost:${port}`);
	console.log('Defined routes:');
	console.log('	[GET] http://localhost:3000/');
});


/**
 * req = request. en este objeto voy a tener todo lo que reciba del cliente
 * res = response. Voy a responderle al cliente
 * una calle nos separaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
 */
app.get('/saludo', function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
    res.send(`Hola ${req.query.nombre}, que tal?`)
	
})


app.get('/cartas', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   
	if (req.query.parametro) {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Cartas where elixir = ${req.query.parametro};`);
		res.send(respuesta)
		
	} else {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Cartas;`);
		res.send(respuesta)
	}


})

app.get('/jugadores', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   

	if (req.query.parametro) {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Jugadores where copas = ${req.query.parametro};`);
		res.send(respuesta)
		
	} else {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Jugadores;`);
		res.send(respuesta)
	}

	res.send(respuesta)

})

app.get('/mazos', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   

	if (req.query.parametro) {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Mazos where promedioElixir = ${req.query.parametro};`);
		res.send(respuesta)
		
	} else {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM Mazos;`);
		res.send(respuesta)
	}


})  

app.get('/tropaDeTorre', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   

	if (req.query.parametro) {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM TropaDeTorre where calidad = ${req.query.parametro};`);
		res.send(respuesta)
		
	} else {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM TropaDeTorre;`);
		res.send(respuesta)
	}

	res.send(respuesta)

})  

app.get('/cartasMazos', async function(req,res){
    console.log(req.query) //Los pedidos get reciben los datos del req.query
   

	if (req.query.parametro) {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM CartasMazos where posicion = ${req.query.parametro};`);
		res.send(respuesta)
		
	} else {
		let	respuesta = await MySql.realizarQuery(`SELECT * FROM CartasMazos;`);
		res.send(respuesta)
	}


	res.send(respuesta)

})  

app.post('/insertarCartas', async function(req,res) {
	console.log(req.body)
	let result = await MySql.realizarQuery(`select * from Cartas where daño=${req.body.daño};`) 
	if (result.length == 0){
		await MySql.realizarQuery(`INSERT INTO Cartas (ID_carta, elixir, daño, vida)
		VALUES (${req.body.ID_carta}, ${req.body.elixir}, ${req.body.daño},${req.body.vida})`);
		res.send("oki")

	}
	else{
		res.send("ya existre")
	}
})


app.post('/insertarJugadores', async function(req,res) {
	console.log(req.body)
	let result = await MySql.realizarQuery(`select * from Jugadores where nombre=${req.body.daño}`) 
	if (result.length == 0){
		await MySql.realizarQuery(`INSERT INTO Jugadores (ID_jugador, nombre, ultimoMazoUtilizado, copas)
		VALUES (${req.body.ID_carta}, '${req.body.nombre}', ${req.body.daño},${req.body.vida})`);
		res.send("oki")
	}
	else{
		res.send("ya existre")
	}
})

app.post('/insertarMazos', async function(req,res) {
	console.log(req.body)
	let result = await MySql.realizarQuery(`select * from Mazos where daño=${req.body.daño}`) 
	if (result.length == 0){
		await MySql.realizarQuery(`INSERT INTO Mazos (ID_carta, elixir, daño, vida)
		VALUES (${req.body.ID_carta}, ${req.body.elixir}, ${req.body.daño},${req.body.vida})`);
		res.send("oki")
	}
	else{
		res.send("ya existre")
	}
})

app.post('/insertarCartasMazos', async function(req,res) {
	console.log(req.body)
	let result = await MySql.realizarQuery(`select * from CartasMazos where estaEnCasillaDeEvolucion=${req.body.estaEnCasillaDeEvolucion}`) 
	if (result.length == 0){
		await MySql.realizarQuery(`INSERT INTO CartasMazos (ID_carta, estaEnCasillaDeEvolucion, posicion, esLaMasCaraDelMazo)
		VALUES (${req.body.ID_carta}, '${req.body.estaEnCasillaDeEvolucion}', '${req.body.posicion}','${req.body.esLaMasCaraDelMazo}')`);
		res.send("oki")
	}
	else{
		res.send("ya existre")
	}
})

app.post('/insertaTropasDeTorre', async function(req,res) {
	console.log(req.body)
	let result = await MySql.realizarQuery(`select * from TropasDeTorre where daño=${req.body.daño}`) 
	if (result.length == 0){
		await MySql.realizarQuery(`INSERT INTO TropaDeTorre (ID_tropa, daño, vida, calidad)
		VALUES (${req.body.ID_tropa}, ${req.body.daño}, ${req.body.vida}, '${req.body.calidad}')`);
		res.send("oki")
	}
	else{
		res.send("ya existre")
	}
})

app.put('/modificarCartas', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`UPDATE Cartas SET elixir=${req.body.elixir}, daño=${req.body.daño}, vida=${req.body.vida}
	where ID_carta = ${req.body.ID_carta}`);
	res.send("oki")
})

app.put('/modificarMazos', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`UPDATE Mazos SET promedio_elixir=${req.body.promedio_elixir}, winRate=${req.body.winRate}, tropas_torres=${req.body.tropas_torres}
	where ID_mazo = ${req.body.ID_mazo}`);
	res.send("oki")
})

app.put('/modificarJugadores', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`UPDATE Jugadores SET nombre=${req.body.nombre}, ultimoMazoUtilizado=${req.body.UltimoMazoUtilizado}, copas=${req.body.copas}
	where ID_jugador = ${req.body.ID_jugador}`);
	res.send("oki")
})

app.put('/modificarTropaDeTorre', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`UPDATE TropaDeTorre SET daño=${req.body.daño}, vida=${req.body.vida}, calidad=${req.body.calidad}
	where ID_Tropa = ${req.body.ID_TropaDeTorre}`);
	res.send("oki")
})

app.put('/modificarCartasMazos', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`UPDATE CartasMazos SET estaEnCasillaDeEvolucion=${req.body.estaEnCasillaDeEvolucion}, posicion=${req.body.posicion}, esLaMasCaraDelMazo=${req.body.esLaMasCaraDelMazo}
	where ID_carta = ${req.body.ID_carta}`);
	res.send("oki")
})

app.delete('/borrarCartas', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`DELETE FROM Cartas where ID_carta = ${req.body.ID_carta}`)
	res.send("oki");
})

app.delete('/borrarMazos', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`DELETE FROM Mazos where ID_mazo = ${req.body.ID_carta}`)
	res.send("oki");
})

app.delete('/borrarJugadores', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`DELETE FROM Jugadores where ID_jugador = ${req.body.ID_carta}`)
	res.send("oki");
})

app.delete('/borrarTropasDeTorre', async function(req,res) {
	console.log(req.body)
	await MySql.realizarQuery(`DELETE FROM TropaDeTorre where ID_Tropa = ${req.body.ID_Tropa}`) 
	res.send("oki");
})
app.delete('/borrarCartasMazos', async function(req,res) {
	console.log(req.body) 
	await MySql.realizarQuery(`DELETE FROM CartasMazos where ID_carta = ${req.body.ID_carta} AND ID_mazo= ${req.body.ID_mazo}`)
	res.send("oki");
})