const express = require('express');
const os = require('os');

const app = express();
const port = 3002;

function getSystemInfo() {
  return {
    hostname: os.hostname(),
    os_type: os.type(),
    platform: os.platform(),
    cpu_architecture: os.arch(),
    os_version: os.release(),
    uptime: os.uptime(),
    total_memory: os.totalmem(),
    free_memory: os.freemem(),
    cpu: {
      count: os.cpus().length,
      model: os.cpus()[0].model,
      speed: os.cpus()[0].speed
    }
  };
}

// HTML-ответ
app.get('/', (req, res) => {
  const systemInfo = getSystemInfo();

  res.send(`
    <html>
      <head>
        <title>Node Service</title>
      </head>
      <body>
        <h1>Информация о вашей системе</h1>
        <p><strong>Имя хоста:</strong> ${systemInfo.hostname}</p>
        <p><strong>Тип ОС:</strong> ${systemInfo.os_type}</p>
        <p><strong>Платформа:</strong> ${systemInfo.platform}</p>
        <p><strong>Архитектура:</strong> ${systemInfo.cpu_architecture}</p>
        <p><strong>Версия ОС:</strong> ${systemInfo.os_version}</p>
        <p><strong>Время работы:</strong> ${systemInfo.uptime} секунд</p>
        <p><strong>Процессоры:</strong> ${systemInfo.cpu.count} процессоров, ${systemInfo.cpu.model}, ${systemInfo.cpu.speed} MHz</p>
        <p><strong>Общая память:</strong> ${Math.round(systemInfo.total_memory / 1024 / 1024)} MB</p>
        <p><strong>Свободная память:</strong> ${Math.round(systemInfo.free_memory / 1024 / 1024)} MB</p>
      </body>
    </html>
  `);
});

// JSON-ответ
app.get('/json', (req, res) => {
  res.json(getSystemInfo());
});

// Экспорт для тестов
module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
  });
}
