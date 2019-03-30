import requests
import html5lib
import pandas as pd
from bs4 import BeautifulSoup
import os
import json
import numpy as np
import datetime
from config import user, pwd
from sqlalchemy import create_engine
import pymysql
pymysql.install_as_MySQLdb()
base_url = "https://www.letour.fr"

def scrape_pages(stage_id):
    stage_id = stage_id
    links_list = []
 
    start_url = f"{base_url}/en/rankings/stage-{stage_id}" #URL to stage)
    print(f"Getting result links for {start_url}")
    
    page = requests.get(start_url)

    if page.status_code == 200:
        content = page.content
        soup = BeautifulSoup(content, "html5lib")

    #Pull out a specific block of code with two sets of coded URLs from the soup.
        try:
            all_links = soup.find_all(class_="tabs__link js-tabs-ranking")
            links_list.append(all_links)
        except ElementDoesNotExist as e:
            print(f"That does not appear to be a valid results URL. {e}")

    # Parsing out the list of json-ish links from the DOM into a dictionary of functional URLs

    url_dict = {}

    for item in all_links:
        myurl = item['data-ajax-stack']
        #clean up the code into a useable URL
        myurl = myurl.replace('\/', '/')
        myurls = json.loads(myurl)
        for key, value in myurls.items():
            url_dict[key] = f"{base_url}{value}"

    # TODO loop through each stage and get the results. For now just look at a single stage, not any more or other results

    for key, value in url_dict.items():
        
        try:
            if key == 'ite':
                print(f"Getting results from {value}")
                get_results(value, 1, stage_id)
            elif key == 'itg':
                print(f"Getting results from {value}")
                get_results(value, 2, stage_id)
        except ValueError:
            print(f"Error getting results from {value}")
            pass
        
def get_results(myurl, race_result_type_id, stage_id):

    try:
        table = pd.read_html(myurl)
        df = table[0]
        print(f"Table scraped for stage {stage_id}")
    except KeyError:
        print(f"Error with stage {stage_id}")
        pass
    # put foreign keys into dataframe before insert into mySql

    df["stage_id"] = stage_id
    df["race_result_type_id"] = race_result_type_id
    # Reformat the times
    df['Result'] = df['Times'].str.replace('h ', ':').str.replace('\'\'', '').str.replace('\' ',':')
    # Calculate bonus/penalty in seconds
    for index, row in df.iterrows():
        if 'B' in row['B']:
            bonus = row['B']
            bonus= bonus.split(' : ')[1].replace("''",'')
            df.loc[index, 'rider_bonus'] = bonus
        elif 'P' in row['P']:
            bonus = row['P']
            seconds = bonus.replace('P : ','').replace("'",'').split(' ')[1]
            minutes = int(bonus.replace('P : ','').replace("'",'').split(' ')[0])*60
            bonus = minutes + int(seconds)
            df.loc[index, 'rider_bonus'] = int(bonus * -1)

    # Calculate time in seconds
    for index, row in df.iterrows():
        if ':' in row['Result']:
            t = row['Result']
            h,m,s = t.split(':')
            df.loc[index, 'rider_time'] = int(datetime.timedelta(hours=int(h),minutes=int(m),seconds=int(s)).total_seconds())

    # Remove extra columns
    df = df.drop(['Rider','Team','Gap', 'B', 'P','Times','Result'], axis=1)
    # Rename columns to match
    df = df.rename({'Rank': 'ranking', 'Rider No.': 'rider_id'}, axis='columns')
    try:
        engine = create_engine(f"mysql://{user}:{pwd}@localhost/letour_db")
        df.to_sql(name='race_results',con=engine,if_exists='append', index=False)
    except InternalError:
        print("Could not find database.")
        
stages = np.arange(1,22)
# The result of this call will be pushed to the database
for i in stages:
    scrape_pages(i)
    
#Add the missing stage results

def add_stage(filename):
    
    stage_3 = pd.read_csv(filename)

    stage_3['race_result_type_id'] = 1
    stage_3['stage_id'] = 3

    for index, row in stage_3.iterrows():
            if ':' in row['rider_time']:
                t = row['rider_time']
                t = t.split('.')[0]
                m,s = t.split(':')
                stage_3.loc[index, 'rider_time'] = int(datetime.timedelta(minutes=int(m),seconds=int(s)).total_seconds())

    engine = create_engine(f"mysql://{user}:{pwd}@localhost/letour_d")
    stage_3.to_sql(name='race_results',con=engine,if_exists='append', index=False)
    
add_stage("../sql/stage-3.csv")
