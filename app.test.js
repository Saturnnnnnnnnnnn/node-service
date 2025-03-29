const request = require('supertest');
const app = require('./app');

describe('Тестирование HTML-ответа', () => {
  it('должен возвращать статус 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('должен содержать заголовок "Информация о системе"', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain('<h1>Информация о вашей системе</h1>');
  });

  it('должен содержать информацию о хосте', async () => {
    const response = await request(app).get('/');
    expect(response.text).toMatch(/<p><strong>Имя хоста:<\/strong> .*?<\/p>/);
  });
});

describe('Тестирование JSON API', () => {
  it('должен возвращать статус 200 на /json', async () => {
    const response = await request(app).get('/json');
    expect(response.status).toBe(200);
  });

  it('должен возвращать JSON с ключом "hostname"', async () => {
    const response = await request(app).get('/json');
    expect(response.body.hostname).toBeDefined();
  });

  it('должен содержать корректное количество процессоров', async () => {
    const response = await request(app).get('/json');
    expect(response.body.cpu.count).toBeGreaterThan(0);
  });
});
