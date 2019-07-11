import jsSHA from "jssha";

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

export function hashPassword(password) {
  const sha256 = new jsSHA('SHA-256', 'TEXT');
  sha256.update(password);
  const hash = sha256.getHash("HEX");
  return hash;
}

export function mergeColors(color1, color2, percent) {
  const generateHex = (r, g, b) => {
    let R = r.toString(16);
    let G = g.toString(16);
    let B = b.toString(16);

    while (R.length < 2) {
      R = `0${R}`;
    }
    while (G.length < 2) {
      G = `0${G}`;
    }
    while (B.length < 2) {
      B = `0${B}`;
    }

    return `#${R}${G}${B}`;
  };

  const mix = (start, end, prcnt) => start + prcnt * (end - start);

  const red1 = parseInt(color1[1] + color1[2], 16);
  const green1 = parseInt(color1[3] + color1[4], 16);
  const blue1 = parseInt(color1[5] + color1[6], 16);

  const red2 = parseInt(color2[1] + color2[2], 16);
  const green2 = parseInt(color2[3] + color2[4], 16);
  const blue2 = parseInt(color2[5] + color2[6], 16);

  const red = Math.round(mix(red1, red2, percent));
  const green = Math.round(mix(green1, green2, percent));
  const blue = Math.round(mix(blue1, blue2, percent));

  return generateHex(red, green, blue);
}
