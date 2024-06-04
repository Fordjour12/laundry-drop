-- +goose Up
-- +goose StatementBegin
create table if not exists laundryAddress (
    addressID serial primary key,
    laundryID int not null,
    address text not null,
    latitude double precision not null,
    longitude double precision not null,
    foreign key (laundryId) references laundryMart(id) on delete cascade
);
--  location geometry(point, 4326) not null,
-- decimal(9,6) not null,

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
SELECT 'down SQL query';
-- +goose StatementEnd
