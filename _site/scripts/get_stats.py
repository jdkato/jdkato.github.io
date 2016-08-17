import json
import requests

BASE_URL = 'http://stats.nba.com/stats/'

LEADERS_URL = BASE_URL + 'leagueleaders?LeagueID=00&PerMode=PerGame' \
    '&Scope=S&Season=All+Time&SeasonType=Regular+Season&StatCategory={0}'

PLAYER_URL = BASE_URL + 'commonplayerinfo?LeagueID=00&PlayerID={0}&' \
    'SeasonType=Regular+Season'


def get_json(url):
    data = requests.get(url).json()
    try:
        headers = data['resultSet']['headers']
        rows = data['resultSet']['rowSet']
    except KeyError:
        headers = data['resultSets']['headers']
        rows = data['resultSets']['rowSet']
    return [dict(zip(headers, row)) for row in rows]

'''
{u'MIN': 33.24765, u'TOV': 2.62446, u'REB': 9.44601, u'PLAYER_ID': 77498,
u'FG3A': 0.04343, u'EFG_PCT': 0.50312, u'PLAYER_NAME': u'Bob McAdoo',
u'AST': 2.28991, u'AST_TOV': 0.77105, u'FG3M': 0.00352, u'OREB': 2.35492,
u'FGM': 8.70892, u'PF': 3.19953, u'PTS': 22.05047, u'FGA': 17.31338,
u'TS_PCT': 0.55088, u'GP': 852, u'STL': 0.9728, u'FTA': 6.13732,
u'BLK': 1.48575, u'DREB': 7.12694, u'FTM': 4.62911,
u'STL_TOV': 0.32788, u'FT_PCT': 0.754, u'FG_PCT': 0.503, u'FG3_PCT': 0.081}
'''

database = dict()
for stat in ['PTS', 'BLK', 'STL', 'AST', 'REB']:
    data = get_json(LEADERS_URL.format(stat))
    for i, d in enumerate(data):
        name = d['PLAYER_NAME']
        del d['PLAYER_NAME']
        pos = get_json(PLAYER_URL.format(d['PLAYER_ID']))
        print(pos)
        if i < 30:
            if name not in database.keys() and pos == "Guard":
                database[name] = {'Per Game': d}
        else:
            break

for name in database.keys():
    print(database)
