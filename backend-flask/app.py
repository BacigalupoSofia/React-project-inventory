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
# LIST ALL THE PRODUCTS IN STOCK
# ---------------------------------------------

@app.get('/api/stock')
def list_stock():
    return jsonify(stock)