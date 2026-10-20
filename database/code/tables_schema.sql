create table public.courses (
  id uuid not null default gen_random_uuid (),
  prefix character varying(10) not null,
  code character varying(10) not null,
  full_code character varying(45) not null,
  course_name character varying(255) not null,
  constraint courses_pkey primary key (id),
  constraint courses_full_code_unique unique (full_code),
  constraint courses_prefix_code_unique unique (prefix, code)
);

create table public.reviews (
  id uuid not null default gen_random_uuid (),
  course_id uuid not null,
  user_id uuid null,
  title character varying(100) not null,
  body text not null,
  rating smallint not null,
  created_at timestamp with time zone not null default now(),
  difficulty smallint not null,
  grade text null default 'Unknown'::text,
  professor text null default 'Not stated'::text,
  constraint reviews_pkey primary key (id),
  constraint reviews_course_id_fkey foreign KEY (course_id) references courses (id) on delete CASCADE,
  constraint reviews_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete set null,
  constraint reviews_rating_check check (
    (
      (rating >= 1)
      and (rating <= 5)
    )
  )
);