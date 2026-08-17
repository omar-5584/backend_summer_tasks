import express from "express";
import { Request,Response } from "express";
import { addSupplyentry } from "./controller/controller";
const app = express();
const port = process.env.port ||3000;

app.use(express.json())


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

app.listen(port, () => {
  console.log(`Server is sailing at http://localhost:${port}`);
});