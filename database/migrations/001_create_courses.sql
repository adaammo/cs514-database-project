CREATE TABLE courses (
    id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    prefix varchar(10) NOT NULL,
    code varchar(10) NOT NULL,
    full_code varchar(25) NOT NULL UNIQUE,
    course_name varchar(100) NOT NULL,

    CONSTRAINT courses_prefix_code_unique
        UNIQUE (prefix, code),

    CONSTRAINT courses_full_code_matches
        CHECK (full_code = prefix || ' ' || code)
);