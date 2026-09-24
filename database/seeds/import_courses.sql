\copy courses (prefix, code, full_code, course_name)
FROM 'database/seeds/cs_courses_split.csv'
WITH (
    FORMAT csv,
    HEADER true
);