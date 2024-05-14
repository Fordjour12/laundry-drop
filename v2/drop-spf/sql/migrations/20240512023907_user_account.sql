-- +goose Up
-- +goose StatementBegin
create table if not exists user_account (
  id serial primary key,
  username varchar(255) not null,
  email varchar(255) unique not null,
  password varchar(500) not null,
  created_at timestamp with time zone default current_timestamp,
  updated_at timestamp with time zone default current_timestamp
  deleted_at timestamp with time zone
)

-- trigger to update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- create trigger to call the function on update
create trigger user_account_updated_at before update on user_account
for each row
execute function update_updated_at_column();

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exists user_account
-- +goose StatementEnd
