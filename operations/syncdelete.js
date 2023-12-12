const fs = require("fs");
fs.readFile("/Users/Sanjana/Documents/From_Windows_Data/SEM-6/FSE/node/learn-node/data/test.txt", (err, data) => {
  if (err) console.log(err.message);
  else  {
    console.log(data);
    try {
      // delete the file
      fs.unlinkSync("/Users/Sanjana/Documents/From_Windows_Data/SEM-6/FSE/node/learn-node/data/test.txt");
      console.log("File deleted successfully.");
    } catch (unlinkErr) {
      console.log(unlinkErr.message);
    }
  }
});
	// delete the file

