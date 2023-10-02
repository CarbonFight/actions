## CarbonFight terms

**CO2e** or **CO2eq** : Carbon dioxide equivalent (CO 2e or CO 2eq or CO 2-e) is calculated from GWP. For any gas, it is the mass of CO 2 that would warm the earth as much as the mass of that gas. (Wikipedia)

**Category / Action / Option** : 3 level to determine CO2e emission factor. Exemple : Category Transportation / Action Train / Option TGV.  

## Tables


TODO 
- [ ]  Action périodiques à temps limité
- [ ]  Lier périodiques et actions  
Actions favorites

### Users

- DateTime **created_time** : Creation time (timestamp)
- String **display_name** : Displayed name
- String **email** : email
- String **uid** : UserId, users table
- Image path **photo_url** : Photo url
- DateTime (list) **connection_history** : (rafacto) list of last connexions
- Code parrain (code de la personne qui a invité)
- Code parrainage (pour inviter) a générer
- **co2target** : Target (Goal) parameter of the user

### Actions
- string **uid** : UserId, users table
- date **created_time** : Creation time (timestamp)
- string **country** : FR
- string **category** : transport/food/energy
- string **action** : For transport : train, bus, car, etc
- string **option** : For Train action : TGV / RER / Tramway / etc
- int **co2e** : calculated CO2e 
- int **count** : parameter for calculation (ex : 4000 KWH), portions for food
- double **emission_factor** : Emission factor returned by the API
- int **peopleSharing** : people in the house (energy) or in the car
- bool **roundtrip** : transport roundtrip
- bool **isPeriodic** (bool): tells the difference between actions and periodics
- String (list) **periodicity** (array) : array of strings with days of the week
- string **side** : Only for main food action (ex : rice, pasta)


### Stats

// Stats CO2e
// For all arrays above, [0] is today, [1] yesterday, etc.
- string **uid** : UserId, users table
- **days** : Array of last 7 days total CO2e.
- **weeks** : Array of last 4 weeks total CO2e.
- **months** : Array of last 4 months total CO2e.

- **energies** : Array of last 7 days energy CO2e.
- **foods** : Array of last 7 days food CO2e.
- **transports** : Array of last 7 days transport CO2e.
- **1 par catégorie** : donc 9

// Manque les stats pour la page stats, quand on affiche semaine ou mois, il faut les stats par catégorie sur la semaine / mois

- **globalScore** : Points des succès + Points accomplissements + Nouvelles actions
- **totalPoints** : Needs rework


// Attendre de voir si c'est utile dans l'UI
- **periodics** : Total CO2e of all periodics (Transport + Food + Energy)
- **energyPeriodics** : Total CO2e of all Energy Periodics
- **foodPeriodics** : Total CO2e of all Food Periodics
- **transportPeriodics** : Total CO2e of all Transport Periodics
- **1 par catégorie** : donc 9


// A voir si c'est toujours utile dans FF
- **daysCharts** : Array used by UI to display chart. Based on **days** field, reverse order, divided by 1000
- **weeksCharts** : Array used by UI to display chart. Based on **weeks** field, reverse order, divided by 1000
- **monthsCharts** : Array used by UI to display chart. Based on **monthsCharts** field, reverse order, divided by 1000


### Défis & Accomplissements

- **uid** : UserId, users table
- bool **has2Invites** : not yet implemented
- bool **has3Periodics** : user has 3 periodics
- bool **has50Actions** : user has 50 actions
- **has5Likes** : not yet implemented
- **has7DaysStreak** : not yet implemented
- **hasGoals** : user has changed is co2 target
- **hasParams** : not yet implemented
- **hasReviewApp**: not yet implemented
- **hasStart** : always true, first points


### Badges

- **uid** : UserId, users table
- bool **badge1** : 
- bool **has3Periodics** :
- bool **has50Actions** :


# Exemples

## Trajet en voiture
uid:"zezrzerzerzerfs12"
created_time: (dateTime)
country : "FR"
category : "transport"
action : "car"
option : "Thermique"
co2e: 17850
emission_factor: 119
peopleSharing : 2
count: 150
roundtrip : true
isPeriodic: false


## 2 cafés tous les jours
uid:"zezrzerzerzerfs12"
created_time: (dateTime)
country : "FR"
category : "food"
action : "coffee"
co2e: 200
emission_factor: 100
count: 2
isPeriodic: true
periodicity: ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"]
