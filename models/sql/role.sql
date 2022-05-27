CREATE TABLE role (
	roleid uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	opportunityid uuid REFERENCES opportunity (eventid),
	tagid uuid REFERENCES major (majorid),
	responsibility text,
	isfilled boolean,
	userid uuid REFERENCES account (userid)
);
