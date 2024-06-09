-- +goose Up
-- +goose StatementBegin
create table if not exists laundryAddress (
    _id serial primary key,
    laundryId int not null,
    address text not null,
    latitude double precision not null,
    longitude double precision not null,

    foreign key (laundryId) references laundryMart(_id) on delete cascade
);
--  location geometry(point, 4326) not null,
-- decimal(9,6) not null,

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
drop table if exits laundryAddress;
-- +goose StatementEnd
