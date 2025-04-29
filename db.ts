import postgres from 'postgresjs'
// const sql = postgres({ /* options */ }) // will use psql environment variables
const sql = postgres(
  'postgres://postgres:VkoJeNJyoPXpUbnRYNwvAnriFh@postgres:5432/docker',
) // or use a connection string

export default sql
