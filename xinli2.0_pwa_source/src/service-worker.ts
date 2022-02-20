import { registerSW } from 'virtual:pwa-register';

/**
 * Register service worker
 */
const updateSW = registerSW({
  onRegistered(r) {
    r &&
      setInterval(() => {
        r.update()
            .then(() => {
              console.log('Service worker has updated.');
            })
            .catch(() => {
              console.error('Service worker update failed.');
            });
      }, 60 * 60 * 1000);
  },
  onNeedRefresh() {
    setTimeout(() => {
      updateSW()
        .then(() => {
          console.log('Service worker has updated.');
        })
        .catch(() => {
          console.error('Service worker update failed.');
        });
    }, 1000);
  },
});
