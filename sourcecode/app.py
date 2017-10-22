import ConfigParser
from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/login/')
def login():
    return render_template('sign-up.html')

@app.route('/status/<currstatus>')

def status(currstatus):
    return "Pokemon Status"

@app.errorhandler(404)
def page_not_found(error):
    return "Opps, the URL you requested for does not exist",404

def init(app):
    config = ConfigParser.ConfigParser()
    try:
        config_location = "etc/defaults.cfg"
        config.read(config_location)
        app.config['debug'] = config.get("config", "debug")
        app.config['ip_address'] = config.get("config", "ip_address")
        app.config['port'] = config.get("config", "port")
        app.config['url'] = config.get("config", "url")
    except:
        print "Could not read configs from: ", config_location

if __name__ == "__main__":
    init(app)
    app.run(host=app.config['ip_address'], port=int(app.config['port']), debug=app.config['debug'])
    

