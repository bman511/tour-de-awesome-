import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import cuser, cpwd
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://{cuser}:{cpwd}@us-cdbr-iron-east-03.cleardb.net/heroku_0168f21124ffac7"
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
# Location = Base.classes.country_coordinates

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")
    console.log("Index")

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
    df3["overall_speed"] = 3351/df3["rider_time"].astype(float) * 3600

    data_output = {}
    data_output["rider_id"] = df3["rider_id"].tolist()
    data_output["rider_name"] = df3["rider_name"].tolist()
    data_output["country"] = df3["rider_country"].tolist()
    data_output["latitude"] = df3["latitude"].tolist()
    data_output["longitude"] = df3["longitude"].tolist()
    data_output["final_ranking"] = df3["ranking"].tolist()
    data_output["overall_speed"] = df3["overall_speed"].tolist()

    return jsonify(data_output)

@app.route("/speeds")
def stage_data():
    sel = [Results.stage_id, Results.ranking, Results.rider_speed, Starters.rider_name,\
       Stages.stage_type, Stages.stage_distance]

    results = db.session.query(*sel).filter(Results.stage_id==Stages.stage_id)\
    .filter(Results.rider_id==Starters.rider_id).filter(Results.race_result_type_id==1)\
    .filter(Results.rider_speed.isnot(None)).order_by(Results.stage_id).all()

    df = pd.DataFrame(results, columns=["stage","ranking","rider_speed","rider_name","stage_type","stage_distance"])

    data_output = {}

    data_output["stage_id"] = df["stage"].tolist()
    data_output["rider_rank"] = df["ranking"].tolist()
    data_output["rider_speed"] = df["rider_speed"].tolist()
    data_output["rider_name"] = df["rider_name"].tolist()
    data_output["stage_type"] = df["stage_type"].tolist()
    data_output["stage_length"] = df["stage_distance"].tolist()

    return jsonify(data_output)


if __name__ == '__main__':
    app.run(debug=True)
