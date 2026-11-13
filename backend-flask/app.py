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
# GET STOCK PRODUCT FOR A SPECIFIC USER
# ---------------------------------------------

@app.get('/api/profiles/<user_id>/stock')

def get_user_stock(user_id):
    user_stock = stock.get(user_id, {})
    return jsonify(user_stock)

# ----------------------------------------------
#  ADD PRODUCT TO STOCK IN THE INVENTORY FOR A SPECIFIC USER
# ---------------------------------------------

@app.post('/api/profiles/<user_id>/stock')
def add_to_stock(user_id):

    user = profiles.get(user_id) #.get to look a key
    if user is None:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json(silent=True) #silent if nonvalid JSON, return None instead of raising an error

    if not isinstance(data, dict):
        return jsonify({"error": "Invalid JSON body"}), 400

    product_id = data.get("productId")
    minimum_quantity = data.get("minimumQuantity")

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    if (
        not isinstance(minimum_quantity, int)
        or isinstance(minimum_quantity, bool)
        or minimum_quantity < 0
    ):
        return jsonify({"error": "Minimum quantity value is invalid"}), 400

    product = next(
        (p for p in products if p["id"] == str(product_id)),
        None
    )  # next return first item that matches. 
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    
    user_stock = stock.setdefault(user_id, {}) # dictionary inside stock dict for specific user.


    if product["id"] in user_stock:
        return jsonify({"error": "Product already exists in stock list"}), 409
    
    stock_item = {
        **deepcopy(product),  #** to unpack the dictionary and create a new one with the same keys and values
        "minimumQuantity": minimum_quantity
    }

    user_stock[product["id"]] = stock_item

    return jsonify(stock_item), 201

# ----------------------------------------------
# ADD BATCHES TO THE PRODUCT IN THE CLINIC STOCK
# ---------------------------------------------

@app.post('/api/profiles/<user_id>/stock/<product_id>/batch')
def add_batch(user_id, product_id):

    user = profiles.get(user_id)
    if user is None:
        return jsonify({"error": "User not found"}), 404

    user_stock = stock.get(user_id, {})
    
    product_stock = user_stock.get(product_id)

    if product_stock is None:
        return jsonify({"error": "Product not found in stock"}), 404

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Invalid JSON body"}), 400

    batch_number = data.get("batchNumber")
    expiration_date = data.get("expirationDate")
    quantity = data.get("quantity")

    if not batch_number:
        return jsonify({"error": "Batch number is required"}), 400

    if not expiration_date:
        return jsonify({"error": "Expiration date is required"}), 400


    if (
        not isinstance(quantity, int)
        or isinstance(quantity, bool)
        or quantity < 1
    ):
        return jsonify({"error": "Quantity value is invalid"}), 400

    batch_item = {
        "batchNumber": batch_number,
        "expirationDate": expiration_date,
        "quantity": quantity
    }

    product_stock.setdefault("batches", []).append(batch_item)

    return jsonify(batch_item), 201

## For my DB tables: products, clinicStock and stockBatches

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
    