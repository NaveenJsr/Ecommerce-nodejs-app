# Ecommerce-nodejs-app

### How to Run 

1. Install All Node Modules for both the backend and frontend

```bash 
    cd ecommerce-backend-nodejs
    npm install
    cd ../ecommerce-frontend-react
    npm install
```

2. Now Create a `.env` file in **backend** and **frontend** folder and add two values to it.

for **Frontend**
```bash
    REACT_APP_API_URL = http://localhost:8000/api
```

for **Backend**
```bash
    PORT = 8000
    DATABASE = mongodb+srv://username:password@cluster0.uzyocvr.mongodb.net/ecommerce?retryWrites=true&w=majority
    JWT_SECRET = write_something_secret_here.
    BRAINTREE_MERCHANT_ID = Braintree Sandbox API Marchand Id
    BRAINTREE_PUBLIC_KEY = Braintree Sandbox Public API Key
    BRAINTREE_PRIVATE_KEY = Braintree Sandbox Private API Key
```

3. Now We can start server (Open `Two` Terminal)

First Terminal

```bash
    cd ecommerce-frontend-react
    npm start
```
On the Second Terminal

```bash
    cd ecommerce-backend-nodejs
    npm start
```
This will run the express server at 8000 port

4. All Server should be running now

     Visit http://localhost:3000 and we can access the website. 

5. you cannot see the products because products are not added to your database.
6. first signup your profile you are signup by default as a **user** if you want to change your role to an **admin**
7. goto your MongoDB server and then edit user data
8. role is by default **0** change into **1** now you are profile works as an admin.
9. you can add categories of products and you can add new products. 
10. you can add your product to the cart and you can purchase using a credit card or PayPal.


