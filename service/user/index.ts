import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@service/app';

async function updatePassword(email: string) {
  const ok = window.confirm('비밀번호를 초기화 하시겠습니까?');
  if (ok) {
    auth.languageCode = 'ko';
    sendPasswordResetEmail(auth, email)
      .then(() => alert(`${email} 으로 재설정 메일을 보냈습니다.`))
      .catch(e => console.log(e));
  }
}

export const userService = {
  updatePassword,
};
