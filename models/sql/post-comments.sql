DROP TABLE IF EXISTS post;
CREATE TABLE post (
	postid uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	opportunityid uuid REFERENCES opportunity (eventid),
	userid uuid REFERENCES account (userid),
	content text
);

DROP TABLE IF EXISTS comment;
CREATE TABLE comment(
    commentid uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
	postid uuid REFERENCES post (postid),
	userid uuid REFERENCES account (userid),
	content text
);