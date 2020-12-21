import axios from "../../utils/DiaryApi";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncValidate = (values /*, dispatch */) => {
  return sleep(1000).then(async () => {
    const response = await axios.get(
      `user/${values.username}/exists/?email=${values.email}`
    );
    let data = response.data;
    if (data.username && data.email) {
      throw {
        username: "username already taken",
        email: "email already exists",
      };
    } else if (response.data.username) {
      throw { username: "username already taken" };
    } else if (response.data.email) {
      throw { email: "already taken" };
    }
  });
};

export default asyncValidate;
