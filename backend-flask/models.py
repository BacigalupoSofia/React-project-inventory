from extensions import db

#main table products (all dental products in ireland)
#providers
# product/provider relation table = one product can be bought from many providers
#stock= products in clinic, add quantity and exp date
#categories and manufacturer store in separate tables to dont repeat in every product


class Products(db.Model):
    __tablename__ = "products"

    product_id = db.Column(db.Integer,primary_key=True)
    product_name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.String(255))

class Providers(db.Model):
    __tablename__ = "providers"
    provider_id = db.Column(db.Integer,primary_key=True)
    provider_name = db.Column(db.String(50),nullable=False)
    provider_email = db.Column(db.String(100))
    website = db.Column(db.String(255))

class Stock(db.Model):
    __tablename__ = "stock"

    stock_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer,db.ForeignKey("products.id"),nullable=False)
    provider_id = db.Column(db.Integer,db.ForeignKey("providers.id"),nullable=False)
    quantity = db.Column(db.Integer,default=0,nullable=False)

class Category(db.Model):
    __tablename__ = "categories"

    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100),unique=True,nullable=False)

class Manufacturer(db.Model):
    __tablename__ = "manufacturers"

    manufacturer_id = db.Column(db.Integer, primary_key=True)
    manufacturer_name = db.Column(db.String(150),unique=True,nullable=False)

class ProductProvider(db.Model):
    __tablename__ = "product_providers"

    pp_id = db.Column(db.Integer, primary_key=True)
    pp_code = db.Column(db.String(100))
    purchase_price = db.Column(db.Numeric(10, 2))
