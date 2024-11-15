export const validateFullName = (fullname) => {};

export const validBirthDate = (date, now) => {
  const age = now - date;
  if (age < 18 || age > 60) return false;
  return true;
};

export const generateTestData = (fullName) => {
  const email =
    fullName.split(" ")[0].toLowerCase() +
    fullName.split(" ")[1].toLowerCase() +
    ".1@test.com";
  const password = email.split("@")[0] + "123";
  const date = new Date();
  const phoneNumber =
    "1" +
    date.getDate() +
    "" +
    date.getMonth() +
    date.getFullYear() +
    date.getHours();
  return {
    Email: email,
    Password: password,
    PhoneNumber: phoneNumber.slice(0, 10),
  };
};
