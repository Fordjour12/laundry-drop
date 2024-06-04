-- +goose Up
-- +goose StatementBegin
create table if not exists laundryMart (
  id serial primary key,
  name varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(500) not null,
  privilege varchar(6) default '974929' check (privilege in ('782312', '974929')),
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp,
  deleted_at timestamp with time zone
);
create or replace function update_updated_at_column()
returns trigger as $$
BEGIN
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- create trigger to call the function on update
create trigger lnd_mt_updated_at before update on laundryMart
for each row
execute function update_updated_at_column();
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists laundryMart
-- +goose StatementEnd
