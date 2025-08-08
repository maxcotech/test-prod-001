// Extra logger middleware stub for candidate to enhance
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m"
};

function getColor(status) {
  if (status >= 500) return colors.red;
  if (status >= 400) return colors.yellow;
  return colors.green;
}

module.exports = (req, res, next) => {
  const start = process.hrtime();
  const { method, originalUrl } = req;

  res.on('finish', () => {
    const [seconds, nanoseconds] = process.hrtime(start);
    const duration = (seconds * 1e3 + nanoseconds / 1e6).toFixed(2);
    const timestamp = new Date().toISOString();
    const color = getColor(res.statusCode);

    console.log(
      `${color}[${timestamp}] ${method} ${originalUrl} - ${res.statusCode} - ${duration}ms${colors.reset}`
    );
  });

  next();
};
