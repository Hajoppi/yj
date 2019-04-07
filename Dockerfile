FROM postgres
ENV POSTGRES_DB yjdb
ENV POSTGRES_PASSWORD lorem
COPY schema.sql /docker-entrypoint-initdb.d/