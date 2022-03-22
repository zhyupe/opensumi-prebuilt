import { useEffect, useState } from "react";
import { ClientApp, SlotLocation } from '@opensumi/ide-core-browser';
import { WebLiteModule } from './web-lite';

import '@opensumi/ide-core-browser/lib/style/index.less';

function useOpenSumi() {
  const [app, setApp] = useState(null)

  useEffect(() => {
    const clientApp = new ClientApp({
      modules: [
        WebLiteModule
      ],
      layoutConfig: {
        [SlotLocation.top]: {
          modules: ['@opensumi/ide-menu-bar'],
        },
        [SlotLocation.action]: {
          modules: [],
        },
        [SlotLocation.right]: {
          modules: [],
        },
        [SlotLocation.left]: {
          modules: ['@opensumi/ide-explorer', 'test-view'],
        },
        [SlotLocation.main]: {
          modules: ['@opensumi/ide-editor'],
        },
        [SlotLocation.statusBar]: {
          modules: ['@opensumi/ide-status-bar'],
        },
        [SlotLocation.bottom]: {
          modules: ['@opensumi/ide-output'],
        },
        [SlotLocation.extra]: {
          modules: [],
        },
      },
      defaultPreferences: {
        'general.theme': 'ide-light',
        'general.icon': 'vsicons-slim',
        'application.confirmExit': 'never',
        'editor.quickSuggestionsDelay': 100,
        'editor.quickSuggestionsMaxCount': 50,
        'editor.scrollBeyondLastLine': false,
        'general.language': 'en-US',
      },
      iconStyleSheets: [
        {
          iconMap: {
            explorer: 'fanhui',
            shangchuan: 'shangchuan',
          },
          prefix: 'tbe tbe-',
          cssPath: '//at.alicdn.com/t/font_403404_1qiu0eed62f.css',
        },
      ],
    });

    clientApp.fireOnReload = () => {
      window.location.reload();
    };

    clientApp.start((el) => {
      setApp(el);
      return Promise.resolve();
    });
  }, [])

  return { app }
}

function App() {
  const { app } = useOpenSumi();
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      app
      {app}
    </div>
  );
}

export default App;
