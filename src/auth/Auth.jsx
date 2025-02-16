import { useEffect, useRef } from 'react';
import { ui, uiConfig } from './firebaseui-config.js';

export default function Auth () {
  console.log("We're in the auth component")
  const uiContainer = useRef(null);

  useEffect(() => {
    ui.start(uiContainer.current, uiConfig);

    return () => {
      ui.delete();
    }
  }, []);

  return <div ref={uiContainer} />
}