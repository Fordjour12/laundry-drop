-- +goose Up
-- +goose StatementBegin
create table if not exists user_account (
  id serial primary key,
  username varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(500) not null,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists user_account
-- +goose StatementEnd
