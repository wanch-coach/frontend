import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { updateAlarmController } from "@/app/util/controller/userController";

const onMessageFCM = async () => {
  // 브라우저에 알림 권한을 요청합니다.
  const permission = await Notification.requestPermission();
  if (permission !== "granted") {
    return;
  } else {
  }
  // 이곳에도 아까 위에서 앱 등록할때 받은 'firebaseConfig' 값을 넣어주세요.
  const firebaseApp = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  });
  const messaging = getMessaging(firebaseApp);
  // 이곳 vapidKey 값으로 아까 토큰에서 사용한다고 했던 인증서 키 값을 넣어주세요.
  getToken(messaging, { vapidKey: process.env.NEXT_PUBLIC_FIREBASE_KEY_PAIR })
    .then((currentToken) => {
      if (currentToken) {
        // 정상적으로 토큰이 발급되면 토큰 저장
        updateAlarmController(currentToken);
        console.log(currentToken);
      } else {
        console.log("No registration token available. Request permission to generate one.");
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
    });

  // 메세지가 수신되면 역시 콘솔에 출력합니다.
  onMessage(messaging, (payload) => {
    alert(JSON.stringify(payload));
    console.log(payload);
  });
};

export default onMessageFCM;
