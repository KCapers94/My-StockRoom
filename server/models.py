from sqlalchemy_serializer import SerializerMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
from sqlalchemy.ext.associationproxy import association_proxy

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

metadata = MetaData()

db = SQLAlchemy(metadata=metadata)

from config import db

# Models go here!
class Category(db.Model, SerializerMixin):
    __tablename__ = 'categories'

    serialize_rules = ('-items.category',)
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    items = db.relationship(
        'Item', back_populates='category', cascade='all, delete-orphan'
    )

    marketplaces = association_proxy('items', 'market_place', creator=lambda market_place_obj: Item(market_place=market_place_obj))

    

    def __repr__(self):
        return f'<Category {self.name}>'
    
class Market_Place(db.Model, SerializerMixin):
     __tablename__ = 'marketplaces'

     serialize_rules = ('-items.market_place',)

     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String, nullable=False)

     items = db.relationship(
         'Item', back_populates='market_place', cascade='all, delete-orphan'
     )

     categories = association_proxy('items', 'category', creator=lambda category_obj: Item(market_place=category_obj))

     def __repr__(self):
         return f'<Market Place {self.name}>'
    
class Item(db.Model, SerializerMixin):
     __tablename__ = 'items'

     serialize_rules = ('-category.items', '-market_place.items',)

     id = db.Column(db.Integer, primary_key=True)
     name = db.Column(db.String, nullable=False)
     purchase_price = db.Column(db.Float, nullable=False)
     sell_price = db.Column(db.Float, nullable=False)
     
     @validates('sell_price')
     def validate_sell_price(self, key, price):
         if price == 1000000000:
             raise ValueError('Number too large')
         return price
    
     category_id = db.Column(db.Integer, db.ForeignKey('categories.id'))
     market_place_id = db.Column(db.Integer, db.ForeignKey('marketplaces.id'))

     category = db.relationship('Category', back_populates='items')
     market_place =  db.relationship('Market_Place', back_populates='items') 


     def __repr__(self):
         return f'<Items {self.name}, {self.purchase_price}, {self.sell_price}>'
