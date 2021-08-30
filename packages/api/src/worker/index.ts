import { worker } from './worker';

worker
  .run()
  .then(() => {
    console.log('worker finished successfully');
  })
  .catch((error) => {
    console.error(error);

    process.exit(1);
  })
  .finally(() => {
    process.exit();
  });
