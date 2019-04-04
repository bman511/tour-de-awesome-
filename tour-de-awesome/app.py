import numpy as np
import pandas as pd
import json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import luser, lpwd
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
#app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{luser}:{lpwd}@localhost/letour_db"
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{luser}:{lpwd}@us-cdbr-iron-east-03.cleardb.net/heroku_0168f21124ffac7"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# # Save reference to the table
Race = Base.classes.race
Type = Base.classes.race_result_type
Results = Base.classes.race_results
Stages = Base.classes.race_stages
Starters = Base.classes.race_starters
Country = Base.classes.country

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/map")
def mapper():
    return render_template("map.html")

@app.route("/box")
def boxer():
    return render_template("box.html")

@app.route("/summary")
def summary():
    sel = [Results.race_result_type_id, Results.stage_id, Results.ranking, Starters.rider_name, Starters.rider_country, Starters.rider_team]
    results = db.session.query(*sel).filter(Results.stage_id==Stages.stage_id)\
    .filter(Results.rider_id==Starters.rider_id)\
    .filter(Results.ranking < 11)\
    .order_by(Results.race_result_type_id, Results.stage_id, Results.ranking).all()
    df = pd.DataFrame(results, columns=["type","stage","ranking","name","country","team"])
    overall_results = df.loc[df["type"]==2]
    stage_results = df.loc[df["type"]==1]
    stage = df["stage"].unique()
    stages = stage.tolist()

    data = []
    for i in stages:
        raceResults = {}
        raceResults['stage'] = i
        raceResults['stage_results'] = {
        'rank': df.loc[df.stage==i].loc[df.type==1].ranking.tolist(),
        'name': df.loc[df.stage==i].loc[df.type==1].name.tolist(),
        'country': df.loc[df.stage==i].loc[df.type==1].country.tolist(),
        'team': df.loc[df.stage==i].loc[df.type==1].team.tolist(),
        }
        raceResults['overall_results'] = {
        'rank': df.loc[df.stage==i].loc[df.type==2].ranking.tolist(),
        'name': df.loc[df.stage==i].loc[df.type==2].name.tolist(),
        'country': df.loc[df.stage==i].loc[df.type==2].country.tolist(),
        'team': df.loc[df.stage==i].loc[df.type==2].team.tolist(),
        }

        data.append(raceResults)
    return jsonify(data)

@app.route("/race")
def race():
#     """Return a list of all passenger names"""
#     # Query all race
    results = db.session.query(Race.name).all()
    all_names=list(np.ravel(results))
    return jsonify(all_names)

@app.route("/countries")
def country():
    # Get the coordinates for each rider
    sel = [Starters.rider_id, Starters.rider_name, Starters.rider_country, Country.lat, Country.lon]
    riders = db.session.query(*sel).filter(Starters.rider_country==Country.country).all()
    df1 = pd.DataFrame(riders, columns=["rider_id","rider_name","rider_country","latitude","longitude"])
    # Get final rankings and speeds for each rider including dropouts
    sel2 = [Starters.rider_id, Results.ranking, Results.rider_time]
    results = db.session.query(*sel2).join(Results, isouter=True)\
    .filter(Results.race_result_type_id==2)\
    .filter(Results.stage_id==21).all()
    df2 = pd.DataFrame(results, columns=["rider_id","ranking","rider_time"])

    # Merge the two
    df3 = df1.merge(df2, how="left", on="rider_id")
    df3.sort_values(by=["ranking"])
    df3["overall_speed"] = (3351/df3["rider_time"].astype(float) * 3600).fillna(0)

    data = {}
    data["rider_name"] = df3["rider_name"].tolist()
    data["rider_id"] = df3["rider_id"].tolist()
    data["final_ranking"] = df3["ranking"].astype(str).fillna("DNF").tolist()
    data["overall_speed"] = df3["overall_speed"].tolist()
    data["country"] = df3["rider_country"].tolist()
    data["latitude"] = df3["latitude"].astype(float).tolist()
    data["longitude"] = df3["longitude"].astype(float).tolist()
    return jsonify(data)

