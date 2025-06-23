const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const cors = require("cors");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

const SECRET_KEY = "secret_key_123";
const expiresIn = "1h";


function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}


function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY);
}


server.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = router.db.get("users").value();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Неверный email или пароль" });
  }

  const { password: pw, confirmPassword, ...userData } = user; 
  const token = createToken({ id: user.id, email: user.email });

  res.status(200).json({ user: userData, token });
});


server.use((req, res, next) => {
  const openRoutes = [
    req.path.startsWith("/auth"),
    (req.method === "POST" && req.path === "/users"),
    req.method === "GET",
  ];
  
  if (openRoutes.some(Boolean)) {
    return next(); 
  }

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Требуется токен" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const verified = verifyToken(token);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Неверный или просроченный токен" });
  }
});

server.use(router);

server.listen(3000, () => {
  console.log("JSON Server is running with auth on port 3000");
});
