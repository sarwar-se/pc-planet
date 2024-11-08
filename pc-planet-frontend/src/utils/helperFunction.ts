export const convertToBanglaDigits = (number: number): string => {
  const banglaDigitsMap: { [key: string]: string } = {
    "0": "০",
    "1": "১",
    "2": "২",
    "3": "৩",
    "4": "৪",
    "5": "৫",
    "6": "৬",
    "7": "৭",
    "8": "৮",
    "9": "৯",
  };

  const result = number
    .toString()
    .replace(/[0-9]/g, (digit) => banglaDigitsMap[digit]);

  return result;
};
