const getFormattedDate = (originDate: Date, isCollapsible: boolean) => {
  try {
    console.log(originDate);
    const fullYear = originDate.getFullYear();
    const month = originDate.getMonth() + 1;
    const date = originDate.getDate();
    if (!isCollapsible) return `${fullYear}.${month}.${date}`;
    return `${fullYear}년 ${month}월 ${date}일`;
  } catch (error) {
    return originDate;
  }
};

const getFormattedTime = (originDate: any, isMeridians: boolean) => {
  try {
    let hours: number = originDate.getHours();
    let mins: string | number = originDate.getMinutes();
    let meridians: string = '오전';
    if (mins < 10) mins = `0${mins}`;
    if (!isMeridians) return `${hours}:${mins}`;
    if (hours > 12) {
      meridians = '오후';
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    } else if (hours === 12) {
      meridians = '오후';
    }
    return `${meridians} ${hours}:${mins}`;
  } catch (error) {
    return originDate;
  }
};

export { getFormattedDate, getFormattedTime };
