module.exports = {
  apps: [
    {
      name: "gavior",
      cwd: "/home/ubuntu/gavior",
      script: "npm",
      args: "start",
      // Fork mode with a single instance.
      //
      // Cluster mode cannot work here: PM2 shares the listening socket via
      // Node's cluster module, which only reaches processes PM2 spawns itself.
      // `script: "npm"` makes each worker spawn `npm`, which spawns `next start`
      // as a *child* - that grandchild is outside the cluster, never inherits the
      // shared handle, and calls listen(3000) on its own. With 2 instances the
      // second one dies with EADDRINUSE and restarts forever.
      //
      // Running >1 instance would require `output: "standalone"` in next.config
      // and pointing `script` straight at the generated server.js.
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "500M",
      kill_timeout: 5000,
      // No wait_ready: `next start` never calls process.send("ready"), so PM2
      // would stall for listen_timeout and then force a restart on every deploy.
      listen_timeout: 10000,
      env: {
        NODE_ENV: "production",
        HOSTNAME: "127.0.0.1",
        PORT: "3000",
      },
    },
  ],
};
