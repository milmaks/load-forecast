import os
from flask import Flask, flash, request
from werkzeug.utils import secure_filename
from flask_cors import CORS

from preprocessing.data_preprocessor import DataPreprocessor

UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), 'uploaded_files')
ALLOWED_EXTENSIONS = {'xlsx'}

app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
data_preprocessor = DataPreprocessor(UPLOAD_FOLDER)

@app.route("/")
def main():
    return {"data": "OK"}, 200

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/populate', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        # check if the post request has the file part
        if 'file' not in request.files:
            return {"data":"No file part"}, 400
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            return {"data":"No selected file"}, 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

            data_preprocessor.process_data(file.filename)
            return {"data": "OK"}, 200
    

if __name__ == "__main__":
    app.run(debug = True)