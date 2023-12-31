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
- double **target** : Target (Goal) parameter of the user. In Tonnes per year
- bool **skipHowto** : has finished or skipped howto
- String **badge** : Active badge
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
- string (list) **side** : Only for main food action (ex : rice, pasta)
- bool **newPurchase** : New purchase or second hand purchase
- date **yearPurchase** : Date of purchase (first or second hand),
- date **yearPreviousPurchase** : First purchase,
- date **yearEndPurchase** : End of depreciation

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
- int **eventUpdateDisplayNameCount** : increment +1 when user update display_name
- int **dayTotal** : Total CO2e
- int **dayTransport** : Total CO2e for the day for category transport
- int **dayServices** : Total CO2e for the day for category services
- int **dayObjects** : Total CO2e for the day for category objects
- int **dayLodging** : Total CO2e for the day for category Lodging
- int **dayFurniture** : Total CO2e for the day for category Furniture
- int **dayFood** : Total CO2e for the day for category Food
- int **dayDigital** : Total CO2e for the day for category Digital
- int **dayClothes** : Total CO2e for the day for category Clothes
- int **dayAppliance** : Total CO2e for the day for category Appliance
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
- double (list) **graphTotal** : total CO2e's array per day. [0] is 30 days ago, [30] is today, in KGs
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
- bool **onboardingUpdateTarget** : eventUpdateTargetCount > 0
- bool **onboardingUpdateTeam** : eventUpdateTeamCount > 0
- bool **sponsor1** : sponsorshipCount >= 1
- bool **sponsor2** : sponsorshipCount >= 5
- bool **sponsor3** : sponsorshipCount >= 10
- bool **sponsor4** : sponsorshipCount >= 20
- bool **streak[1,2,3]** : connectionStreak >= [7,15,30]
- bool **actions[1,2,3,4,5]** : actionsCountTotal >= [10,20,50,75,100]
- bool **periodic** : actionsPeriodicCountTotal >= 1
- bool **5periodics** : actionsPeriodicCountTotal >= 5
- bool **display** : eventUpdateDisplayNameCount >= 0
- bool **target** : eventUpdateTargetCount >= 0
- bool **delete** : eventActionDeleteCount >= 0
- bool **modify** : eventActionUpdateCount >= 0

## Success

- string **uid** : UserId, users table
- int **led** : led lamps
- int **pub** : use stop pub on mailbox
- int **greenEnergy** : use green option in energy contracts

## Badges

- **uid** : UserId, users table
- bool **onboardingHowtoFinished** : Has finished howto
- bool **onboardingAllChallenges** : Has finished all onboarding challenges

## Team Stats
