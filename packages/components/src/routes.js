export const ROUTES = {
  HOME: '/',
  WELCOME: '/intro',
  SINGUP: '/singup',
  LOGIN: '/login',
  QUESTIONS: '/questions',
  CHAT: '/chat'
};

export function isRouteWithHeader(route) {
  switch (route) {
    case ROUTES.HOME:
    case ROUTES.QUESTIONS:
    case ROUTES.CHAT:
    case ROUTES.SINGUP:
    case ROUTES.LOGIN:
      return true;
    case ROUTES.WELCOME:
      return false;
  }
}

export function isRouteWithFooter(route) {
  switch (route) {
    case ROUTES.HOME:
    case ROUTES.QUESTIONS:
    case ROUTES.CHAT:
      return true;
    case ROUTES.WELCOME:
    case ROUTES.SINGUP:
    case ROUTES.LOGIN:
      return false;
  }
}
