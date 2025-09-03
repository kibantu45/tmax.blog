import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.551dcf5d63a7454fab629f37cc2e187c',
  appName: 'tmax',
  webDir: 'dist',
  server: {
    url: "https://551dcf5d-63a7-454f-ab62-9f37cc2e187c.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;