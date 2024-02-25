from flask import Flask, redirect, request, jsonify, send_from_directory, make_response
from flask_cors import CORS
from main import *
from werkzeug.utils import secure_filename


app = Flask(__name__)
CORS(app)
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024

app.config['UPLOAD_FOLDER'] = 'uploads/'

@app.route('/')
def index():
    return redirect('https://google.com')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    if(allowedFile(file.filename)):
        filename = linkGenerator(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(filename)))
        print('one file is uploaded')
        return jsonify({'message': {
            'link_code' : filename[:5]
        }, 'status': 'success'})

    else:
        print('one file is failed to upload')
        return jsonify({'message': 'not a valid file', 'status': 'error'})
    


@app.route('/download/<filename>', methods=['GET'])
def download(filename):
    database = getDatabase()
    try:
        if filename in database.keys():
            original_filename = database[filename]            
            exactFilename = secure_filename(filename + original_filename)
            return send_from_directory(directory=app.config['UPLOAD_FOLDER'], path=exactFilename, as_attachment=True, download_name=original_filename)
        else:
            return make_response('file not found', 404)
    except Exception as e:
        return str(e)


if __name__ == '__main__':
    app.run(debug=True)