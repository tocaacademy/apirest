const fetch = require("node-fetch");
const fetchGet = (url) => {
  return new Promise(async (resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};

const fetchUser = async (req, res) => {
  try {
    const user = await fetchGet("https://jsonplaceholder.typicode.com/users");
    return res.status(200).send({
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = fetchUser;
