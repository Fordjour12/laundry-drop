-- +goose Up
-- +goose StatementBegin
-- create extension if not exists postgis;

create table if not exists customerAddress (
    _id serial primary key,
    customerId int not null,
    address text not null,
    defaultAddress boolean default false,

    foreign key (customerId) references customer(_id) on delete cascade
);
--  location geometry(point, 4326) not null,
-- decimal(9,6) not null,
--latitude double precision not null,
--longitude double precision not null,
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop if exists customerAddress;
-- +goose StatementEnd
