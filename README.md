# Chatbot Application

Customer Support Chatbot to answer FAQs and place orders

This chatbot application is intended to support customers by placing orders for them as well as to answer questions posted by the user in natural language. The chatbot can answer the questions based on natural language as well as place orders using a pre-defined syntax.

## Objective

Creae a chatbot for customer support to answer frequently ask question and order any product example laptop, mobile etc

## Technologies Used

* Angular: For building the frontend of the application

* Node.js: For building the backend of the application

* MongoDB: Database for storing application data

* Python: For writing the classifier to answer questions placed in natural language

## Setup Instructions

Clone the repo to your system and use npm install in the chatbot-frontend folder to install the node_modules folder

### Training the model

1. After cloning the repo, head to chatbot-backend -> src -> classifier.
2. In the same folder, a file (clf.pkl) has been saved which contains the trained model on faq_new.txt file.
3. If the file should be deleted to train on a new model, then comment lines 31 and 98 and uncomment lines 32 and 99 in script (python file).
4. Run the program once, this will train the model and create file clf.pkl.
5. Undo the changes made in step 3, the program will then be able to run with the node application.

### Setting up the product database

1. Start the backend application and the database (see steps 4, 5 and 6 in section 'Starting up the application')
2. Open Postman application
3. Send multiple POST requests to the URL: localhost:3000/products
4. The Body for each request should be of the following JSON format (example below):  
{  
&nbsp;&nbsp;&nbsp;"name": "Sony 08XX Earphones",  
&nbsp;&nbsp;&nbsp;"img": "https://www.sony.co.in/image/0db517b7884d87c665c1ca403bc22ce2?fmt=pjpeg&wid=660&hei=660&bgcolor=F1F5F9&bgc=F1F5F9",  
&nbsp;&nbsp;&nbsp;"desc": "Noice cancelling earphones with neckband by Sony, designed to eliminate external noise. Black in color.",  
&nbsp;&nbsp;&nbsp;"manufacturer": "Sony",  
&nbsp;&nbsp;&nbsp;"price": 3999,  
&nbsp;&nbsp;&nbsp;"code": "sony_ep_2"  
}  
All fields are compulsory.
5. The 'code' field will be used while placing orders.
6. You can add these details as you like.
7. 'price' should be a number and 'img' should be an image URL.
8. Close the database and backend applications when all entries have been added.

### Starting up the application

1. Open 3 terminal windows
2. In first window, navigate to the chatbot-frontend folder which is present inside the Chatbot folder.
3. Type ng serve --open and press Enter.
4. In second window, navigate to the chatbot-backend folder which is present in Chatbot folder.
5. Type npm run dev and press Enter.
6. In third terminal window, start your mongodb application (mongod.exe) by navigating to mogodb folder
in your system, and setting dbpath parameter as your mongodb data folder. Something like this-
mongodb/bin/mongod.exe --dbpath=mongodb-data
7. Once all the programs are active, you will be directed to the web appliaction.

## Usage Instructions

1. Use the commands mentioned in the chatbot screen to place orders.
2. The 'code' can be found in the page to view products.
3. See Home and About Us pages to more about website and the dealer.
4. Try greeting the chatbot by saying 'Hello' or ask customer care questions like 'Can I take the shipment after checking the contents inside?' or 'What items are eligible for free replacement?'by rephrasing them a bit.
