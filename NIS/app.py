from flask import Flask, jsonify, request
from flask_cors import CORS

from optimization_manager import OptimizationModule


app = Flask(__name__)
CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'
optimization_module = OptimizationModule()

@app.route("/")
def main():
    return {"data": "OK"}, 200

@app.route("/api/optimize", methods=['POST'])
def optimize():
    if request.method == 'POST':
        optimization_parametes = request.get_json()
        optimization_module.set_parameters(optimization_parametes)
        data = optimization_module.optimize()
        return jsonify({"data": data})

@app.route('/api/weather')
def load():
    optimization_module.load_weather_data_to_db()
    return {"data": "OK"}, 200

if __name__ == "__main__":
    app.run(debug = True, port=5001)