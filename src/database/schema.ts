export const schema = `
    CREATE TABLE IF NOT EXISTS repository (
        repository_id TEXT PRIMARY KEY,
        name TEXT,
        status INTEGER
    );
    CREATE TABLE IF NOT EXISTS bionamic_user (
        user_id TEXT PRIMARY KEY,
        email TEXT UNIQUE,
        name TEXT,
        permission INTEGER,
        status INTEGER
    );
    CREATE TABLE IF NOT EXISTS event (
        event_id TEXT PRIMARY KEY,
        index INTEGER,
        time DATE,
        user_id TEXT REFERENCES bionamic_user (user_id),
        event_ BYTEA,
        repository_id TEXT REFERENCES repository (repository_id)
    );
    CREATE TABLE IF NOT EXISTS matrix (
        item_count INTEGER,
        matrix BYTEA,
        repository_id TEXT UNIQUE REFERENCES repository (repository_id),
        event_id TEXT UNIQUE REFERENCES event (event_id)
    );
    CREATE TABLE IF NOT EXISTS file (
        file_id TEXT PRIMARY KEY,
        date DATE,
        size INTEGER,
        content BYTEA,
        content_type TEXT
    );
    create table IF NOT EXISTS api_key (
        api_id TEXT PRIMARY KEY,
        key TEXT,
        permission_level INTEGER,
        expires DATE
    );
`;
