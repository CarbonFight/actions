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
- String **last_Name**
- String **first_Name**
- String **email** : email
- String **photo_url** : Photo url
- String **uid** : UserId, users table
- String **sponsorship_code** : Sponsorship code XXXX-XXXX
- String **sponsor** : Code from sponsor XXXX-XXXX
- string **team** : Team
- int **target** : Target (Goal) parameter of the user
- bool **hasCompletedHowto** : Has completed tutorial
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

### Team Stats
Todo
Mise à jour tous les jours


### Stats

- string **uid** : UserId, users table
- int **score** : Actual score
- int **sponsorshipCount** : Sponsorship count

For challenges, actions count

- int **actionsCountTotal** : Action count for all categories 
- int **actionsCountTransport**
- int **actionsCountServices**
- int **actionsCountObjects**
- int **actionsCountLodging**
- int **actionsCountFurniture**
- int **actionsCountFood**
- int **actionsCountDigital**
- int **actionsCountClothes**
- int **actionsCountAppliance**


Stats page, week period  
For all arrays above, [0] the first day if the week, [6] is the last day.

- int (list) **weekTotalPerDay** : total CO2e's array per day
- int **weekTotal** : Total CO2e 
- int **weekTransport** : Total CO2e for the week for category transport
- int **weekServices** : Total CO2e for the week for category services
- int **weekObjects** : Total CO2e for the week for category objects
- int **weekLodging** : Total CO2e for the week for category Lodging
- int **weekFurniture** : Total CO2e for the week for category Furniture
- int **weekFood** : Total CO2e for the week for category Food
- int **weekDigital** : Total CO2e for the week for category Digital
- int **weekClothes** : Total CO2e for the week for category Clothes
- int **weekAppliance** : Total CO2e for the week for category Appliance

Stats page, month period  
For all arrays above, [0] the first day of the month, [31] is last day of the month.

- int (list) **monthTotalPerDay** : total CO2e's array per day
- int **monthTotal** : Total CO2e for the month
- int **monthTransport** : Total CO2e for the month for category transport
- int **monthServices** : Total CO2e for the month for category services
- int **monthObjects** : Total CO2e for the month for category objects
- int **monthLodging** : Total CO2e for the month for category Lodging
- int **monthFurniture** : Total CO2e for the month for category Furniture
- int **monthFood** : Total CO2e for the month for category Food
- int **monthDigital** : Total CO2e for the month for category Digital
- int **monthClothes** : Total CO2e for the month for category Clothes
- int **monthAppliance** : Total CO2e for the month for category Appliance

Stats page, year period  
For all arrays above, [0] the actual month, [11] is the last month of the year.

- int (list) **yearTotalPerDay** : total CO2e's array per day
- int **yearTotal** : Total CO2e for the year
- int **yearTransport** : Total CO2e for the year for category transport
- int **yearServices** : Total CO2e for the year for category services
- int **yearObjects** : Total CO2e for the year for category objects
- int **yearLodging** : Total CO2e for the year for category Lodging
- int **yearFurniture** : Total CO2e for the year for category Furniture
- int **yearFood** : Total CO2e for the year for category Food
- int **yearDigital** : Total CO2e for the year for category Digital
- int **yearClothes** : Total CO2e for the year for category Clothes
- int **yearAppliance** : Total CO2e for the year for category Appliance


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
