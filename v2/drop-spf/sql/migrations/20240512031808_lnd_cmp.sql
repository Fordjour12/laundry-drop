-- +goose Up
-- +goose StatementBegin
create table if not exists lndy_comp (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(500) not null,
  privilege varchar(6) default '974929' check (privilege in ('782312', '974929')),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists lndy_comp
-- +goose StatementEnd
