#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Category, Market_Place, Item

if __name__ == '__main__':
    
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        fake = Faker()

        Category.query.delete()

        categories = []

        categories.append(Category(name='Pokemon'))
        categories.append(Category(name='Funko Pops'))
        categories.append(Category(name='Sneakers'))
        categories.append(Category(name='Comic Books'))

        

        db.session.add_all(categories)
        db.session.commit()

        Market_Place.query.delete()

        market_places = []

        market_places.append(Market_Place(name='Ebay'))
        market_places.append(Market_Place(name='StockX'))
        market_places.append(Market_Place(name='Comic Con'))

        db.session.add_all(market_places)
        db.session.commit()

        Item.query.delete()

        items = []

        items.append(Item(name='Bred 11s', purchase_price=220, sell_price=600, category_id=3, market_place_id=2))
        items.append(Item(name='Marty Mc Flys', purchase_price=250, sell_price=35000, category_id=3, market_place_id=2))
        items.append(Item(name='Darth Vader POP', purchase_price=35, sell_price=250, category_id=2, market_place_id=3))
        items.append(Item(name='Amazing Spider Man 1', purchase_price=5, sell_price=20000, category_id=4, market_place_id=1))
        items.append(Item(name='Pokemon Emerald', purchase_price=35, sell_price=1000, category_id=1, market_place_id=3))

        db.session.add_all(items)
        db.session.commit()
