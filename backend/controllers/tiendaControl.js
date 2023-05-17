const { matchedData } = require('express-validator');
const { tiendaModel } = require('../models');
const { userModel } = require('../models');

const { handleHttpErros } = require('../utils/handleErrors');

const createTienda = async (req, res) => {
	try {
		req = matchedData(req);
		console.log(req);
		req.imagen = req.imagen.trim();

		const dataTienda = await tiendaModel.create(req);
		const updateUser = await userModel.updateUserType(req.cliente_id, 2);

		res.send({ dataTienda });
	} catch (e) {
		console.log(e);
		handleHttpErros(res, 'ERROR_CREATE_TIENDA');
	}
};

const getTiendaByName = async (req, res) => {
	try {
		const { name } = req.params;
		const data = await tiendaModel.findTiendaByName(name);
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpErros(res, 'ERROR_GET_TIENDA_BY_NAME');
	}
};

const getTiendas = async (req, res) => {
	try {
		const { page = 0, size = 4 } = req.query;
		console.log(req.query);
		let options = {
			limit: +size,
			offset: +page * +size,
		};
		const { count, rows } = await tiendaModel.findAndCountAll(options);
		res.send({ total: count, tiendas: rows });
	} catch (e) {
		console.log(e);
		handleHttpErros(res, 'ERROR_GET_TIENDAS');
	}
};

const getTiendasByUser = async (req, res) => {
	try {
		const { id } = req.params;
		const data = await tiendaModel.FindTiendasByUser(id);
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpErros(res, 'ERROR_GET_TIENDAS_BY_USER');
	}
};

const getTiendaByRIF = async (req, res) => {
	try {
		const { RIF } = req.params;
		const data = await tiendaModel.findTiendaByRIF(RIF);
		res.send({ data });
	} catch (e) {
		console.log(e);
		handleHttpErros(res, 'ERROR_GET_TIENDA_BY_RIF');
	}
};

module.exports = {
	createTienda,
	getTiendaByName,
	getTiendas,
	getTiendasByUser,
	getTiendaByRIF,
};
