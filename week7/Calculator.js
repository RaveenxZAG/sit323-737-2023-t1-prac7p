const express = require('express');
const winston = require('winston');

const app = express();
const port = 8081;

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error'
    }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = num1 + num2;

  logger.log({
    level: 'info',
    message: `New addition operation requested: ${num1} + ${num2} = ${result}`
  });

  res.json({ result });
});

app.get('/subtract', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = num1 - num2;

  logger.log({
    level: 'info',
    message: `New subtraction operation requested: ${num1} - ${num2} = ${result}`
  });

  res.json({ result });
});

app.get('/divide', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = num1 / num2;

  logger.log({
    level: 'info',
    message: `New divition operation requested: ${num1} / ${num2} = ${result}`
  });

  res.json({ result });
});

app.get('/multiply', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input');
    return res.status(400).json({ error: 'Invalid input' });
  }

  const result = num1 * num2;

  logger.log({
    level: 'info',
    message: `New multiplication operation requested: ${num1} * ${num2} = ${result}`
  });

  res.json({ result });
});

app.listen(port, () => {
  console.log(`Calculator microservice listening at http://localhost:${port}`);
});
