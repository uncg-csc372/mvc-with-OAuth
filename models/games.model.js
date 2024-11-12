"use strict";
const db = require("./db-conn");

function getAll() {
  let sql = "SELECT * FROM Games;";
  const data = db.all(sql);
  return data;
}

function getAllByOneAttribute(attribute, value) {
  const validColumns = getColumnNames();
  if (validColumns.includes(attribute)) {
    let sql = "SELECT * FROM Games WHERE " + attribute + " =? ;";
    const data = db.all(sql, value);
    return data;
  }
}

function getOneById(id) {
  let sql = "SELECT * FROM Games WHERE id =? ;";
  const item = db.get(sql, id);
  return item;
}

function createNew(params) {
  let sql = "INSERT INTO Games " +
    "(id, name, platform, release_year, genre, publisher, developer, rating) " +
    "VALUES(?, ?, ?, ?, ?, ?, ?, ?); ";
  const info = db.run(sql, params);
  return info;
}

function getColumnNames() {
  let sql = "select name from pragma_table_info('Games');";
  const columns = db.all(sql);
  let result = columns.map(a => a.name);
  return result;
}

module.exports = {
  getAll,
  getAllByOneAttribute,
  getOneById,
  createNew
};