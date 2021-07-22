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
