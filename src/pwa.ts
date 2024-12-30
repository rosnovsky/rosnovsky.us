import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl: string) {
    // eslint-disable-next-line no-console
    console.log('SW registered: ', swScriptUrl)
  },
  onOfflineReady() {
    // eslint-disable-next-line no-console
    console.log('PWA application ready to work offline')
  },
})
