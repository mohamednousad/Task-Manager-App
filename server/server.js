import "dotenv/config";
import app from "./app.js";
import connectDB from "./db/config.js";

const PORT = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on http://${host}:${PORT}`);
});
