import pandas as pd


import pandas as pd
from firebase_admin import credentials, firestore, initialize_app

cred = credentials.Certificate('serviceAccount.json')
initialize_app(cred)

db = firestore.client()

# Load the data from CSV
data = pd.read_csv('bathrooms.csv')

# Convert the data to a dictionary and upload it to Firebase
for index, row in data.iterrows():
    bathroom = {
        'Room Number': row['Room Number'],
        'Floor Number': row['Floor Number'],
        'Number of Stalls': row['Number of Stalls'],
        'Number of Urinals': row['Number of Urinals'],
        'Number of Sinks': row['Number of Sinks'],
        'Paper or Air Drying': row['Paper or Air Drying'],
        'Baby Changing Stations': row['Baby Changing Stations'],
        'Feminine Products Dispenser': row['Feminine Products Dispenser'],
        'Longitude': row['Longitude'],
        'Latitude': row['Latitude'],
        'Gender': row['Gender']
    }
    db.collection('bathrooms').add(bathroom)
