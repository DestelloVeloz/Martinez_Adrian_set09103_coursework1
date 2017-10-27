import logging,ConfigParser,json
from logging.handlers import RotatingFileHandler
from flask import Flask, render_template, url_for, request,redirect,flash,session
app = Flask(__name__)
app.secret_key='\xd9\xa8\xf5\xafm\xec\xa2J\x11`\x8fH\xbeO\xeb\x86\x05\xaf"\xfc\x1c}s\xe0'
pokemonfans=[]
pokemonusers=[]


@app.route('/addpokemon', methods=['GET', 'POST'])
def addpokemon():
    global pokemonfans
    if not session.get('username'):
        return redirect(url_for('login'))
    else:
        return render_template('addpokemon.html')


@app.route('/')
def home():
    return render_template('home.html',pokemonfans=pokemonfans)

@app.route('/login', methods=['GET', 'POST'])
def login():
    global pokemonusers
    if request.method == 'POST':
            
            for user in pokemonusers:
                
                if request.form['loginusername']==user["username"] and request.form['loginpassword']==user["password"]:
                    session['username'] = request.form['loginusername']
                    return redirect(url_for('home'))
	    flash("Your username or password is incorrect")
 
    return render_template('login.html')

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    global pokemonusers
    if request.method == 'POST':
            session['username'] = request.form['regusername']
            for pokemon in pokemonusers:
                if pokemon["username"]==request.form['regusername']:
                    flash("Username is already taken")
                    return redirect(url_for('register'))
                elif pokemon["email"]==request.form['regemail']:
                    flash("Email address already exist")
                    return redirect(url_for('register'))
            #registration data is fine, add to list
            newuser={"username":request.form['regusername'],"email":request.form['regemail'],"password":request.form['regpassword']}
            pokemonusers.append(newuser)
            with open('storage.json', 'w') as puser:
                json.dump(pokemonusers, puser)#store the user in file
            return redirect(url_for('home'))
    return render_template('signup.html')



@app.route('/logout')
def logout():
# remove the username from the session if it's there
    session.pop('username', None)
    return redirect(url_for('home'))

@app.route('/search', methods=['GET', 'POST'])
def search():
    if request.method == 'POST':       
        pokemonsearch=[]
        what=request.form['search']
        what=what.lower()
        if what:
        #loop through the pokemon fans store and find any string that contains
        #what we are searching for and add it to pokemonsearch list
            for pokemon in pokemonfans:
                if what in pokemon["title"].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon["status"].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon["fakemon"].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon["mega_evolution"].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon["first_release"].lower():
                    pokemonsearch.append(pokemon)
            return render_template('home.html',pokemonfans=pokemonsearch)
            
        else:
           return redirect(url_for('home'))
    return redirect(url_for('home'))

@app.route('/filter')
def filterbystatus():
        pokemonfilter=[]
        status=request.args.get('status','')
        
        if status:
        #loop through the pokemonstore to find the pokemon with the specified status
            for pokemon in pokemonfans:
                if status in pokemon["status"].lower():
                    pokemonfilter.append(pokemon)               
            return render_template('home.html',pokemonfans=pokemonfilter)
 
        return redirect(url_for('home'))


@app.errorhandler(404)
def page_not_found(error):
    app.logger.info("From URL:"+request.path)
    return render_template('404.html')

def init(app):
    config = ConfigParser.ConfigParser()
    try:
        config_location = "etc/defaults.cfg"
        config.read(config_location)
        app.config['debug'] = config.get("config", "debug")
        app.config['ip_address'] = config.get("config", "ip_address")
        app.config['port'] = config.get("config", "port")
        app.config['url'] = config.get("config", "url")
        app.config['log_file'] = config.get("logging", "name")
	app.config['log_location'] = config.get("logging", "location")
	app.config['log_level'] = config.get("logging", "level")
    except:
        print "Could not read configs from: ", config_location
def logs(app):
    log_pathname = app.config['log_location'] + app.config['log_file']
    file_handler = RotatingFileHandler(log_pathname, maxBytes=1024* 1024 * 10 , backupCount =1024)
    file_handler.setLevel( app.config['log_level'] )
    formatter = logging.Formatter("%(levelname)s | %(asctime)s |\
        %(module)s | %(funcName)s | %(message)s")
    file_handler.setFormatter(formatter)
    app.logger.setLevel( app.config['log_level'] )
    app.logger.addHandler(file_handler)

def loaddata():
    global pokemonfans
    global pokemonusers
    try:       
        with open('storage.json', 'r') as pfile:
            data= json.load(pfile)
            pokemonfans=data['pokemonfans']
            pokemonusers=data['pokemonusers']
    except:
        pass
if __name__ == "__main__":
    init(app)
    logs(app)
    loaddata()
    app.run(host=app.config['ip_address'], port=int(app.config['port']), debug=app.config['debug'])
    

