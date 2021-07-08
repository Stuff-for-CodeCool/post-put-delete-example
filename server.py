from flask import Flask, render_template, request, jsonify
from flask_minify import minify

app = Flask(__name__)
minify(app=app, html=True, js=True, cssless=True)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/add", methods=["POST"])
def adding():
    if request.is_json:
        item = request.json.get("item")
        return jsonify({"result": f"Added item {item}"})

    item = request.form.get("item")
    return render_template("index.html", result=f"Added item {item}")


@app.route("/edit", methods=["PUT"])
def changing():
    if request.is_json:
        item = request.json.get("item")
        return jsonify({"result": f"Modified item {item}"})

    item = request.form.get("item")
    return render_template("index.html", result=f"Modified item {item}")


@app.route("/delete", methods=["DELETE"])
def removin():
    if request.is_json:
        item = request.json.get("item")
        return jsonify({"result": f"Removed item {item}"})

    item = request.form.get("item")
    return render_template("index.html", result=f"Removed item {item}")


if __name__ == "__main__":
    app.run(debug=True)
