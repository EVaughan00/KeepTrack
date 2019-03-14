#!/usr/sbin/python

import pymongo

DB_NAME = "evdb"
DB_HOST = "ds141450.mlab.com"
DB_PORT = 41450
DB_USER = "evDB"
DB_PASS = "Wisdom2b"

myclient = pymongo.MongoClient(DB_HOST, DB_PORT)
db = myclient[DB_NAME]
db.authenticate(DB_USER, DB_PASS)

paperworks = db["paperworks"]
cashDrops = db["cashdrops"]

l = 0
i = 0
k = 0
TotalSales = 0
Visa = 0
MC = 0
Amex = 0
Discover = 0
RGift = 0
Day = 0
RMI = []
contents = []
RMTotals = 0
numba = 0
document = input("Please enter document name: ")
print("Scanning document: " + document)

try:
	open(document)
except:
	print("Document does not exist")
	quit()

def file_len(fname):
    with open(fname) as fi:
        for j, l in enumerate(fi):
            pass
    return j + 1

f = open(document, 'r')

numLines = file_len(document)
print("Length of document is: " + str(numLines))

for line in f.readlines():
    contents.append(line)

for vals in contents:
	if (vals[0:11] == 'Total Sales'):
		TotalSales = vals[12:50].strip()
		print('Total Sales are: ' + TotalSales)
	if (vals[0:4] == 'Visa'):
		Visa = vals[29:40].strip()
		print('Visa Totals are: ' + Visa)
	if (vals[0:3] == 'M/C'):
		MC = vals[29:40].strip()
		print('MC Totals are:  ' + MC)
	if (vals[0:4] == 'Amex'):
		Amex = vals[29:40].strip()
		print('Amex Totals are: ' + Amex)
	if (vals[0:8] == 'Discover'):
		Discover = vals[29:40].strip()
		print('Discover Totals are: ' + Discover)
	if (vals[0:11] == 'Redeem Gift'):
		RGift = vals[29:40].strip()
		print('Redeemed Gift Totals are: ' + RGift)
	if (vals[0:4] == 'DAYS'):
		Day = vals[5:14].strip()
		print('Day is: ' + Day)


while i < len(contents):
	if (contents[i][0:2] == 'RM'):
		while i < len(contents):
			if (contents[i][0:2] == 'RM'):
				numba = float(contents[i][28:40].strip())
				RMTotals += numba
				RMI.append(contents[i])
				i+=1
				k+=1
			else: 
				break
		print('Rocky Mountain Totals are: ' + str(RMTotals))
	i+=1

while l < len(RMI):
	print(RMI[l])
	l+=1


myIns = { "total" : TotalSales, "visa" : Visa, "mc" : MC, "amx" : Amex, "discover" : Discover, "redeemed" : RGift, "store": "Denver West", "date": Day }

#x = paperworks.insert_one(myIns)
