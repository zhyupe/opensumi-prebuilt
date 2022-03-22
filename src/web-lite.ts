import { Provider, Injectable } from '@opensumi/di';
import { BrowserModule, LogServiceForClientPath } from '@opensumi/ide-core-browser';
import { CommonServerPath, ILoggerManagerClient, KeytarServicePath } from '@opensumi/ide-core-common';
import { ICommonServer, OS, isLinux, isOSX } from '@opensumi/ide-core-common';

@Injectable()
export class BrowserCommonServer implements ICommonServer {
  async getBackendOS(): Promise<OS.Type> {
    // 这里按照 ua 去判断 backend os 没问题
    // 因为纯前端版本，目前写入时在用户浏览器中，因此按照用户浏览器 ua 对应的操作系统是 ok 的
    if (isOSX) {
      return OS.Type.OSX;
    } else if (isLinux) {
      return OS.Type.Linux;
    } else {
      return OS.Type.Windows;
    }
  }
}

@Injectable()
export class WebLiteModule extends BrowserModule {
  providers: Provider[] = [
    {
      token: ILoggerManagerClient,
      useValue: {
        getLogger: () => ({
          log: console.log.bind(console),
          debug: console.debug.bind(console),
          error: console.error.bind(console),
          warn: console.warn.bind(console),
          verbose() {},
        }),
      },
    },
    {
      token: CommonServerPath,
      useClass: BrowserCommonServer,
    },
    // {
    //   token: ExtensionNodeServiceServerPath,
    //   useClass: ExtensionClientService,
    // },
    // {
    //   token: FileSearchServicePath,
    //   useClass: MockFileSearch,
    // },
    // {
    //   token: LogServiceForClientPath,
    //   useClass: MockLogServiceForClient,
    // },
    // {
    //   token: KeytarServicePath,
    //   useClass: MockCredentialService,
    // },
    // {
    //   token: DebugPreferences,
    //   useValue: {},
    // },
    // FileProviderContribution,
    // TextmateLanguageGrammarContribution,
    // lsif client. disabled by default
    // {
    //   token: ILsifService,
    //   useClass: LsifServiceImpl,
    // },
    // LanguageServiceContribution,
  ];
}
