import {
  getMessaging,
  getToken as getFBToken,
  Messaging,
} from 'firebase/messaging';
import { useCallback, useLayoutEffect, useRef } from 'react';

const usePushNotification = () => {
  const messagingRef = useRef<Messaging>();
  const checkPermission = useCallback(async () => {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  useLayoutEffect(() => {
    messagingRef.current = getMessaging();
  }, []);

  const getToken = useCallback(async () => {
    if (!(await checkPermission()) || !messagingRef.current) return null;
    const token = await getFBToken(messagingRef.current, {
      vapidKey: process.env.WEB_PUSH_PUBLIC_KEY,
    });
    return token;
  }, [checkPermission]);

  return { getToken };
};

export { usePushNotification };
