
export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: Number(process.env.POSTGRES_PORT || '5432'),
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DATABASE || 'test',
    },
    jwt: {
        secret: process.env.JWT_SECERT || 'this is the secret and cannot be predicted',
        access_token_secret: process.env.JWT_SECERT || 'this is the secret and cannot be predicted',
        refresh_token_secret: process.env.JWT_SECERT || 'this is the secret and cannot be predicted',
    }
});
