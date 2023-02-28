const ArrayToString = (array: any[]) => {
  return array
    .map((item: any) => {
      return JSON.stringify(item.status);
    })
    .toString();
};

export { ArrayToString };
