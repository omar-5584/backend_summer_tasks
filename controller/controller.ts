
import { google } from "googleapis";
import path, { dirname } from "node:path";
import ExcelJS, { Workbook } from "exceljs";
import { Readable } from "stream";
import { PRODUCTS_CONFIG, SupplyPayload } from "../model/model";
import { response } from "express";



const Key_Path = path.join(process.cwd(), "backend-summer-excel-19a5675df833.json");
const file_id="1_oCpZ8ihCRUT8uODBko4wipL-KBIEnB8"


const auther= new google.auth.GoogleAuth(
    {
        keyFile:Key_Path,
        scopes: ["https://www.googleapis.com/auth/drive"],
        
    }
);

const drive = google.drive({ version: "v3",auth: auther });

export async function addSupplyentry(data:SupplyPayload){
const response = await drive.files.get(
    {
      fileId: file_id,
      alt: "media",
    },
    {
      responseType: "arraybuffer",
    }
  );
  const fileBuffer = Buffer.from(response.data as unknown as ArrayBuffer);

const now=new Date()
const monthName=now.toLocaleString("ar-EG" , {month : "long"});

const workbook = new ExcelJS.Workbook();
await workbook.xlsx.load(fileBuffer as any)


let worksheet =workbook.getWorksheet(monthName)

  if (!worksheet) {throw new Error(`شيت شهر ${monthName} غير موجود في ملف الإكسيل.`);}

worksheet.views = [{ rightToLeft: true }];
const first_row=6;
const max_days=31;
let targetRow=-1;

for (let index = first_row; index < first_row+max_days; index++) {
 
  const cellvalue=worksheet.getRow(index).getCell(1).value;
  if(!cellvalue || cellvalue.toString().trim()==="")
  {

    targetRow=index;
    break;
  }
}

if (targetRow === -1) {
    throw new Error(`شيت شهر ${monthName} ممتلئ بالكامل.`);
  }


const row = worksheet.getRow(targetRow);

  const day = now.getDate();
  const monthShort = now.toLocaleString("en-US", { month: "short" });
  row.getCell(1).value = `${day}-${monthShort}`;

  PRODUCTS_CONFIG.forEach((product) => {
    const qty = Number(data[product.id] ?? 0);
    row.getCell(product.qtyCol).value = qty;
  });

  row.commit();




const updatedBuffer = await workbook.xlsx.writeBuffer();
  const stream = new Readable();
  stream.push(Buffer.from(updatedBuffer));
  stream.push(null);

  await drive.files.update({
    fileId: file_id,
    media: {
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      body: stream,
    },
  });


}





