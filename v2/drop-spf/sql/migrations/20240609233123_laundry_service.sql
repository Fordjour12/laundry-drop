-- +goose Up
-- +goose StatementBegin
create table if not exists services (
  _id serial primary key,
  name varchar(255) not null,
  description text not null,
  price numeric(10,2) not null,
  image varchar(500) not null,
  laundryId integer not null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp,

  Foreign Key (laundryId) references laundryMart(_id) on delete cascade
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists services;
-- +goose StatementEnd

