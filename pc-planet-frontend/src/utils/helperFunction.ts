export const convertToBanglaDigits = (number: number): string => {
  const banglaDigitsMap: { [key: string]: string } = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯',
  };

  const result = number.toString().replace(/[0-9]/g, (digit) => banglaDigitsMap[digit]);

  return result;
};

export const numberFormat = (number: number) => {
  return Intl.NumberFormat().format(number);
};

type ProductStatus = {
  label: string;
  value: string;
};

export const productStatusMap = (): ProductStatus[] => {
  return [
    {
      label: 'In Stock',
      value: 'IN_STOCK',
    },
    {
      label: 'Out Of Stock',
      value: 'OUT_OF_STOCK',
    },
    {
      label: 'Up Coming',
      value: 'UP_COMING',
    },
    {
      label: 'Pre Order',
      value: 'PRE_ORDER',
    },
  ];
};

export const getAvailabilityType = (value: string | undefined): string[] => {
  return productStatusMap()
    .filter((type) => type.value === value)
    .map((type) => type.label);
};

export const getImageUrl = (fileName: string) => {
  return process.env.REACT_APP_PRODUCT_IMAGE_DIR + fileName;
};

type DropdownSelectItem = {
  value: string | number;
  label: string;
};

export const toDropdownItems = (items = [], value: number | string, label: string) => {
  const results: DropdownSelectItem[] = [];
  items.forEach((ele) => {
    results.push({
      value: ele[value],
      label: ele[label],
    });
  });

  return results;
};
