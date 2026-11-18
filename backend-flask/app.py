from copy import deepcopy
from datetime import datetime, timezone

from flask import Flask, jsonify, request, session
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate

from extensions import db

from models import Products, Users

from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = "super-secret-key" #move to env later to hide

# Database configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///inventory.db" #connect to my db inventory.db
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Initialise 
CORS(app)
db.init_app(app)
migrate = Migrate(app, db)

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

#products = deepcopy(INITIAL_PRODUCTS)
profiles = deepcopy(INITIAL_PROFILES)

stock = {
    "user-1": {
        "1": {
            "id": "1",
            "productName": "Product 1",
            "description": "Description for Product 1",
            "manufacturer": "Manufacturer 1",
            "category": "Category 1",
            "provider": "Provider 1",
            "image": "image1.jpg",
            "minimumQuantity": 10
        },
        "2": {
            "id": "2",
            "productName": "Product 2",
            "description": "Description for Product 2",
            "manufacturer": "Manufacturer 2",
            "category": "Category 2",
            "provider": "Provider 2",
            "image": "image2.jpg",
            "minimumQuantity": 15
        }
    }
}

cart = {}

# ----------------------------------------------
# HEALTH CHECK (to check backend is still working)
# ---------------------------------------------

@app.get('/api/health')
def health():
    return jsonify({"ok": True})

# ----------------------------------------------
# USER REGISTRATION (user will be the clinic, one session per practice)
# ---------------------------------------------

@app.post('/api/register')
def register():

    data = request.get_json()
    if not data.get("userName"): 
        return (jsonify({"message": "User Name is required"}), 400)
    if not data.get("userEmail"):
        return (jsonify({"message": "User email is required"}), 400)
    if not data.get("userPassword"):
        return (jsonify({"message": "User Name is required"}), 400)

    existing_user = Users.query.filter_by(user_email=data.get("email")).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 409

    new_user = Users (
        user_name = data.get("userName"),
        user_email = data.get("userEmail"),
        password_hash=generate_password_hash(data.get("userPassword"))
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "Clinic registered successfully",
        "user_id": new_user.user_id
    }), 201

# ----------------------------------------------
# USER LOGIN
# ---------------------------------------------

#receive email and password - find the user - check password matches - create a flask session

@app.post('/api/login')
def login():

    data = request.get_json()
    email = data.get("userEmail")
    password = data.get("userPassword")
    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    user = Users.query.filter_by(user_email=email).first()
    if user is None:
        return jsonify({"message": "Invalid email or password"}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid email or password"}), 401

    session["user_id"] = user.user_id

    return jsonify({
            "message": "Login successful",
            "user_id": user.user_id
        }), 200

# ----------------------------------------------
# CRUD FOR FULL PRODUCT LIST 
# ---------------------------------------------

# 1- LIST ALL THE EXISTING DENTAL PRODUCTS (Not in my stock, just all dental products)
@app.get('/api/products')
def list_all():

    products = Products.query.all()
    products_list = []

    for product in products:
        products_list.append({
            "id": product.product_id,
            "productName": product.product_name,
            "description": product.description,
            "image": product.image
        })

    return jsonify(products_list)


# 2 ADD - receive new product from react request.get

@app.post ('/api/products')
def add_new():

    data = request.get_json()

    if not data.get("productName"):
        return jsonify({"error": "Product name is required"}), 400

    new_product = Products (
        product_name=data.get("productName"),
        description=data.get("description"),
        image=data.get("image")
    )

    db.session.add(new_product)
    db.session.commit()

    return jsonify({
        "message": "Product created successfully"
    }), 201

# 3 GET by Id 

@app.get('/api/products/<product_id>')
def get_product(product_id):

    product = db.session.get(Products, product_id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404
    
    return jsonify({
        "id": product.product_id,
        "productName": product.product_name,
        "description": product.description,
        "image": product.image
})

# 4 DELETE 

@app.delete('/api/products/<product_id>')
def delete_product (product_id):

    product = db.session.get(Products, product_id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404

    db.session.delete(product)
    db.session.commit()

    return jsonify({"message": "Product deleted successfully"}), 200

@app.patch('/api/products/<int:product_id>')
def edit_product (product_id):

    product = db.session.get(Products, product_id)
    if product is None:
        return jsonify({"error": "Product not found"}), 404

    data = request.get_json()
    if "productName" in data:
        product.product_name = data["productName"]
    if "description" in data:
        product.description = data["description"]
    if "image" in data:
        product.image = data["image"]

    db.session.commit()

    return jsonify({
        "message": "Product updated successfully",
    }), 200


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

    with app.app_context():
        db.create_all()
    app.run(
        host='127.0.0.1',
        port=5001,
        debug=True)
    
    


# ----------------------------------------------
# ADD TO CART
# ---------------------------------------------

@app.post('/api/cart')
def add_to_cart():

    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return jsonify({"error": "Invalid JSON body"}), 400

    user_id = data.get("userId")
    product_id = data.get("id")
    status = data.get("status")

    if not product_id:
        return jsonify({"error": "Product ID is required"}), 400

    cart_item = {
        "productId": id,
        "quantity": 1,
        "status": status
    }

    cart[product_id] = cart_item

    return jsonify(cart_item), 201

    
