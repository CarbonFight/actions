## CarbonFight terms

**CO2e** or **CO2eq** : Carbon dioxide equivalent (CO 2e or CO 2eq or CO 2-e) is calculated from GWP. For any gas, it is the mass of CO 2 that would warm the earth as much as the mass of that gas. (Wikipedia)

**Category / Action / Option** : 3 level to determine CO2e emission factor. Exemple : Category Transportation / Action Train / Option TGV.  

## Tables

### Users

- DateTime **created_time** : Creation time (timestamp)
- String **display_name** : Displayed name
- String **email** : email
- String **uid** : UserId, users table
- Image path **photo_url** : Photo url
- DateTime (list) **connection_history** : (rafacto) list of last connexions

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

### usersParameters
- **co2target** : Target (Goal) parameter of the user

### usersStats

- **globalProjection** : Needs rework
- **globalScore** : Needs rework
- **totalPoints** : Needs rework
- **days** : Array of last 7 days total CO2e.
- **weeks** : Array of last 4 weeks total CO2e.
- **months** : Array of last 4 months total CO2e.
- **energies** : Array of last 7 days energy CO2e.
- **foods** : Array of last 7 days food CO2e.
- **transports** : Array of last 7 days transport CO2e.

> For all arrays above, [0] is today, [1] yesterday, etc.

- **energyPeriodics** : Total CO2e of all Energy Periodics
- **foodPeriodics** : Total CO2e of all Food Periodics
- **transportPeriodics** : Total CO2e of all Transport Periodics
- **periodics** : Total CO2e of all periodics (Transport + Food + Energy)
- **daysCharts** : Array used by UI to display chart. Based on **days** field, reverse order, divided by 1000
- **weeksCharts** : Array used by UI to display chart. Based on **weeks** field, reverse order, divided by 1000
- **monthsCharts** : Array used by UI to display chart. Based on **monthsCharts** field, reverse order, divided by 1000
- **uid** : UserId, users table

### usersTrophies

- **uid** : UserId, users table
- **has2Invites** : not yet implemented
- **has3Periodics** : user has 3 periodics
- **has50Actions** : user has 50 actions
- **has5Likes** : not yet implemented
- **has7DaysStreak** : not yet implemented
- **hasGoals** : user has changed is co2 target
- **hasParams** : not yet implemented
- **hasReviewApp**: not yet implemented
- **hasStart** : always true, first points

