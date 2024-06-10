-- +goose Up
-- +goose StatementBegin
create table if not exists services (
  _id serial primary key,
  name varchar(255) not null,
  description text not null,
  price integer not null,
  image varchar(500) not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists services;
-- +goose StatementEnd

