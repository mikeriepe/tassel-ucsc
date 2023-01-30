# **Tassel Database Table Fields**

## users
`userid`: uuid (Primary Key)

`useremail`: text

`userpassword`: text

`active`: boolean

## profile
`profileid`: uuid (Primary Key)

`userid`: uuid

`userpreference`: jsonb

`graduationyear`: text

`major`: text

`experience`: jsonb

`volunteeringexperience`: jsonb

`about`: text

`userlocation`: text

`availability`: jsonb

`profilepicture`: text

`userprofile`: jsonb

`firstname`: text

`lastname`: text


## events
`eventid`: uuid (Primary Key)

`usersponsors`: jsonb

`eventzoomlink`: text

`organization`: text

`description`: text

`preferences`: jsonb

`active`: boolean

`eventbanner`: text

`eventname`: text

`organizationtype`: text

`opportunitytype`: text

`startdate`: date

`enddate`: date

`roles`: text[]

`starttime`: text 

`endtime`: text

`locationtype`: text

`eventlocation`: jsonb

`eventdata`: text

`subject`: text

`assignedroles`: jsonb

`userparticipants`: text[]

## requests
`requestid`: uuid (Primary Key)

`requestee`: uuid

`requester`: uuid

`requeststatus`: text

`requestresponse`: text

`requestdatetime`: timestamp with timezone

`resonsedatatime`: timestamp with timezone

`requestmessage`: text

`opportunityid`: uuid

`role`: text

`toevent`: boolean

## organizations
`organizationid`: uuid (Primary Key)

`name`: text

`description`: text

`email`: text

`website`: text

`instagram`: text

`organizationtype`: text

## organizationtypes
`organizationtypeid`: uuid (Primary Key)

`name`: text

## eventtype
`eventtypeid`: uuid (Primary Key)

`name`: text

`description`: text

## feedback (currently unused)
`feedbackid`: uuid (Primary Key)

`feedbackforid`: uuid

`feedbackfromid`: uuid

`feedbackdescription`: text

## preferences (currently unused)
`preferenceid`: uuid (Primary Key)

`preferencename`: text
