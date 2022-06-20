const db = require("./models");
const app = require("./app");

const connections = async () => {
  try {
    await db.sequelize.authenticate();
    app.listen(4000, () => {
      console.log(`Server is running on port ${4000}`);
    });
    // const users = await db.sequelize.query("SELECT * FROM user");
    // console.log("Connected to the database:", users);
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connections();
