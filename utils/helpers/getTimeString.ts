/**
 * Returns a styled time string.
 *
 * @param date    The date to style.  [Date]
 * @param level   Level of detail.    ["hours" | "minutes" | "seconds"]
 * @returns       Styled time string. [str]
 */

const getTimeString = (date: Date, level: "hours" | "minutes" | "seconds") => {
  const time = new Date(date);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return `
    ${hours > 9 ? hours : "0" + hours}${
      level != "hours" ? ":" + (minutes > 9 ? minutes : "0" + minutes) : ""
    }${level == "seconds" ? ":" + (seconds > 9 ? seconds : "0" + seconds) : ""}
  `;
};

export default getTimeString;
