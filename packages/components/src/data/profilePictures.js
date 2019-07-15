export const PROFILE_PICTURES = [
  'https://i.imgur.com/tbOLQeH.jpg',
  'https://i.imgur.com/sFTEQue.jpg',
  'https://i.imgur.com/jEIGkY3.jpg',
  'https://i.imgur.com/l8xXYHW.jpg',
  'https://i.imgur.com/49roq8L.jpg',
  'https://i.imgur.com/qIEKN0K.jpg',
  'https://i.imgur.com/39S9ibG.jpg',
  'https://i.imgur.com/XppQNfI.jpg',
  'https://i.imgur.com/SgBev70.jpg',
  'https://i.imgur.com/CsdYbl2.png',
  'https://i.imgur.com/2EGre4g.jpg',
  'https://i.imgur.com/TcaRV9E.jpg',
  'https://i.imgur.com/q17qkxj.jpg',
  'https://i.imgur.com/f44KPWS.jpg',
  'https://i.imgur.com/6l4f5y7.jpg',
  'https://i.imgur.com/2VVnDtR.jpg',
  'https://i.imgur.com/dy2CzRA.jpg',
  'https://i.imgur.com/v3UrvqG.jpg',
  'https://i.imgur.com/Zy82SGQ.jpg',
  'https://i.imgur.com/B6zrQdJ.jpg',
  'https://i.imgur.com/0NWJqBL.jpg',
  'https://i.imgur.com/VsT70UP.jpg',
  'https://i.imgur.com/3L3T3TT.jpg',
  'https://i.imgur.com/rlqmlVw.png'
];

export const DEFAULT_PICTURE = PROFILE_PICTURES[PROFILE_PICTURES.length - 1];

export function randomPicture() {
  return PROFILE_PICTURES[Math.floor(Math.random() * PROFILE_PICTURES.length)];
}
