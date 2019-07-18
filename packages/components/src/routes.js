export const ROUTES = {
  HOME: '/',
  WELCOME: '/intro',
  SIGNUP: '/signup',
  LOGIN: '/login',
  QUESTIONS: '/questions',
  CHAT: '/chat',
  CHATS: '/chats',
  PROFILE: '/profile',
  PROFILE_PICTURE: '/profilePicture'
};

export function isRouteWithHeader(route) {
  switch (route) {
    case ROUTES.HOME:
    case ROUTES.QUESTIONS:
    case ROUTES.CHAT:
    case ROUTES.CHATS:
    case ROUTES.SIGNUP:
    case ROUTES.LOGIN:
    case ROUTES.PROFILE:
    case ROUTES.PROFILE_PICTURE:
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
    case ROUTES.CHATS:
    case ROUTES.PROFILE:
    case ROUTES.PROFILE_PICTURE:
      return true;
    case ROUTES.WELCOME:
    case ROUTES.SIGNUP:
    case ROUTES.LOGIN:
      return false;
  }
}
