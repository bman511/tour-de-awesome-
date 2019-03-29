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
# race_result_type = Base.classes.race_result_type
# race_results = Base.classes.race_results
# race_stages = Base.classes.race_stages
# race_starters = Base.classes.race_starters
# race_teams = Base.classes.race_teams

#################################################
# Flask Routes
#################################################

@app.route("/")
def welcome():
    return render_template("index.html")


@app.route("/race")
def race():
#     """Return a list of all passenger names"""
#     # Query all race
    results = db.session.query(Race.name).all()
    all_names=list(np.ravel(results))
    return jsonify(all_names)


# @app.route("/test)
# def passengers():


if __name__ == '__main__':
    app.run(debug=True)
