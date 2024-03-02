/** @type {import('next').NextConfig} */
import WithPWA from '@ducanh2912/next-pwa';

const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "**",
            },
            {
              protocol: "http",
              hostname: "**",
            },
          ],
    },
};

export default WithPWA({
  cacheOnFrontEndNav: true,
    aggressiveFrontEndNavCaching: true,
    reloadOnOnline: true,
    dest: "public",
    fallbacks: {
        document: "/offline",
    },
    workboxOptions: {
        disableDevLogs: true
    }
})(nextConfig);
