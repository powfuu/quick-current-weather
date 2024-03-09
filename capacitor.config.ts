import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'convert-to-pdf',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
