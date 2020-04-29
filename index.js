const fs = require("fs");

fs.readFile(
  "./data/Claim_Comments_From_Feb_01_2009_and_All_Open.txt",
  "utf8",
  function (err, data) {
    let rows = data.split("\t");
    let json = [];
    let keys = [];

    rows.forEach((value, index) => {
      // get the keys from the first row in the tab delimited file
      if (index < 1) {
        keys = value.split("\t");
        // put the values from these rows into object literals
      } else {
        values = value.split("\t");
        json[index - 1] = values
          .map((value, index) => {
            return {
              [keys[index]]: value
            };
          })
          .reduce((currentValue, previousValue) => {
            return {
              ...currentValue,
              ...previousValue
            };
          });
      }
    });

    // convert the array of objects into json string and then write it back out to a file
    let jsonStr = JSON.stringify(json);
    fs.writeFileSync("./data/Claim_Comments_json.json", jsonStr, {
      encoding: "utf8"
    });
  }
);
