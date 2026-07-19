module.exports = {
  name: "Kerra's Birthday",
  email: "",
  phoneForTel: "",
  phoneFormatted: "",
  address: {
    lineOne: "",
    lineTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    mapLink: "",
  },
  socials: {
    facebook: "",
    instagram: "",
  },
  //! Include the file protocol (https://) and NO trailing slash
  domain: "https://lewis891.github.io",
  isProduction: process.env.ELEVENTY_ENV === "PROD",
};
