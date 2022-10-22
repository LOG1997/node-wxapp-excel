const ExcelJS = require("exceljs");
const dayjs = require("dayjs");
const path = require("path");
const fs = require("fs");
exports.nodexlsx = (req, res) => {
  let path = fs.readFileSync(`${__dirname}/new.xlsx`);
  let sheets = nodeXlsx.parse(path);
  const today = dayjs().format("YYYY.MM.DD");
  console.log("今天日期:", today);
  sheets.forEach((sheet) => {
    let oldData = sheet.data[1];
    console.log("excel-name:", sheet.name);

    console.log("😉sheet.data.length:", oldData[oldData.length - 1]);
    let regStr = oldData[oldData.length - 1].match(/\d{4}\.\d{2}\.\d{2}/g);
    let newStr = oldData[oldData.length - 1].replace(regStr, today.toString());
    oldData.splice(oldData.length - 1, 1, newStr);
    console.log("new-data:", oldData.slice(-1));
  });

  let buffer = nodeXlsx.build(sheets);
  fs.writeFileSync(`${__dirname}/new.xlsx`, buffer, { flag: "w" });
};
exports.xlsx = async (req, res) => {
  console.log("😎来了");
  const workbook = new ExcelJS.Workbook();
  const today = dayjs().format("YYYY.MM.DD");
  await workbook.xlsx.readFile(`./new.xlsx`);
  console.log("今天日期:", today);
  // workbook.eachSheet((worksheet, sheetId) => {
  //   console.log("😉sheetId:", sheetId);
  //   console.log("😉worksheet.name:", worksheet.name);
  //   let row2 = worksheet.getRow(2);
  //   console.log("😉row2:", row2.values.length);
  //   for (let i = 0; i < row2.values.length + 1; i++) {
  //     let cell_data = worksheet.getRow(2).getCell(i + 1).value;
  //     if (cell_data) {
  //       cell_data = cell_data.replace(/\d{4}\.\d{2}\.\d{2}/g, today.toString());
  //     }
  //     console.log("😉cell_data:", cell_data);
  //   }
  // });
  const worksheet1 = workbook.getWorksheet("涉疫人员信息统计表");
  const cell_date1 = worksheet1.getRow(2).getCell(10);
  console.log("😉cell_date1:", cell_date1.value);
  cell_date1.value = cell_date1.value.replace(
    /\d{4}\.\d{2}\.\d{2}/g,
    today.toString()
  );
  const worksheet2 = workbook.getWorksheet("疫苗接种情况统计表");
  const cell_date2 = worksheet2.getRow(2).getCell(7);
  console.log("😉cell_date1:", cell_date2.value);
  cell_date2.value = cell_date2.value.replace(
    /\d{4}\.\d{2}\.\d{2}/g,
    today.toString()
  );
  const worksheet3 = workbook.getWorksheet("离蓉人员信息统计表");
  const cell_date3 = worksheet3.getRow(2).getCell(13);
  console.log("😉cell_date1:", cell_date3.value);
  cell_date3.value = cell_date3.value.replace(
    /\d{4}\.\d{2}\.\d{2}/g,
    today.toString()
  );
  // console.log("😉cell_date2:", cell_date.value);

  await workbook.xlsx.writeFile(`./new1.xlsx`);
  const filePath = fs.createReadStream("./new1.xlsx").pipe(res);

  res.setHeader("content-Type", `${today.toString().replaceAll(".", "")}`);
  // res.setHeader("content-Type", `${fileName}`);
  console.log("😉fileName:", res.headers);
  filePath
    .on("data", (data) => {
      res.send(data, "binary");
    })
    .on("end", () => {
      res.end();
    });
};
