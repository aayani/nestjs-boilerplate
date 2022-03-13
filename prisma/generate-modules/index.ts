import * as app from './app'
;(async () => {
  try {
    await app.bootstrap()
  } catch (err: any) {
    console.error(err.message, err.stack)
    process.exit(1)
  }
})()
