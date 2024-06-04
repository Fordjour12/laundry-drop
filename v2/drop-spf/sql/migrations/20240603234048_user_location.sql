-- +goose Up
-- +goose StatementBegin
-- create extension if not exists postgis;

create table if not exists customerAddress (
    addressID serial primary key,
    customerID int not null,
    address text not null,
    latitude double precision not null,
    longitude double precision not null,
    isPreferred boolean default false,
    foreign key (customerID) references user_account(id) on delete cascade
);
--  location geometry(point, 4326) not null,
-- decimal(9,6) not null,
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
