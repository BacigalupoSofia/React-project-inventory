from extensions import db
from datetime import date

#main table products (all dental products in ireland)
#providers
# product/provider relation table = one product can be bought from many providers
#stock= products in clinic ---- Stock represents the product's overall inventory
# StockBatches represents individual lots with its own expiry date and quantity.
#categories and manufacturer store in separate tables to dont repeat in every product

class Users(db.Model):
    __tablename__ = "users"
    user_id = db.Column(db.Integer,primary_key=True)
    user_name = db.Column(db.String(50),nullable=False)
    user_email = db.Column(db.String(100), unique=True, nullable=False)

    password_hash = db.Column(db.String(255), nullable=False)

    products = db.relationship("Products", back_populates="users")


class Products(db.Model):
    __tablename__ = "products"

    product_id = db.Column(db.Integer,primary_key=True)
    product_name = db.Column(db.String(100),nullable=False)
    description = db.Column(db.Text)
    image = db.Column(db.String(255))

    category_id = db.Column(db.Integer,db.ForeignKey("categories.category_id"))
    category = db.relationship("Category", back_populates="products")

    manufacturer_id = db.Column(db.Integer, db.ForeignKey("manufacturers.manufacturer_id"))
    manufacturer = db.relationship("Manufacturer", back_populates="products")

    stock = db.relationship("Stock",back_populates="product",uselist=False)

    ##relationship to the prov
    provider_links = db.relationship("ProductProvider",back_populates="product")

    user_id = db.Column(db.Integer,db.ForeignKey("users.user_id"),nullable=False)
    users = db.relationship("Users", back_populates="products")

    def __repr__(self):
        return f"<Product {self.product_name}>"


class Providers(db.Model):
    __tablename__ = "providers"
    provider_id = db.Column(db.Integer,primary_key=True)
    provider_name = db.Column(db.String(50),nullable=False)
    provider_email = db.Column(db.String(100))
    website = db.Column(db.String(255))

    ##relationship to the prov for product
    provider_links = db.relationship("ProductProvider",back_populates="provider")

    ##relationship to batches
    stock_batches = db.relationship("StockBatches",back_populates="provider")


class Stock(db.Model):
    __tablename__ = "stock"

    stock_id = db.Column(db.Integer, primary_key=True)
    minimum_quantity = db.Column(db.Integer,default=0,nullable=False)

    product_id = db.Column(db.Integer,db.ForeignKey("products.product_id"),nullable=False, unique=True) #stock record per product
    product = db.relationship("Products",back_populates="stock")

    batches = db.relationship("StockBatches", back_populates="stock",cascade="all, delete-orphan")


class Category(db.Model):
    __tablename__ = "categories"

    category_id = db.Column(db.Integer, primary_key=True)
    category_name = db.Column(db.String(100),unique=True,nullable=False)

    products = db.relationship("Products", back_populates="category")


class Manufacturer(db.Model):
    __tablename__ = "manufacturers"

    manufacturer_id = db.Column(db.Integer, primary_key=True)
    manufacturer_name = db.Column(db.String(150),unique=True,nullable=False)

    products = db.relationship("Products", back_populates="manufacturer")

class ProductProvider(db.Model):
    __tablename__ = "product_providers"

    pp_id = db.Column(db.Integer, primary_key=True)
    pp_code = db.Column(db.String(100))
    purchase_price = db.Column(db.Numeric(10, 2))

    product_id = db.Column(db.Integer,db.ForeignKey("products.product_id"),nullable=False)
    product= db.relationship("Products", back_populates="provider_links")

    provider_id = db.Column(db.Integer,db.ForeignKey("providers.provider_id"),nullable=False)
    provider = db.relationship("Providers", back_populates="provider_links")

    __table_args__ = (db.UniqueConstraint("product_id","provider_id",name="unique_product_provider"),)

class StockBatches(db.Model):
    __tablename__ = "stock_batches"

    batch_id= db.Column(db.Integer, primary_key=True)
    expiry_date = db.Column(db.Date, nullable=False)
    quantity_remaining = db.Column(db.Integer,nullable=False,default=0)

    stock_id = db.Column( db.Integer, db.ForeignKey("stock.stock_id"),nullable=False)
    stock = db.relationship("Stock",back_populates="batches")

    provider_id = db.Column(db.Integer,db.ForeignKey("providers.provider_id"),nullable=True)
    provider = db.relationship("Providers",back_populates="stock_batches")

#value of back_populates must be the name of the relationship on the other model.