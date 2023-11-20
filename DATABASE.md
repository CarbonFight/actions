## CarbonFight terms

**CO2e** or **CO2eq** : Carbon dioxide equivalent (CO 2e or CO 2eq or CO 2-e) is calculated from GWP. For any gas, it is the mass of CO 2 that would warm the earth as much as the mass of that gas. (Wikipedia)

**Category / Action / Option** : 3 level to determine CO2e emission factor. Exemple : Category Transportation / Action Train / Option TGV.

## Users

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
- bool **skipHowto** : has finished or skipped howto
- DateTime (list) **connection_history** : (rafacto) list of last connexions

## Actions

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
- bool **newPurchase** : New purchase or second hand purchase
- date **startDepreciation** : Date of purchase (first or second hand),
- date **endDepreciation** : End of depreciation

## Stats

- string **uid** : UserId, users table
- int **score** : Actual score
- int **sponsorshipCount** : Sponsorship count
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
- int **eventActionAddCount** : increment +1 when user add action
- int **eventActionUpdateCount** : increment +1 when user update action
- int **eventActionDeleteCount** : increment +1 when user delete action
- int **eventUpdateTargetCount** : increment +1 when user update target
- int **eventUpdateTeamCount** : increment +1 when user update team
- int (list) **weekTotalPerDay** : total CO2e's array per day [0] the first day if the week, [6] is the last day.
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
- int (list) **monthTotalPerDay** : total CO2e's array per day [0] the first day of the month, [30] is last day of the month.
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
- int (list) **yearTotalPerDay** : total CO2e's array per day [0] the actual month, [11] is the last month of the year.
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

## Challenges

- string **uid** : UserId, users table
- bool **onboardingTransport** : actionsCountTransport > 0
- bool **onboardingServices** : actionsCountServices > 0
- bool **onboardingObjects** : actionsCountObjects > 0
- bool **onboardingLodging** : actionsCountLodging > 0
- bool **onboardingFurniture** : actionsCountFurniture > 0
- bool **onboardingFood** : actionsCountFood > 0
- bool **onboardingDigital** : actionsCountDigital > 0
- bool **onboardingClothes** : actionsCountClothes > 0
- bool **onboardingAppliance** : actionsCountAppliance > 0
- bool **onboardingUpdateAction** : eventUpdateCount > 0
- bool **onboardingDeleteAction** : eventDeleteCount > 0
- bool **onboardingUpdateTarget** : eventDeleteCount > 0
- bool **onboardingUpdateTeam** : eventDeleteCount > 0

## Badges

- **uid** : UserId, users table
- bool **onboardingHowtoFinished** : Has finished howto
- bool **onboardingAllChallenges** : Has finished all onboarding challenges

## Team Stats
