import { useEffect, useRef } from 'react';
import { ui, uiConfig } from './firebaseui-config.js';

const Auth = () => {
  const uiContainer = useRef(null);

  useEffect(() => {
    ui.start(uiContainer.current, uiConfig);

    return () => {
      ui.delete();
    }
  }, []);

  return <div ref={uiContainer} />
}

export default Auth;