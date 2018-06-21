
create table optical_terminal(
    id INT AUTO_INCREMENT, 
    olt VARCHAR(20),
    board INT,
    port INT, 
    onuid INT,
    vlan INT,
    description VARCHAR(255), 
    customer VARCHAR(255), 
    mac VARCHAR(14),
    serial VARCHAR(30),
    access VARCHAR(10),
    fiber VARCHAR(20),
    odf VARCHAR(20),
    splitter1 VARCHAR(20),
    splitter2 VARCHAR(20),
    PRIMARY KEY(id)
);
