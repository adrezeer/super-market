const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// عرض ملفات HTML وCSS وJS من المجلد الحالي
app.use(express.static(__dirname));

// ملف الـ JSON لتخزين المنتجات
const DATA_FILE = "items.json";
if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, "[]");

// API: جلب كل المنتجات
app.get("/items", (req, res) => {
  const items = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(items);
});

// API: إضافة منتج
app.post("/items", (req, res) => {
  const items = JSON.parse(fs.readFileSync(DATA_FILE));
  items.push(req.body);
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
  res.json({ message: "تم إضافة المنتج" });
});

// API: حذف منتج حسب الباركود
app.delete("/items/:barcode", (req, res) => {
  const barcode = req.params.barcode;
  let items = JSON.parse(fs.readFileSync(DATA_FILE));
  items = items.filter(item => item.barcode !== barcode);
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));
  res.json({ message: "تم حذف المنتج" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Supermarket server running at http://localhost:${PORT}`);
});
