module.exports = {
  apps: [
    {
      name: "gavior",
      cwd: "/home/ubuntu/gavior",
      script: "npm",
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      max_memory_restart: "500M",
      kill_timeout: 5000,
      wait_ready: true,
      listen_timeout: 10000,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
