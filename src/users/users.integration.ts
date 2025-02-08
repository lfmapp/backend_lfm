import request from 'supertest';
import { Pool } from 'pg';
import app from '../../server';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

beforeAll(async () => {
  try {
    await pool.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, name VARCHAR(100));');
  } catch (error) {
    console.error('❌ Erreur lors de la création de la table:', error);
  }
});

beforeEach(async () => {
  await pool.query('TRUNCATE TABLE users RESTART IDENTITY;');
  await pool.query("INSERT INTO users (name) VALUES ('Test User');");
});

afterAll(async () => {
  try {
    await pool.query('DROP TABLE users;');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la table:', error);
  } finally {
    await pool.end();
  }
});

describe('🔄 Test d\'intégration API', () => {
  it('✅ Vérifie que l\'API renvoie les utilisateurs', async () => {
    const response = await request(app).get('/api/users');
    
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('name', 'Test User');
  });
});
 