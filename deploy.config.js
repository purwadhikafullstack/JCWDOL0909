module.exports = {
  apps: [
    {
      name: "JCWDOL0909", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8909,
      },
      time: true,
    },
  ],
};
