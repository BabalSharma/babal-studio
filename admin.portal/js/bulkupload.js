import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } 
  from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ================= CSV PARSER =================
function parseCSV(text) {
  const lines = text.split("\n").filter(l => l.trim());
  const data = [];

  for (let line of lines.slice(1)) { // skip header
    const row = [];
    let current = "";
    let inQuotes = false;

    for (let char of line) {
      if (char === '"' && !inQuotes) {
        inQuotes = true;
      } else if (char === '"' && inQuotes) {
        inQuotes = false;
      } else if (char === "," && !inQuotes) {
        row.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    row.push(current.trim());
    data.push(row);
  }

  return data;
}

// ================= CLEAN NUMBER =================
function cleanNumber(str) {
  if (!str) return 0;
  return Number(str.replace(/[^0-9.]/g, "")) || 0;
}

// ================= DOM ELEMENTS =================
const input = document.getElementById("csvInput");
const statusBox = document.getElementById("uploadStatus");
const statusText = document.getElementById("uploadText");

input.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  input.disabled = true;
  statusBox.style.display = "block";
  statusText.textContent = "Reading file...";

  const text = await file.text();
  const rows = parseCSV(text);

  let uploaded = 0;
  const total = rows.length;

  for (let cols of rows) {
    if (cols.length < 10) continue; // skip incomplete rows

    let [
      category,
      name,
      description,
      imageUrl,
      oldPrice,
      offerPrice,
      priceUnit,
      advancePercent,
      deliveryHours,
      status
    ] = cols;

    // Clean numbers
    const price = cleanNumber(offerPrice);
    const old = cleanNumber(oldPrice);
    const advPercentNum = Number(advancePercent) || 50;
    const delivery = Number(deliveryHours) || 24;

    // Determine if service is variable (based on unit being non-currency)
    const currencySymbols = ["₹", "$", "€"];
    const isVariable = priceUnit && !currencySymbols.includes(priceUnit);

    // Skip invalid fixed-price services
    if (!isVariable && price <= 0) {
      console.warn("Skipped:", name);
      continue;
    }

    const advanceAmount = isVariable ? 0 : Math.ceil(price * advPercentNum / 100);

    // Upload to Firestore
    await addDoc(collection(db, "services"), {
      category,
      name,
      description,
      imageUrl,
      oldPrice: old || null,       // ✅ always store oldPrice if available
      offerPrice: price,
      priceUnit: isVariable ? priceUnit : null, // only store unit if variable
      advancePercent: advPercentNum,
      advanceAmount,
      deliveryHours: delivery,
      pricingType: isVariable ? "variable" : "fixed",
      status: status || "Active",
      featured: false,
      createdAt: serverTimestamp()
    });

    uploaded++;
    statusText.textContent = `Uploading ${uploaded} / ${total} services...`;
  }

  statusText.textContent = "✅ Upload completed successfully!";
  input.disabled = false;
});
