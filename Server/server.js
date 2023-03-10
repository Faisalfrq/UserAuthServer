const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");

const config = require("./config/db.config");
const { mongoose } = require("./models/index");

const userRoutes = require("./routes/user.routes");
const loginRoutes = require("./routes/login.routes");


const corsOptions = {
    origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(userRoutes);
app.use(loginRoutes);

mongoose.set("strictQuery", false);

db.mongoose
  .connect(
    //`mongodb+srv://${config.userName}:${config.password}@cluster1.qhcltxw.mongodb.net/test`
    `mongodb+srv://${config.userName}:${config.password}@cluster0.symtdxi.mongodb.net/pieTechDb?retryWrites=true&w=majority`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: config.dbName,
    }
  )
  .then(() => console.log("connection to the database was successful"))
  .catch((err) => console.log("connection to the database failed", err));

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});