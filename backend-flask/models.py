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

    category_id = db.Column(db.Integer,db.ForeignKey("categories.category_id"))
    category = db.relationship("Category", back_populates="products")

    manufacturer_id = db.Column(db.Integer, db.ForeignKey("manufacturers.manufacturer_id"))
    manufacturer = db.relationship("Manufacturer", back_populates="products")

    stock = db.relationship("Stock",back_populates="product",uselist=False)

    ##relationship to the prov
    provider_links = db.relationship("ProductProvider",back_populates="product")


class Providers(db.Model):
    __tablename__ = "providers"
    provider_id = db.Column(db.Integer,primary_key=True)
    provider_name = db.Column(db.String(50),nullable=False)
    provider_email = db.Column(db.String(100))
    website = db.Column(db.String(255))

    ##relationship to the prov for product
    provider_links = db.relationship("ProductProvider",back_populates="provider")


class Stock(db.Model):
    __tablename__ = "stock"

    stock_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer,default=0,nullable=False)
    minimum_quantity = db.Column(db.Integer,default=0,nullable=False)

    product_id = db.Column(db.Integer,db.ForeignKey("products_id"),nullable=False, unique=True) #stock record per product
    products = db.relationship("Products",back_populates="stock")


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
    product_pp = db.relationship("Products", back_populates="provider_links")

    provider_id = db.Column(db.Integer,db.ForeignKey("providers.provider_id"),nullable=False)
    provider_pp = db.relationship("Providers", back_populates="product_links")


#value of back_populates must be the name of the relationship on the other model.