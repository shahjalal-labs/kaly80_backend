module.exports = {
  apps: [
    {
      name: "kaly_server",
      script: "./dist/server.js",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "kaly_email_worker",
      script: "./dist/workers/emailWorker.js",
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
