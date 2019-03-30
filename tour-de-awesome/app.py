import numpy as np
import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, jsonify, render_template
from flask_sqlalchemy import SQLAlchemy
from config import user, pwd
#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql://root:{pwd}@localhost/letour_db"
db = SQLAlchemy(app)
# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(db.engine, reflect=True)

# # Save reference to the table
Race = Base.classes.race
Type = Base.classes.race_result_type
Result = Base.classes.race_results
Stage = Base.classes.race_stages
Starter = Base.classes.race_starters
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


@app.route("/test")
def stage_data():
    select = "select r.stage_id, r.rider_speed, r.ranking, rs.rider_name, s.stage_type, s.stage_distance from race_results r, race_starters rs, race_stages s WHERE r.stage_id=s.stage_id AND r.rider_id=rs.rider_id and r.race_result_type_id=1 and rider_speed IS NOT NULL ORDER BY r.stage_id ASC, r.ranking ASC;"

    engine = create_engine(f"mysql://{user}:{pwd}@localhost/letour_db")
    data = engine.execute(select)
    df = pd.read_sql_query(select, engine)
    stage_list = df.stage_id.unique().tolist()

    data_output = {}
    for record in data:
        data_output["stage_id"] = df["stage_id"].tolist()
        data_output["rider_speed"] = df["rider_speed"].tolist()
        data_output["rider_rank"] = df["ranking"].tolist()
        data_output["stage_type"] = df["stage_type"].tolist()
        data_output["stage_length"] = df["stage_distance"].tolist()

    return jsonify(data_output)


if __name__ == '__main__':
    app.run(debug=True)
