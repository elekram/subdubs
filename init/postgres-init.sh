#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
	CREATE USER docker;
	CREATE DATABASE docker;
	GRANT ALL PRIVILEGES ON DATABASE docker TO docker;
	\c docker
	CREATE TABLE csv_files (
		id serial PRIMARY KEY,
		file_name text, 
		file_id uuid NOT NULL,
		file bytea,
		upload_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	CREATE TABLE slideshow_files (
		id serial PRIMARY KEY,
		slideshow_id uuid NOT NULL,
		slideshow_name text,
		file_name text,
		file bytea,
		upload_date timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP
	);
	SET timezone = 'Australia/Sydney';
EOSQL
