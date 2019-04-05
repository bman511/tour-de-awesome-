# tour-de-awesome-
Visualizing data from the 2018 Tour de France

The Tour de France is the world's third most-watched sporting event, behind only the Summer Olympic Games and the FIFA World Cup. It's a captivating and colourful view into the complexities of the sport and the countryside of France, and makes for compelling viewing. But when the race is over, does the excitement have to end?

We set out to visualize the progress of the Tour de France, the players, and the key points through several dynamic visualization methods, utilizing MySQL, Python, Flask, Javascript, and a number of Javascript libraries including D3, Plotly.js, JQuery, Leaflet and Colors.js. Bootstrap and the Bootswatch Lux style were used for styling. Banner photo credit Getty Images.

The first step was obtaining the data for each day's race results (stage) and the cumulative overall rankings for each day (overall). We scraped the Amaury Sporting Group's letour.fr homepage using Beautiful Soup, Pymysql, and SQLAlchemy to gather the data into a MySQL database table.

The information for each stage was obtained from Wikipedia and manually uploaded into the database as a CSV file. The letour.fr site was missing the day's results for stage 3, which was a team time trial. That information was obtained from the UCI.ch web site (which includes the same rider ID's used by letour.fr), munged and loaded into the database. The race starters information was obtained from the UCI.ch first stage results and munged and loaded into the database to create a reference for the results.

A unique list of race starters nationalities was gathered from the database and the GoogleMaps API used to gather latitude and longitude coordinates for each country for purposes of mapping the participants using Leaflet.

A MySQL query was performed to update the race results table in the database with each riders' speed rather than time for top-to-bottom visualization of rankings and a more intuitive comparison that captures both distance and time in one data point.

Operations were performed in Python Jupyter Notebooks to perfect the SQLAlchemy queries using the ORM before creating endpoints in the Flask app.py file where the data was put into JSON format using jsonify.

* The endpoint /race is simply the Tour de France edition we used.
* /countries extracts country coordinate and race participant data.
* /speeds/<type> endpoing displays stage results (type 1) and overall standings (type 2) for each stage with speeds rather than times, and is used to create the box plot.
  * /bump_data endpoint extracts overall rankings results for each stage for a select group of pre-race favorites.
  * /summary is a list of stages used to populated the results drop down list
  * /summary/<stage> endpoing is used to create the dynamic results table.

