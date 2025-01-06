import App from './components/App';
import Home from "./components/Home";
import Category from "./components/Category";
import Item from "./components/Item";
import MarketPlace from './components/MarketPlace';


const routes = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Home />
            }, 
            {
                path: '/categories',
                element: <Category />
            },  
            {
                path:'/marketplaces',
                element: <MarketPlace />
            },
            {
                path: '/items',
                element: <Item />
              
            }

        ]
    }

]

export default routes;