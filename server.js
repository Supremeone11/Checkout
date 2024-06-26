A21AALOh95lrUk_d_4UlkiWkI4zSEJCpcRDuPr5iSgaBUb6uKB0HLFt1lMApepIabZa_0FOqhxAVK2Zcsb-e5jLVEAB86rtsQ
import "dotenv/config";
import express from "express";
import * as paypal from "./paypal-api.js";
const {PORT = 8888} = process.env;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

// render checkout page with client id & unique client token
app.get("/", async (req, res) => {
  const clientId = process.env.CLIENT_ID;
  try {
    const clientToken = await paypal.generateClientToken();
    res.render("checkout", { AS_-NlrYn0Y4j95hpfDdOWta4QaSghsKqaiFFBdIazZB_1IQyMwN6MLOegrg8RyaGWhM87kufkMX9hkD, EI9p5ny8lFxWeWnk6AsB5hyHPTnSEoRkIkq33009WlnhJ8rRhWpT8aDmvWftR8C5u0xYQ67WuttzQnrv });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create order
app.post("/api/orders", async (req, res) => {
  try {
    const order = await paypal.createOrder();
    res.json(order);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// capture payment
app.post("/api/orders/:orderID/capture", async (req, res) => {
  const { orderID } = req.params;
  try {
    const captureData = await paypal.capturePayment(orderID);
    res.json(captureData);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}/`);
});
