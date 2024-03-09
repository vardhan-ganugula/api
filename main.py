import random, json, os, threading, time

ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','zip', 'py', 'html', 'json', 'exe', 'apk'}

def allowedFile(filename:str):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def getDatabase():
    with open('database.json', 'r') as file:
        jsonData = json.load(file)
    return jsonData

def linkGenerator(fileName: str):
    randomName =  ("".join(random.sample('0123456789', 5)))
  
    jsonData = getDatabase()
    with open('database.json', 'w') as file:
        jsonData[randomName] = fileName
        data = json.dumps(jsonData, indent=2)
        file.write(data)

    encFile = randomName + fileName
    t1 = threading.Thread(target=removeFile, kwargs={'fileName' : encFile })
    t1.start()
    return encFile

def removeFile(fileName):
    time.sleep(120)
    os.remove('uploads/' + fileName)
    jsonData = getDatabase()
    with open('database.json', 'w') as file:
        del jsonData[fileName[:5]]
        data = json.dumps(jsonData, indent=2)
        file.write(data)
    print('one file is deleted')
