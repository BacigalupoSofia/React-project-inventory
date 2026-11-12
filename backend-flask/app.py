from copy import deepcopy
from datetime import datetime, timezone

from flask import Flask, jsonify, request

app = Flask(__name__)

# ----------------------------------------------
# INITIAL DATA
# ---------------------------------------------

INITIAL_PRODUCTS = [

    {"id": "1",
     "productName": "Product 1",
     "description": "Description for Product 1",
     "manufacturer": "Manufacturer 1",
     "category": "Category 1",
     "provider": "Provider 1",
     "image": "image1.jpg"},

    {"id": "2",
     "productName": "Product 2",
     "description": "Description for Product 2",
     "manufacturer": "Manufacturer 2",
     "category": "Category 2",
     "provider": "Provider 2",
     "image": "image2.jpg"},

    {"id": "3",
     "productName": "Product 3",
     "description": "Description for Product 3",
     "manufacturer": "Manufacturer 3",
     "category": "Category 3",
     "provider": "Provider 3",
     "image": "image3.jpg"},
]

INITIAL_PROFILES = {
    "user-1": {
        "id": "user-1",
        "name": "Baggot Dental",
        "email": "baggotdental@example.com"
    },
     "user-2": {
            "id": "user-2",
            "name": "Another Practice",
            "email": "anotherpractice@example.com"
        }
}

products = deepcopy(INITIAL_PRODUCTS)
profiles = deepcopy(INITIAL_PROFILES)
stock = {}

# ----------------------------------------------
# HEALTH CHECK (to check backend is still working)
# ---------------------------------------------

@app.get('/api/health')
def health():
    return jsonify({"ok": True})

# ----------------------------------------------
# LIST ALL THE EXISTING DENTAL PRODUCTS (Not in my stock, just all dental products)
# ---------------------------------------------

@app.get('/api/products')
def list_stock():
    return jsonify(products)

# ----------------------------------------------
# GET A SINGLE PRODUCT BY ID
# ---------------------------------------------

@app.get('/api/products/<product_id>')
def get_product(product_id):
    product = next((p for p in products if p["id"] == product_id), None)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    return jsonify(product)

# searching the product in the products dictionary, if does not exist we return error, if exist we return in json

# ----------------------------------------------
# GET USER PROFILE
# ---------------------------------------------

@app.get('/api/profiles/<user_id>')
def get_profile(user_id):
    user = profiles.get(user_id)

    if user is None:
        return jsonify({"error": "User not found"}), 404
    
    return jsonify(user)

# ----------------------------------------------
#  STOCK IN THE INVENTORY FOR A SPECIFIC USER
# ---------------------------------------------



# ----------------------------------------------
# JSON ERROR HANDLER
# ---------------------------------------------

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404

@app.errorhandler(405)
def method_not_allowed(error):
    return jsonify({"error": "Method not allowed"}), 405

# ----------------------------------------------
# START FLASK APP
# ---------------------------------------------

if __name__ == '__main__':
    app.run(
        host='127.0.0.1',
        port=5001,
        debug=True)
    