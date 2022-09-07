const Check = require("../models/check");
const Shift = require("../models/shift");
const Table = require("../models/table");

const createCheck = async (req, res, next) => {
  const { user, openedTime, shiftId, tableId, number, checkItems } = req.body;

  let openedDate = new Date(openedTime);
  let createdCheck = new Check({
    user,
    openedTime: openedDate,
    shiftId,
    number,
    table: tableId,
    checkItems: checkItems ? checkItems : [],
  });

  try {
    await createdCheck.save();
  } catch (error) {
    console.log(error);
  }

  try {
    let shift = await Shift.findById(shiftId);
    shift.checks.push(createdCheck._id);
    await shift.save();
  } catch (error) {
    console.log(error);
  }

  let table;
  try {
    table = await Table.findById(tableId);
  } catch (err) {
    console.log(err);
  }
  table.checks.push(createdCheck._id);
  try {
    await table.save();
  } catch (err) {
    console.log(err);
  }

  res.json(createdCheck);
};

const getCheck = async (req, res, next) => {
  const checkId = req.params.cId;
  let check;
  try {
    check = await Check.findById(checkId);
  } catch (err) {
    console.log(err);
  }

  res.json(check);
};

const getCheckByTable = async (req, res, next) => {
  const tableId = req.params.tableId;
  let checks;
  let multiCheck = [];

  try {
    checks = await Check.find({ table: tableId });
  } catch (err) {
    console.log(err);
  }

  checks.forEach((check) => {
    multiCheck.push([...check.checkItems]);
  });

  res.json(multiCheck);
};

const updateCheck = async (req, res, next) => {
  const newCheckItems = req.body.checkItems;
  const checkId = req.params.cId;

  let check;

  try {
    check = await Check.findById(checkId);
  } catch (err) {
    console.log(err);
  }

  check.checkItems = newCheckItems;

  try {
    await check.save();
  } catch (err) {
    console.log(err);
  }
};

const deleteCheck = async (req, res, next) => {
  const checkId = req.params.cId;

  let check;

  try {
    check = await Check.findById(checkId);
  } catch (err) {
    console.log(err);
  }

  try {
    table = await Table.findById(check.table);
  } catch (err) {
    console.log(err);
  }

  try {
    table.checks.splice(table.checks.indexOf(checkId), 1);
    await table.save();
  } catch (err) {
    console.log(err);
  }

  try {
    await check.remove();
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({ message: "check deleted" });
};

exports.createCheck = createCheck;
exports.getCheck = getCheck;
exports.getCheckByTable = getCheckByTable;
exports.updateCheck = updateCheck;
exports.deleteCheck = deleteCheck;
