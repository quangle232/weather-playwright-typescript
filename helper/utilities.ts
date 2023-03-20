
export function generateCurrentDateTime() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    // Will display in 2022-12-13
    const formattedToday = yyyy + "-" + mm + "-" + dd;
  
    // get current time
    let unix_timestamp = Date.now();
    var time = new Date(unix_timestamp);
    var hours = time.getHours();
    var minutes = "0" + time.getMinutes();
    var seconds = "0" + time.getSeconds();
  
    // Will display in 2022-12-13_10-30-23 format
    const output =
      formattedToday +
      "_" +
      hours +
      "-" +
      minutes.substr(-2) +
      "-" +
      seconds.substr(-2);
  
    return output;
  }