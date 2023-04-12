import {
  differenceInCalendarDays,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
  differenceInCalendarYears,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

// TODO: 화면에서 2~3번 호출되는데 이 함수때문에 화면 그려지는거 느려지면 수정 필요
const getFormattedTime = (now: Date, time: Date) => {
  const dayDiff = differenceInCalendarDays(now, time);
  const weekDiff = differenceInCalendarWeeks(now, time);
  const monthDiff = differenceInCalendarMonths(now, time);
  const yearDiff = differenceInCalendarYears(now, time);
  const hourDiff = differenceInHours(now, time);
  const minuteDiff = differenceInMinutes(now, time);

  if (yearDiff > 0) return `${yearDiff}년 전`;
  if (monthDiff > 0) return `${monthDiff}달 전`;
  if (weekDiff > 0) return `${weekDiff}주 전`;
  if (dayDiff > 0) return `${dayDiff}일 전`;
  if (hourDiff > 0) return `${hourDiff}시간 전`;
  if (minuteDiff >= 0) return `${minuteDiff}분 전`;
  return `${Math.abs(minuteDiff)}분 후`;
};

export { getFormattedTime };
