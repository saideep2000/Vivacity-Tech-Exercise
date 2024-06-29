## Backend commands:

To start :
npm init -y

Install :

npm install typescript express cors
npm install --save-dev @types/node @types/express @types/cors

npx tsc --init

npm install dotenv

npm install pg

npm install joi

npm install --save-dev @types/joi

npm install --save-dev supertest

npm install --save-dev @types/supertest

npm install --save-dev jest

npm install --save-dev @types/jest

npm install --save-dev @types/node


Installing postgres:

brew install postgresql

automatically starting services:
brew services start postgresql

Manually controlling:
pg_ctl -D /usr/local/var/postgres start
pg_ctl -D /usr/local/var/postgres stop

Login to postgres:
psql postgres
CREATE ROLE app_user WITH LOGIN PASSWORD 'app_password';
ALTER ROLE app_user CREATEDB;
\du
To exit : ctrl + D

psql postgres -U app_user
CREATE DATABASE app_database;
\l
\connect app_database;
\dl
CREATE TABLE applicants (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    location VARCHAR(255),
    hobbies TEXT[]
);
\d applicants

INSERT INTO applicants (name, role, location, hobbies) VALUES
('Saideep Samineni', 'Software Developer', 'New York', '{"Coding", "Reading"}');

SELECT * FROM applicants;

SELECT * FROM applicants WHERE name = 'Saideep Samineni';

-------------------------------------------------------------------------------

## Frontend commands:

npx create-react-app . --template typescript

npm install axios

