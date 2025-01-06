from flask import Flask, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource

from models import db, Category, Market_Place, Item

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
CORS(app)

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

class Home(Resource):

    def get(self):

        response_dict = {
            "message": "Welcome to the Keith RESTful API",
        }

        response = make_response(
            response_dict,
            200
        )

        return response

api.add_resource(Home, '/')

class Categories(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in Category.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
    def post(self):
        new_category = Category(
            name=request.json['name'],
        )

        db.session.add(new_category)
        db.session.commit()

        response_dict = new_category.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
api.add_resource(Categories, '/categories')

class CategoriesByID(Resource):

    def get(self, id):

        response_dict = Category.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    
    def patch(self, id):

        updated_category = Category.query.filter(Category.id == id).first()
        for attr in request.form:
            setattr(updated_category, attr, request.json[attr])

        db.session.add(updated_category)
        db.session.commit()

        response_dict = updated_category.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response
    
    def delete(self, id):

        category = Category.query.filter(Category.id == id).first()

        db.session.delete(category)
        db.session.commit()

        response_dict = {"message": "category successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response



api.add_resource(CategoriesByID, '/categories/<int:id>')


class Market_Places(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in Market_Place.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
    def post(self):

        new_market = Market_Place(
            name=request.json['name'],
        )

        db.session.add(new_market)
        db.session.commit()

        response_dict = new_market.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
api.add_resource(Market_Places, '/marketplaces')

class Market_PlaceID(Resource):

    def get(self, id):

        response_dict = Market_Place.query.filter_by(id=id).first().to_dict()

        response = make_response(
            response_dict,
            200,
        )

        return response
    
    def patch(self, id):

        update_market = Market_Place.query.filter_by(id=id).first()
        for attr in request.form:
            setattr(update_market, attr, request.form[attr])

        db.session.add(update_market)
        db.session.commit()

        response_dict = update_market.to_dict()

        response = make_response(
            response_dict,
            200
        ) 

        return response
    
    def delete(self, id):

        delete_market = Market_Place.query.filter_by(id=id).first()

        db.session.delete(delete_market)
        db.session.commit()

        response_dict = {"message": "record successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response
    
api.add_resource(Market_PlaceID, '/marketplaces/<int:id>')


class Items(Resource):

    def get(self):

        response_dict_list = [n.to_dict() for n in Item.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
    def post(self):
        
        new_item = Item(
            name=request.json['name'],
            purchase_price=request.json['purchase_price'],
            sell_price=request.json['sell_price'],
            category_id=request.json['category_id'],
            market_place_id=request.json['market_place_id'],
        )

        db.session.add(new_item)
        db.session.commit()

        response_dict = new_item.to_dict()

        response = make_response(
            response_dict,
            201,
        )

        return response
    
api.add_resource(Items, '/items')

class ItemsByID(Resource):

    def get(self, id):

        response_dict = Item.query.filter_by(id=id).first().to_dict()
        

        response = make_response(
            response_dict,
            200,
        )

        return response
    
    def patch(self, id):

        items = Item.query.filter_by(id=id).first()
        data = request.json

        if 'name' in data:
            items.name = data['name']
        if 'purchase_price' in data:
            items.purchase_price = data['purchase_price']
        if 'sell_price' in data:
            items.sell_price = data['sell_price']
        if 'category_id' in data:
            category = Category.query.filter_by(id=data['category_id']).first()
            if category:
                items.category_id = category.id
        if 'market_place_id' in data:
            market_place = Market_Place.query.filter_by(id=data['market_place_id']).first()
            if market_place:
                items.market_place_id = market_place.id


        db.session.commit()

        response_dict = items.to_dict()

        response = make_response(
            response_dict,
            200
        )

        return response
    
    def delete(self, id):

        delete = Item.query.filter_by(id=id).first()
    

        db.session.delete(delete)
        db.session.commit()

        response_dict = {"message": "item successfully deleted"}

        response = make_response(
            response_dict,
            200
        )

        return response
api.add_resource(ItemsByID, '/items/<int:id>')    

if __name__ == '__main__':
    app.run(port=5555, debug=True)