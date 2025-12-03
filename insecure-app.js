// insecure-app.js
// This file intentionally contains security vulnerabilities for analysis purposes.
// DO NOT USE IN PRODUCTION

const http = require('http');
const url = require('url');
const fs = require('fs');
const crypto = require('crypto');
const mysql = require('mysql');

// Hardcoded credentials (CWE-798)
const DB_USER = 'admin';
const DB_PASS = 'password123';
const SECRET_KEY = 'supersecretkey';

// Insecure MySQL connection (no SSL)
const connection = mysql.createConnection({
  host: 'localhost',
  user: DB_USER,
  password: DB_PASS,
  database: 'testdb'
});

// Insecure server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Insecure routing
  if (pathname === '/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      // Vulnerable to SQL Injection (CWE-89)
      const { username, password } = JSON.parse(body);
      const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
      connection.query(query, (err, results) => {
        if (err) {
          res.writeHead(500);
          res.end('Database error');
        } else if (results.length > 0) {
          res.writeHead(200);
          res.end('Login successful');
        } else {
          res.writeHead(401);
          res.end('Invalid credentials');
        }
      });
    });
  } else if (pathname === '/xss') {
    // Reflected XSS (CWE-79)
    const name = parsedUrl.query.name || '';
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`<h1>Hello, ${name}</h1>`);
  } else if (pathname === '/file') {
    // Path Traversal (CWE-22)
    const file = parsedUrl.query.path;
    fs.readFile(file, (err, data) => {
      if (err) {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(200);
        res.end(data);
      }
    });
  } else if (pathname === '/eval') {
    // Arbitrary Code Execution (CWE-94)
    let code = parsedUrl.query.code;
    try {
      let result = eval(code); // Dangerous
      res.writeHead(200);
      res.end('Result: ' + result);
    } catch (e) {
      res.writeHead(400);
      res.end('Error');
    }
  } else if (pathname === '/crypto') {
    // Weak cryptography (CWE-327)
    let text = parsedUrl.query.text || '';
    let cipher = crypto.createCipher('des', SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
    res.writeHead(200);
    res.end('Encrypted: ' + encrypted);
  } else if (pathname === '/deserialize') {
    // Insecure deserialization (CWE-502)
    let objStr = parsedUrl.query.obj;
    try {
      let obj = eval('(' + objStr + ')'); // Dangerous
      res.writeHead(200);
      res.end('Deserialized: ' + JSON.stringify(obj));
    } catch (e) {
      res.writeHead(400);
      res.end('Error');
    }
  } else if (pathname === '/upload') {
    // Insecure file upload (CWE-434)
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      let filename = parsedUrl.query.filename;
      fs.writeFile(filename, body, err => {
        if (err) {
          res.writeHead(500);
          res.end('Upload failed');
        } else {
          res.writeHead(200);
          res.end('File uploaded');
        }
      });
    });
  } else if (pathname === '/infoleak') {
    // Information leakage (CWE-200)
    res.writeHead(200);
    res.end('Secret key: ' + SECRET_KEY);
  } else if (pathname === '/redirect') {
    // Open redirect (CWE-601)
    let target = parsedUrl.query.target;
    res.writeHead(302, { Location: target });
    res.end();
  } else {
    // Default response
    res.writeHead(200);
    res.end('Welcome to insecure-app!');
  }
});

server.listen(8080, () => {
  console.log('Insecure server running on port 8080');
});

// --- Filler code to reach ~1000 lines ---
// The following code is intentionally repetitive and insecure for analysis purposes
for (let i = 0; i < 950; i++) {
  // Insecure logging (CWE-532)
  fs.appendFile('log.txt', `Log entry ${i}: SECRET_KEY=${SECRET_KEY}\n`, err => {
    if (err) {
      // Ignore errors
    }
  });
}

// End of insecure-app.js
