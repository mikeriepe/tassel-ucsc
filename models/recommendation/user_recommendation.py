import pandas as pd
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# CONSTANTS
SAMPLE_SIZE = 200
COMMON_WORDS = ['a', 'the', 'and']

# read json file into dict
user_json = {}
with open("mock_users.json", "r") as mock_users:
    user_json = json.load(mock_users)

    # add work & volunteer experience title & description
    # to experience list
    for user in user_json:
        # initialise experience string for current user
        experience = []

        # add work experience title and description
        # to experience list
        for item in user['experience']:
            experience.append(item['title'])
            experience.append(item['description'])
            
        # same for volunteer experience
        for item in user['volunteeringexperience']:
            experience.append(item['title'])
            experience.append(item['description'])

        # remove  volunteer experience,
        del user['volunteeringexperience']

        res = ' '.join(experience).lower()
        
        # remove common words to prevent interference
        for word in COMMON_WORDS:
            res = res.replace(word, '')
        
        # replace experience field with new combined string
        user['experience'] = res
        

# convert json into pandas dataframe
df = pd.DataFrame.from_dict(user_json)

# get random sample of rows to process
# df = df.sample(n=SAMPLE_SIZE)

# add target opportunity to dataframe so can
# be compared to users
oppId = 'asfdgfh' # TODO: will be actual opp id
opp = {
    'profileid': oppId,
    'userid': None,
    'graduationyear': None,
    'userlocation': None,
    'firstname': None,
    'lastname': None,
    'major': 'Sales',
    'experience': 'Dynamic Assurance Associate mollit adipisicing sit in ipsum Central Tactics Specialist Central Tactics Specialist',
    'about': 'Fundamental zero tolerance local area network',
}
df = pd.concat([df, pd.DataFrame(opp, index=[0])], ignore_index=True)

# CLEANING

# remove irrelevant columns
new_df = df.drop(['profileid','userid','graduationyear','userlocation','firstname','lastname'],axis=1)

# add 'data' column with about, experience and major
new_df['data'] = new_df[new_df.columns[1:]].apply(
    lambda x: ' '.join(x.dropna().astype(str)),
    axis=1
)

# convert data to vector of strings to counts
vectorizer = CountVectorizer()
vectorized = vectorizer.fit_transform(new_df['data'])

# use cosine similarity to find resemblance between
# each row in dataset
similarities = cosine_similarity(vectorized)

# map similarity vector to profileid in original data frame
# creates frame with profileid vertically and horizontally,
# representing similarity between these two books
df = pd.DataFrame(
    similarities,
    columns=df['profileid'],
    index=df['profileid']
).reset_index()

# choose 10 closest users matching opp
# TODO: change so ordered list of users returned
recs = pd.DataFrame(df.nlargest(11, oppId)['profileid'])
recs = recs[recs['profileid'] != oppId]

# output results
print('CHOSEN OPP: ', oppId)
print('RECOMMENDED USERS')
print(recs)