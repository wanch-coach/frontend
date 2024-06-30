import withPWA from "next-pwa";

// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
};

// Configuration object tells the next-pwa plugin
export default withPWA({
  dest: "public", // PWA 파일의 대상 디렉터리
  disable: process.env.NODE_ENV === "development", // 개발 모드에서 PWA 비활성화
  register: true, // PWA 서비스 워커 등록
  skipWaiting: true, // 서비스 워커 활성화 대기 건너뛰기
})(nextConfig);
