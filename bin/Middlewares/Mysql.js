const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

const pool = mysql.createPool({
	connectionLimit: 50,
	queueLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DEFAULT,
	waitForConnections: true
});

async function select(sql, args = []) {
	try {
		console.log(`[MySQL] - Executing following select : ${sql}`);

		const [rows] = await pool.query(sql, args);
		if (rows.length === 1) {
			return rows[0];
		}
	} catch (error) {
		console.log(`An error occured during select ${error}`);
		throw new Error(error);
	}
}

async function selectList(sql, args = []) {
	try {
		console.log(`[MySQL] - Executing following selectList : ${sql}`);
		const [rows] = await pool.query(sql, args);
		if (rows.length >= 1) {
			return rows;
		}
	} catch (error) {
		console.log(`An error occured during selectList ${error}`);
		throw new Error(error);
	}
}

async function insert(
	sql,
	args = [],
	connectionParam = null,
	autoRelease = true
) {
	try {
		let connection =
			connectionParam === null ? await getConnection() : connectionParam;
		console.log(`[MySQL] - Executing following insert : ${sql}`);
		const [rows] = await connection.query(sql, args);
		autoRelease === true ? await connection.release() : null;
		if (rows.affectedRows === 1) {
			return rows.insertId;
		}
	} catch (error) {
		console.log(`An error occured during insert ${error}`);
		throw new Error(error);
	}
}

async function update(
	sql,
	args = [],
	connectionParam = null,
	autoRelease = true
) {
	try {
		let connection =
			connectionParam === null ? await getConnection() : connectionParam;
		console.log(`[MySQL] - Executing following update : ${sql}`);
		const [rows] = await connection.query(sql, args);
		autoRelease === true ? await connection.release() : null;
		if (rows.affectedRows >= 1) {
			return true;
		}
	} catch (error) {
		console.log(`An error occured during update ${error}`);
		throw new Error(error);
	}
}

async function remove(
	sql,
	args = [],
	connectionParam = null,
	autoRelease = true
) {
	try {
		let connection =
			connectionParam === null ? await getConnection() : connectionParam;
		console.log(`[MySQL] - Executing following delete : ${sql}`);
		const [rows] = await connection.query(sql, args);
		autoRelease === true ? await connection.release() : null;
		if (rows.affectedRows >= 1) {
			return true;
		}
	} catch (error) {
		console.log(`An error occured during delete ${error}`);
		throw new Error(error);
	}
}

async function getConnection() {
	try {
		return await pool.getConnection();
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	select: select,
	selectList: selectList,
	insert: insert,
	update: update,
	delete: remove,
	getConnection: getConnection
};
