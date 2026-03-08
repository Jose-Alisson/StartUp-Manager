export function retry({ fn, attempts = 3, interval = 1000 }): Promise<any> {
  return new Promise((resolve, reject) => {
    let attempt = 0;

    const execute = async () => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        attempt++;

        if (attempt >= attempts) {
          reject(error);
          return;
        }

        setTimeout(execute, interval);
      }
    };

    execute();
  });
}