#!/usr/sbin/python

import pymongo
import datetime
 
d = datetime.datetime.today()

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

#date = str(d.month) + "/" + str(d.day)

l = 0
i = 0
k = 0
TotalSales = 0
Visa = 0
MC = 0
Amex = 0
Discover = 0
RGift = 0
AGift = 0
Day = 0
RMI = []
contents = []
RMTotals = 0
numba = 0
over = 0 
short = 0
POut = 0
DD = 0
GH = 0
Post = 0
UE = 0

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
	if (vals[0:10] == 'Gift Cards'):
                AGift = vals[29:40].strip()
                print('Redeemed Gift Totals are: ' + AGift)
	if (vals[0:4] == 'DAYS'):
		Day = vals[5:14].strip()
		print('Day is: ' + Day)
	if (vals[0:9] == 'Paid Outs'):
		POut = vals[29:40].strip()
	if (vals[0:9] == 'Door Dash'):
		DD = vals[30:40].strip()
		print('Door Dash Totals are: ' + DD)
	if (vals[0:8] == 'Grub Hub'):
		GH = vals[30:40].strip()
		print('Grub Hub Totals are: ' + GH)
	if (vals[0:9] == 'Postmates'):
		Post = vals[30:40].strip()
		print('Postmates totals are: ' + Post)
	if (vals[0:9] == 'Uber Eats'):
		UE = vals[30:40].strip()
		print("Uber Eats totals are: " + UE)



print('Total Paid Outs: ' + POut)

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
		RMTotals = round(RMTotals, 2)
		print('Rocky Mountain Totals are: ' + str(RMTotals))
	i+=1

Apples = 0
Truffles = 0
ByPound = 0
DogBones = 0
Misc = 0


while l < len(RMI):
	if (RMI[l][5:11] == "Apples"):
		Apples = RMI[l][32:40].strip()
		print("Apple totals are: " + Apples)
	if (RMI[l][5:9] == "Misc"):
                Misc = RMI[l][32:40].strip()
                print("Misc totals are: " + Misc)
	if (RMI[l][5:13] == "Truffles"):
                Truffles = RMI[l][32:40].strip()
                print("Truffle totals are: " + Truffles)	
	if (RMI[l][5:13] == "By Pound"):
                ByPound = RMI[l][32:40].strip()
                print("Fudge by pound totals are: " + ByPound)
	if (RMI[l][5:14] == "Dog Bones"):
                DogBones = RMI[l][32:40].strip()
                print("Dog Bone totals are: " + DogBones)
	l+=1

cashDrop = db.cashdrops.find({ "store": "Denver West", "date": Day }).sort("_id", -1).limit(2)
evdrop = 0
mordrop = 0
queryNum = 0 
name = ''
note = ''
notes = ''
morNotes = ''
evNotes = ''
notesArr = []
name1 = ''
name2 = ''
nameArr = []

for x in cashDrop:
	evdrop += x["drop"]
	name = x["name"]
	nameArr.append(x["name"])
	if (x["notes"] != ""):
		notesArr.append(x["notes"])
		note = x["notes"]
	queryNum+=1

print("Number of drops: " + str(queryNum))

if (len(notesArr) > 1):
	print("Checking noets and names")
	evNotes = notesArr[0]
	morNotes = notesArr[1]
	print("Morning notes are: " + morNotes)
	print("Evening notes are: " + evNotes)
	notes = morNotes + ". " + evNotes
else:
        morndrop = 0
        notes = note
        print("Note is: " + notes)

if (len(nameArr) > 1):	
	name1 = nameArr[0]
	name2 = nameArr[1]
	print("Morning Name is: " + name2)
	print("Evening Name is: " + name1)
	name = name2 + ", " + name1

totalDrop = round(evdrop, 2)
print("Total cash drop is: " + str(totalDrop))

drop = round(float(TotalSales) + float(AGift) - float(POut) - float(Visa) - float(MC) - float(Amex) - float(Discover) - float(RGift) - float(mordrop), 2)
short = round(float(evdrop) - float(drop), 2)

print("Short is: " + str(short))

myIns = { "total" : TotalSales, "visa" : Visa, "mc" : MC, "amx" : Amex, "discover" : Discover, "redeemed" : RGift, "activated": AGift,  "store": "Denver West", "date": Day, "Apples": Apples, "Truffles": Truffles, "ByPound": ByPound, "DogBones": DogBones, "Misc": Misc, "short": short, "drop": evdrop, "name": name, "notes": notes, "Door Dash": DD, "Postmates": Post, "Grub Hub": GH, "Uber Eats": UE }

x = paperworks.insert_one(myIns)
