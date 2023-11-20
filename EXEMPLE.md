
# Exemples d'actions

### Action ponctuelles

Un trajet en voiture thermique de 10 Kms, partagé à 2, aller-retour, non périodique.

```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category" : "transport",
    "action": "car",
    "option": "Thermique",
    "co2e": 595,
    "count": 10,
    "emission_factor": 119,
    "peopleSharing" : 2,
    "roundtrip" : true,
    "isPeriodic": false
}
```

Un trajet en métro, 10 arrêts, RATP, aller simple.

```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category" : "transport",
    "action": "metro",
    "option": "Paris",
    "co2e": 20,
    "count": 10,
    "emission_factor": 2,
    "roundtrip" : false,
    "isPeriodic": false
}
```

Un plat Poisson / Riz et légumes  
Pour les plats, une option "side" précise la liste des accompagnements.

```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category": "food",
    "action": "main",
    "option": "Poisson",
    "co2e": 767,
    "count": 1,
    "emission_factor": 100,
    "side": ["Riz","Légumes"],
    "isPeriodic": false
}
```

### Action périodique

Un contrat annuel d'électricité, 2244 KWH annuels, partagé dans un foyer de 4 personnes.  
Les contrats d'énergies sont par défaut périodiques sur 7 jours. Le facteur d'émission est annuel, le champ CO2e est journalier.  
Le calcul est donc : count (KWH annuels) * Facteur d'émission / Taille du foyer / 365  
Si l'utilisateur ne fixe pas d'option, c'est celle par défaut qui est retournée par l'API, ici "Mix Français".


```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category": "energy",
    "action": "electricity",
    "option": "Mix Français",
    "co2e": 21,
    "count": 2244,
    "emission_factor": 17,
    "peopleSharing" : 4,
    "isPeriodic": true,
    "periodicity" : ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"]
}
```

Deux cafés de type expresso, tous les jours sauf le dimanche.

```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category": "food",
    "action": "coffee",
    "option": "Expresso",
    "co2e": 200,
    "count": 2,
    "emission_factor": 100,
    "isPeriodic": true,
    "periodicity" : ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"]
}
```

### Action amortie

Un jean, amorti sur 2 ans, acheté neuf.
La fabrication du vêtement génère 24 Kg de CO2e. Amorti sur 2 ans, cette action amortie génère une nouvelle action avec une émission de 33g par jour.


```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category": "clothes",
    "action": "Pantalon",
    "option": "Jean",
    "co2e": 33,
    "count": 1,
    "emission_factor": 24000,
    "isPeriodic": true,
    "periodicity" : ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    "newPurchase" : true,
    "startDepreciation" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "endDepreciation" : "November 5, 2025 at 11:09:50 PM UTC+1",
}
```

Une télévision d'occasion 49 pouces, achetée 5 ans après son premier achat, amortie sur 10 ans.
La fabrication génère 500 Kg de CO2e. Amorti sur 10 ans, cette action amortie génère une nouvelle action avec une émission de 137g par jour.


```json
{
    "uid" : "tm8nhYrYSPFOKJgdonAt",
    "created_time" : "November 5, 2023 at 11:09:50 PM UTC+1",
    "country" : "FR",
    "category": "digital",
    "action": "television",
    "option": "49 pouces",
    "co2e": 137,
    "count": 1,
    "emission_factor": 500000,
    "isPeriodic": true,
    "periodicity" : ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"],
    "newPurchase" : false,
    "startDepreciation" : "November 5, 2021 at 11:09:50 PM UTC+1",
    "endDepreciation" : "November 5, 2026 at 11:09:50 PM UTC+1",
}
```