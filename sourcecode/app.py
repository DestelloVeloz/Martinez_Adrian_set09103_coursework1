import logging,pickle,ConfigParser
from logging.handlers import RotatingFileHandler
from flask import Flask, render_template, url_for, request,redirect,flash
app = Flask(__name__)
app.secret_key='\xd9\xa8\xf5\xafm\xec\xa2J\x11`\x8fH\xbeO\xeb\x86\x05\xaf"\xfc\x1c}s\xe0'
pokemonstore=[]

@app.route('/')
def home():
    return render_template('home.html',pokemonstore=pokemonstore)

@app.route('/login', methods=['GET','POST'])
def login():
	if request.method == 'POST':
       	 	session['username'] = request.form['username']
        	return redirect(url_for('home'))
    	return render_template('sign-up.html')

app.route('/logout')
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
        #loop through the pokemonstore and find any string that contains
        #what we are searching for and add it to pokemonsearch list
            for pokemon in pokemonstore:
                if what in pokemon[0].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon[1].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon[2].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon[3].lower():
                    pokemonsearch.append(pokemon)
                elif what in pokemon[4].lower():
                    pokemonsearch.append(pokemon)
            return render_template('home.html',pokemonstore=pokemonsearch)
            
        else:
           return redirect(url_for('home'))
    return redirect(url_for('home'))

@app.route('/filter')
def filterbystatus():
        pokemonfilter=[]
        status=request.args.get('status','')
        
        if status:
        #loop through the pokemonstore to find the pokemon with the specified status
            for pokemon in pokemonstore:
                if status in pokemon[1].lower():
                    pokemonfilter.append(pokemon)               
            return render_template('home.html',pokemonstore=pokemonfilter)
 
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
    global pokemonstore
    try:       
        with open('storage.p', 'rb') as pfile:
            pokemonstore = pickle.load(pfile)
    except IOError:
        f= open("storage.p","w+")
        #store initial data into file from list
        data1=["Pokemon Alchemist","Completed","No","No","16/09/2016","Alchemist.png"]
        pokemonstore.append(data1)
        data2=["Pokemon Attack On the Space Station","Completed","Yes","No","20/08/2017","Attack On the Space Station.png"]
        pokemonstore.append(data2)
        data3=["Pokemon Celestite","Developing","Yes","Yes","21/01/2016","Celestite.png"]
        pokemonstore.append(data3)
        data4=["Pokemon Clandestine","Demo","No","No","14/04/2017","Clandestine.png"]
        pokemonstore.append(data4)
        data5=["Pokemon Comet","Developing","No","No","12/08/2017","Comet.png"]
        pokemonstore.append(data5)
        data6=["Pokemon Epitaph","Developing","Yes","No","03/10/2017","Epitaph.png"]
        pokemonstore.append(data6)
        data7=["Pokemon Ethereal Gates","Demo","Yes","No","12/04/2015","Ethereal Gates.png"]
        pokemonstore.append(data7)
        data8=["Pokemon Fable","Completed","No","No","09/08/2017","Fable.png"]
        pokemonstore.append(data8)
        data9=["Pokemon Infinite Fusion","Demo","Yes","No","23/03/2017","Infinite Fusion.png"]
        pokemonstore.append(data9)
        data10=["Pokemon Insurgence","Completed","Yes","Yes","20/12/2014","Insurgence.gif"]
        pokemonstore.append(data10)
        data11=["Pokemon Mint Fantasy","Demo","No","Yes","30/06/2015","Mint Fantasy.png"]
        pokemonstore.append(data11)
        data12=["Pokemon Morality","Developing","Yes","No","12/10/2017","Morality.png"]
        pokemonstore.append(data12)
        data13=["Pokemon Natural Green","Demo","No","Yes","21/06/2015","Natural Green.png"]
        pokemonstore.append(data13)
        data14=["Pokemon Nova","Demo","Yes","Yes","23/04/2017","Nova.png"]
        pokemonstore.append(data14)
        data15=["Pokemon Phoenix Rising","Developing","Yes","Yes","24/06/2015","Phoenix Rising.png"]
        pokemonstore.append(data15)
        data16=["Pokemon Reborn","Demo","No","Yes","30/09/2012","Reborn.png"]
        pokemonstore.append(data16)
        data17=["Pokemon Spectrum","Demo","Yes","No","11/09/2015","Spectrum.png"]
        pokemonstore.append(data17)
        data18=["Pokemon Titan","Demo","Yes","Yes","26/06/2017","Titan.png"]
        pokemonstore.append(data18)
        data19=["Pokemon Uranium","Completed","Yes","Yes","17/04/2010","Uranium.jpg"]
        pokemonstore.append(data19)
        data20=["Pokemon Virion","Demo","No","Yes","18/11/2016","Virion.png"]
        pokemonstore.append(data20)
        with open('storage.p', 'wb') as pfile:
            pickle.dump(pokemonstore, pfile)
if __name__ == "__main__":
    init(app)
    logs(app)
    loaddata()
    app.run(host=app.config['ip_address'], port=int(app.config['port']), debug=app.config['debug'])
    

