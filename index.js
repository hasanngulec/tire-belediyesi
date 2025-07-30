import { registerRootComponent } from 'expo';
import App from './src/App';

// Remote update hatalarını yakala
if (__DEV__) {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('java.io.IOException: failed to download remote update')) {
      console.log('Remote update hatası yakalandı ve görmezden gelindi');
      return;
    }
    originalConsoleError.apply(console, args);
  };
}

registerRootComponent(App); 