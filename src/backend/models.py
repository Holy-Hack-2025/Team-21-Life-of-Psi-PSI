import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
import os

load_dotenv()

class Conversations:
    def __init__(self, conn_params):
        self.conn = psycopg2.connect(**conn_params)
        self._create_tables()
        
    def _create_tables(self):
        with self.conn.cursor() as cursor:
            # Run as a single transaction to avoid multiple workers executing it simultaneously
            self.conn.autocommit = True  
            try:
                cursor.execute('''
                    DO $$ 
                    BEGIN 
                        IF NOT EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgcrypto') THEN
                            CREATE EXTENSION pgcrypto;
                        END IF;
                    END $$;
                ''')
                cursor.execute('''
                    CREATE TABLE IF NOT EXISTS public.conversation (
                        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                        "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        "conversation" JSONB
                    );
                ''')
            except Exception as e:
                print("Error creating tables:", e)
            finally:
                self.conn.autocommit = False  # Reset autocommit


    def get_all(self):
        with self.conn.cursor(cursor_factory=psycopg2.extras.DictCursor) as cursor:
            cursor.execute("SELECT * FROM public.conversation")
            rows = cursor.fetchall()
            return [dict(row) for row in rows]  # Convert to JSON format
        
    def insert(self, conversation):
        with self.conn.cursor() as cursor:
            cursor.execute('''
                INSERT INTO public.conversation (conversation)
                VALUES (%s)
                RETURNING id;
            ''', (psycopg2.extras.Json(conversation),))
        new_id = cursor.fetchone()[0]
        self.conn.commit()
        return new_id

    def update(self, id, conversation):
        with self.conn.cursor() as cursor:
            cursor.execute('''
                UPDATE public.conversation
                SET conversation = %s
                WHERE id = %s
            ''', (psycopg2.extras.Json(conversation), id))
        self.conn.commit()

    def delete(self, id):
        with self.conn.cursor() as cursor:
            cursor.execute('''
                DELETE FROM public.conversation WHERE id = %s
            ''', (id,))
        self.conn.commit()
        return cursor.rowcount > 0  # Return True if delete was successful

db_params = {
    "dbname": os.getenv("DB_NAME"),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "host": os.getenv("DB_HOST"),
    "port": os.getenv("DB_PORT"),
}

print(db_params)

portfolio_db = Conversations(db_params)
