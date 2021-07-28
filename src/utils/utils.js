export const getNumberFromPriority = (priority) => {
  switch (priority) {
    case "HIGH": return 3
    case "MEDIUM": return 2
    case "LOW": return 1
    default: return 0
  }
}
export function getNumberofSec(dateToConvert, us_encode = true) {
  let ans;
  if (us_encode === true) {
    ans = Number(dateToConvert.slice(0, 4)) * 1e7 + Number(dateToConvert.slice(5, 7)) * 1e3 + Number(dateToConvert.slice(8))
  }
  else {
    ans = Number(dateToConvert.slice(6)) * 1e7 + Number(dateToConvert.slice(3, 5)) * 1e3 + Number(dateToConvert.slice(0, 2))
  }
  return ans
}