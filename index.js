import middy from '@middy/core';
import httpErrorHandler from '@middy/http-error-handler';

import pg from 'pg';

const { Pool } = pg;

const getDftTraffic = async (event) => {

    const pool = new Pool({
        host: process.env.HOSTNAME,
        user: process.env.USERNAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        port: '5432',
        ssl: {
            rejectUnauthorized: false
        }
    });

    const client = await pool.connect();
    const { rows } = await client.query('SELECT * FROM dfttraffictable LIMIT 50');
    client.release();
    return {
        statusCode: 200,
        body: JSON.stringify(rows)
    };
};

export const handler = middy()
  .use(httpErrorHandler())
  .handler(getDftTraffic);

