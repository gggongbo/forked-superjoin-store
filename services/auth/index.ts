import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from 'firebase/auth';
import { init } from 'next-firebase-auth';

import { CurrentUserType } from '@constants/types/redux';
import { auth } from '@services/app';

const initAuth = () => {
  init({
    authPageURL: '/login',
    appPageURL: '/makeoffer',
    loginAPIEndpoint: '/api/auth/login',
    logoutAPIEndpoint: '/api/auth/logout',
    onLoginRequestError: err => {
      console.error(err);
    },
    onLogoutRequestError: err => {
      console.error(err);
    },
    firebaseAdminInitConfig: {
      credential: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string,
        clientEmail: process.env.CLIENT_EMAIL as string,
        privateKey: process.env.PRIVATE_KEY
          ? JSON.parse(process.env.PRIVATE_KEY)
          : undefined,
      },
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL as string,
    },
    firebaseClientInitConfig: {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY as string,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    },
    cookies: {
      name: 'peeps-business-client',
      keys: [
        process.env.COOKIE_SECRET_CURRENT,
        process.env.COOKIE_SECRET_PREVIOUS,
      ],
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: true,
      signed: true,
    },
    onVerifyTokenError: err => {
      console.error(err);
    },
    onTokenRefreshError: err => {
      console.error(err);
    },
  });
};

const login = async (
  email: string,
  password: string,
): Promise<CurrentUserType | null> => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  if (userCredential) {
    const {
      uid,
      photoURL,
      displayName,
      email: userEmail,
      emailVerified,
    } = userCredential.user;
    return {
      id: uid,
      avatar: photoURL,
      displayName,
      email: userEmail,
      emailVerified,
    };
  }
  return null;
};

const logOut = (): void => {
  auth.signOut();
};

const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

const updatePassword = async (email: string) => {
  auth.languageCode = 'ko';
  return sendPasswordResetEmail(auth, email);
};

export const authService = {
  initAuth,
  login,
  logOut,
  getCurrentUser,
  updatePassword,
};
