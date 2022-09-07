const Table = require("../models/table");
const Check = require("../models/check");
const createTable = async (req, res, next) => {
  const { user, table, openedTime, shiftId } = req.body;
  let openedDate = new Date(openedTime);
  let createdTable = new Table({
    user,
    number: table,
    isOpen: true,
    openedDate,
    checks: [],
    shift: shiftId,
  });

  try {
    await createdTable.save();
  } catch (error) {
    console.log(error);
  }

  res.json(createdTable);
};

const getOpenTables = async (req, res, next) => {
  let tables;
  try {
    tables = await Table.find({ isOpen: true }).populate();
  } catch (err) {
    console.log(err);
  }

  res.json(tables);
};

const getTable = async (req, res, next) => {
  const tableId = req.params.tId;

  let table;

  try {
    table = await Table.findById(tableId);
  } catch (err) {
    console.log(err);
  }

  res.json(table);
};

const updateChecks = async (req, res, next) => {
  const tableId = req.params.tId;
  const { multiCheck, user, number } = req.body;

  let table;
  let outMulti = [];

  try {
    table = await Table.findById(tableId);
  } catch (err) {
    console.log(err);
  }

  if (table.checks.length > multiCheck.length) {
    let diff = table.checks.length - multiCheck.length;
    let spliceIndex = table.checks.length - diff - 1;
    let removedChecks = table.checks.slice(spliceIndex);

    removedChecks.forEach(async (checkId) => {
      await Check.findById(checkId).then((check) => {
        check.remove();
      });
    });

    table.checks.splice(spliceIndex, diff);
  }

  for (let n = 0; n < multiCheck.length; n++) {
    let check;
    let openedDate = new Date();
    if (n > table.checks.length - 1) {
      let createdCheck = new Check({
        user,
        openedTime: openedDate,
        shiftId: "62ffe85bfeff47067ae18508",
        number,
        table: tableId,
        checkItems: [...multiCheck[n]],
      });

      try {
        await createdCheck.save();
      } catch (error) {
        console.log(error);
      }

      table.checks.push(createdCheck._id);
    } else {
      try {
        check = await Check.findById(table.checks[n]);
      } catch (err) {
        console.log(err);
      }

      try {
        check.checkItems = [...multiCheck[n]];
        outMulti.push([...multiCheck[n]]);
        check.save();
      } catch (err) {
        console.log(err);
      }
    }
  }

  try {
    table.save();
  } catch (err) {
    console.log(err);
  }

  res.json(table.checks);
};

const deleteTable = async (req, res, next) => {
  const tableId = req.params.tId;
  let table;

  try {
    table = await Table.findById(tableId);
  } catch (err) {
    console.log(err);
  }

  try {
    await table.remove();
  } catch (err) {
    console.log(err);
  }
};

exports.createTable = createTable;
exports.getTable = getTable;
exports.getOpenTables = getOpenTables;
exports.deleteTable = deleteTable;
exports.updateChecks = updateChecks;
