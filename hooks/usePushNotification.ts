import {
  getMessaging,
  getToken as getFBToken,
  isSupported,
  Messaging,
  onMessage as onFBMessage,
} from 'firebase/messaging';
import { useRouter } from 'next/router';
import { useCallback, useLayoutEffect, useRef } from 'react';

const usePushNotification = () => {
  const messagingRef = useRef<Messaging>();
  const router = useRouter();
  const checkPermission = useCallback(async () => {
    if (!(await isSupported())) return false;
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }, []);

  useLayoutEffect(() => {
    messagingRef.current = getMessaging();
  }, []);

  const onMessage = useCallback(() => {
    if (!messagingRef.current) return null;
    return onFBMessage(messagingRef.current, payload => {
      if (!payload.notification) return;
      const { title, ...options } = payload.notification;
      if (!title) return;
      const notification = new Notification(title, options);
      notification.onclick = () => {
        router.push('/call');
        notification.close();
      };
    });
  }, [router]);

  const getToken = useCallback(async () => {
    if (!(await checkPermission()) || !messagingRef.current) return null;
    const token = await getFBToken(messagingRef.current, {
      vapidKey: process.env.WEB_PUSH_PUBLIC_KEY,
    });
    return token;
  }, [checkPermission]);

  return { getToken, onMessage };
};

export { usePushNotification };