@app.route("/speeds/<type>")
def stage_data(type):
    sel = [Results.stage_id, Results.ranking, Results.rider_speed, Starters.rider_name,\
       Results.rider_time,Stages.stage_type, Stages.stage_distance]

    results = db.session.query(*sel).filter(Results.stage_id==Stages.stage_id)\
    .filter(Results.rider_id==Starters.rider_id).filter(Results.race_result_type_id==type)\
    .filter(Results.rider_speed.isnot(None)).order_by(Results.stage_id).all()

    df = pd.DataFrame(results, columns=["stage","ranking","rider_speed","rider_name","rider_time","stage_type","stage_distance"])
    df["rider_time"] = df["rider_time"].astype(int)/3600
    stages = df.drop_duplicates(subset='stage', keep="first")
    stages = stages[["stage", "stage_type", "stage_distance"]]

    data = []
    for row in stages.iterrows():
        stageData = {}
        stageData['stage'] = row[1][0]
        stageData['type'] = row[1][1]
        stageData['distance'] = row[1][2]
        stageData['data'] = {
            'rider': df.loc[df.stage == row[1][0]].rider_name.tolist(),
            'speed': df.loc[df.stage == row[1][0]].rider_speed.tolist(),
            'rank': df.loc[df.stage == row[1][0]].ranking.tolist(),
            'time': df.loc[df.stage == row[1][0]].rider_time.tolist()
        }
        data.append(stageData)
    return jsonify(data)
@app.route("/bump_data")
def bump_data():
    sel=[Results.rider_id, Starters.rider_name, Starters.rider_country, Results.stage_id,  Results.ranking, Results.race_result_type_id, Starters.rider_team]

    my_list =[1, 8, 11, 21, 51, 61, 71, 75, 78, 81, 91, 141, 161, 166]
    results=db.session.query(*sel).join(Starters, isouter=True)\
    .filter(Results.race_result_type_id==2)\
    .filter(Results.rider_id.in_(my_list)).all()
    df=pd.DataFrame(results, columns=["rider_id", "rider_name", "rider_country", "stage_id", "ranking", "race_result_type_id", "rider_team"])
    riders=df.drop_duplicates(subset="rider_id", keep="first")
    riders= riders[["rider_id", "rider_name", "rider_country", "stage_id", "ranking"]]
    
    data=[]
    for row in riders.iterrows():
        riderData = {}

        riderData['rider_id'] = row[1][0]
        riderData['name'] = row[1][1]
        riderData['country'] = row[1][2]
        riderData['performance'] = {
            'stages': df.loc[df.rider_id == row[1][0]].stage_id.tolist(),
            'rank': df.loc[df.rider_id == row[1][0]].ranking.tolist()
        }
        data.append(riderData)
    return jsonify(data)

@app.route("/bump_data")
def bump_data():
    sel=[Results.rider_id, Starters.rider_name, Starters.rider_country, Results.stage_id,  Results.ranking, Results.race_result_type_id, Starters.rider_team]

    my_list =[1, 8, 11, 21, 51, 61, 71, 75, 78, 81, 91, 141, 161, 166]
    results=db.session.query(*sel).join(Starters, isouter=True)\
    .filter(Results.race_result_type_id==2)\
    .filter(Results.rider_id.in_(my_list)).all()
    df=pd.DataFrame(results, columns=["rider_id", "rider_name", "rider_country", "stage_id", "ranking", "race_result_type_id", "rider_team"])
    riders=df.drop_duplicates(subset="rider_id", keep="first")
    riders= riders[["rider_id", "rider_name", "rider_country", "stage_id", "ranking"]]

    data=[]
    for row in riders.iterrows():
        riderData = {}

        riderData['rider_id'] = row[1][0]
        riderData['name'] = row[1][1]
        riderData['country'] = row[1][2]
        riderData['performance'] = {
            'stages': df.loc[df.rider_id == row[1][0]].stage_id.tolist(),
            'rank': df.loc[df.rider_id == row[1][0]].ranking.tolist()
        }
        data.append(riderData)
    return jsonify(riderData )

if __name__ == '__main__':
    app.run(debug=True)
