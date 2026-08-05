import express from "express";
const app = express();
const port = 3000;

const arr :string[]=["Cairo","Baghdad"];

app.get("/", (req, res) => {
  res.send("Welcome aboard the second island! Your server is alive. ⚓");
});

app.get("/destinations",(req,res)=>{
res.send(arr); 

});

app.listen(port, () => {
  console.log(`Server is sailing at http://localhost:${port}`);
});