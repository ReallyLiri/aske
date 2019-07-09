export function minStr(s1, s2) {
  if (s1.localeCompare(s2) <= 0) {
    return s1;
  }
  return s2;
}

export function maxStr(s1, s2) {
  if (s1.localeCompare(s2) > 0) {
    return s1;
  }
  return s2;
}

export function nowToTimestampUtc() {
  return new Date().getTime();
}

export function utcTimestampToDate(timestamp) {
  const date = new Date(timestamp * 1000);
  const localOffset = (-1) * date.getTimezoneOffset() * 60000;
  return new Date(date - localOffset);
}
