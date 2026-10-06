const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'UP' }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Backend Service Running\n');
  }
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
