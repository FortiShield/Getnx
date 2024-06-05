process.env.GETNX_SHOULD_TRACK_IMAGE_CDN_URLS = "true"

// See https://github.com/inrupt/solid-client-authn-js/issues/1676
if (
  typeof globalThis.TextEncoder === "undefined" ||
  typeof globalThis.TextDecoder === "undefined"
) {
  const utils = require("util")
  globalThis.TextEncoder = utils.TextEncoder
  globalThis.TextDecoder = utils.TextDecoder
}

jest.mock(`getnx-worker`, () => {
  const getnxWorker = jest.requireActual(`getnx-worker`)

  const { WorkerPool: OriginalWorkerPool } = getnxWorker

  class WorkerPoolThatCanUseTS extends OriginalWorkerPool {
    constructor(workerPath, options) {
      options.env = {
        ...(options.env ?? {}),
        NODE_OPTIONS: `--require ${require.resolve(
          `./packages/getnx/src/utils/worker/__tests__/test-helpers/ts-register.js`
        )}`,
      }
      super(workerPath, options)
    }
  }

  return {
    ...getnxWorker,
    WorkerPool: WorkerPoolThatCanUseTS,
  }
})
