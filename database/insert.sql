
insert into optical_terminal (
    description,
    customer,
    olt,
    board,
    port,
    onuid,
    mac,
    serial,
    vlan,
    access,
    fiber,
    odf,
    splitter1,
    splitter2
)
select 
    "哼哈大厦",
    "龙湾",
    "广电1",
    5,
    3,
    11,
    "0023-ED8C-09AE",
    "0923995884504958",
    "2109",
    "GPON",
    "24-290276",
    "ODF-5-4501",
    "B321-0102",
    "A321-0987"
where not exists (
    select * from optical_terminal where olt = "广电1" and board = 5 and port = 3 and onuid = 11
);