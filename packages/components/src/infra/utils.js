
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
