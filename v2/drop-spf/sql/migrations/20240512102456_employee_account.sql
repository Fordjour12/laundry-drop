-- +goose Up
-- +goose StatementBegin
create table employee (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(500) not null,
  role varchar(6) default '782312' check (role in ('782312', '478909')),
  company_id integer not null,
  foreign key (company_id) references laundryMart(id) on delete cascade,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
)
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists employee
-- +goose StatementEnd
