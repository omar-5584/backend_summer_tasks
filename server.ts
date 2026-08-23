import express from "express";
import cors from "cors";
import { Request,Response } from "express";
import { addSupplyentry } from "./controller/controller";
import { connectDB } from "./connection_db";
const app = express();
const port = Number(process.env.port) ||3000;

app.use(express.json())
app.use(cors());
connectDB();

app.post("/api/supplies", async (req: Request, res: Response) => {
  try {
    await addSupplyentry(req.body);
    res.status(200).json({
      success: true,
      message: "تم حفظ التوريد وتحديث الشيت بنجاح",
    });
  } catch (error) {
    console.error("Error updating sheet:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء تحديث ملف الإكسيل",
    });
  }
});

app.listen(port,"0.0.0.0", () => {
  console.log(`Server is sailing at http://localhost:${port}`);
});