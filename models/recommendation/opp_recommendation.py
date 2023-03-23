import pandas as pd
import json
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# CONSTANTS
SAMPLE_SIZE = 200
COMMON_WORDS = [' a ', ' the ', ' and ']

def clean_text(text):
    res = str(text).lower()
    for word in COMMON_WORDS:
        res = res.replace(word, ' ')
    return res

# read json file into dict
opp_json = {}
with open("mock_opps.json", "r") as mock_opps:
    opp_json = json.load(mock_opps)

# convert json into pandas dataframe
df = pd.DataFrame.from_dict(opp_json)

# get random sample of rows to process
# df = df.sample(n=SAMPLE_SIZE)

# add target user to dataframe so can
# be compared to opps
userId = 'asfdgfh' # TODO: will be actual user id 
user = {
    'eventid': userId,
    'eventname': None, 
    'organization': None,
    'description': 'Sales',
    'eventdata': 'Dynamic Assurance Associate mollit adipisicing sit in ipsum Central Tactics Specialist Central Tactics Specialist',
}
df = pd.concat([df, pd.DataFrame(user, index=[0])], ignore_index=True)


# CLEANING

# convert columns used to lower case and remove common words
df['eventname'] = df['eventname'].apply(clean_text)
df['organization'] = df['organization'].apply(clean_text)
df['description'] = df['description'].apply(clean_text)
df['eventdata'] = df['eventdata'].apply(clean_text)

# remove irrelevant columns
new_df = df.drop(['eventid'],axis=1)

# add 'data' column with event name, organization, description
# and extra details combined
new_df['data'] = new_df[new_df.columns].apply(
    lambda x: ' '.join(x.dropna().astype(str)),
    axis=1
)

# TODO: add user after combining data column

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
    columns=df['eventid'],
    index=df['eventid']
).reset_index()

# choose 10 closest opps matching user
# TODO: change so ordered list of opps returned for sorting
recs = pd.DataFrame(df.nlargest(11, userId)['eventid'])
recs = recs[recs['eventid'] != userId]

# output results
print('CHOSEN USER: ', userId)
print('RECOMMENDED OPPS')
print(recs)