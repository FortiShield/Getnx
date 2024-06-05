declare const _CFLAGS_: {
  GETNX_MAJOR: string
}

declare module NodeJS {
  interface Global {
    __GETNX: {
      buildId: string
      root: string
      imageCDNUrlGeneratorModulePath?: string
      fileCDNUrlGeneratorModulePath?: string
    }

    _polyfillRemoteFileCache?: import("getnx").getnxCache
  }
}
