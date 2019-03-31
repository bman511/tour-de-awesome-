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


@app.route("/speeds")
def stage_data():
    sel = [Results.stage_id, Results.ranking, Results.rider_speed, Starters.rider_name,\
       Stages.stage_type, Stages.stage_distance]

    stmt = db.session.query(*sel).filter(Results.stage_id==Stages.stage_id)\
.filter(Results.rider_id==Starters.rider_id).filter(Results.race_result_type_id==1)\
.filter(Results.rider_speed.isnot(None)).order_by(Results.stage_id).all()

    df = pd.DataFrame(stmt, columns=["stage","ranking","rider_speed","rider_name","stage_type","stage_distance"])

    data_output = {}
    for record in stmt:
        data_output["stage_id"] = df["stage"].tolist()
        data_output["rider_rank"] = df["ranking"].tolist()
        data_output["rider_speed"] = df["rider_speed"].tolist()
        data_output["rider_name"] = df["rider_name"].tolist()
        data_output["stage_type"] = df["stage_type"].tolist()
        data_output["stage_length"] = df["stage_distance"].tolist()

    return jsonify(data_output)


if __name__ == '__main__':
    app.run(debug=True)
