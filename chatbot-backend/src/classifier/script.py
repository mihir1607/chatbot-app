#qa_pairs.txt url: https://www.kaggle.com/rtatman/questionanswer-dataset

#Imports
import sys
import string
import random
import nltk
from nltk.tokenize import sent_tokenize, word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import PunktSentenceTokenizer
import sklearn
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
# from sklearn.externals import joblib
from pathlib import Path
import pandas as pd
import pickle
# from termcolor import colored

#NLTK Downloads (Need to do only once)
# nltk.download('punkt')
# nltk.download('stopwords')
# nltk.download('averaged_perceptron_tagger')
# nltk.download('wordnet')
# nltk.download('nps_chat')

#Global Constants
GREETING_INPUTS    = ("hello", "hi")
GREETING_RESPONSES = ["Hi", "Hey", "Hi there"]
FILENAME           = "src/classifier/faq_new.txt" #For running from Node.js
# FILENAME           = "faq_new.txt"  #For running from python script

#Global Variables
lem = nltk.stem.WordNetLemmatizer()
remove_punctuation = dict((ord(punct), None) for punct in string.punctuation)

#Functions
'''
fetch_features transforms a chat into a classifier friendly format
'''
def fetch_features(chat):
    features = {}
    for word in nltk.word_tokenize(chat):
        features['contains({})'.format(word.lower())] = True
    return features
'''
lemmatise performs lemmatization on words
'''
def lemmatise(tokens):
    return [lem.lemmatize(token) for token in tokens]

'''
tokenise tokenizes the words
'''
def tokenise(text):
    return lemmatise(nltk.word_tokenize(text.lower().translate(remove_punctuation)))

'''
Standard greeting responses that the bot can recognize and respond with
'''
def greet(sentence):
    for word in sentence.split():
        if word.lower() in GREETING_INPUTS:
            return random.choice(GREETING_RESPONSES)

'''
match matches a user input to the existing set of questions
'''
def match(user_response):
    resp      =''
    q_list.append(user_response)
    TfidfVec  = TfidfVectorizer(tokenizer=tokenise, stop_words='english')
    tfidf     = TfidfVec.fit_transform(q_list)
    vals      = cosine_similarity(tfidf[-1], tfidf)
    idx       = vals.argsort()[0][-2]
    flat      = vals.flatten()
    flat.sort()
    req_tfidf = flat[-2]
    if(req_tfidf==0):
        resp = resp+"Sorry! I don't know the answer to this."
        return resp
    else:
        resp_ids = qa_dict[idx]
        resp_str = ''
        s_id = resp_ids[0]
        end = resp_ids[1]
        while s_id<end :
            resp_str = resp_str + " " + sent_tokens[s_id]
            s_id+=1
        resp = resp+resp_str
        return resp
#Training the classifier
chats = nltk.corpus.nps_chat.xml_posts()[:10000]
featuresets = [(fetch_features(chat.text), chat.get('class')) for chat in chats]
size = int(len(featuresets) * 0.1)
train_set, test_set = featuresets[size:], featuresets[:size]
p = "src/classifier/clf.pkl" #For running from Node.js
# p = "clf.pkl" #For running from python script
my_file = Path(p)
if my_file.is_file():
    classifier = pickle.load(open(p, 'rb'))
else:
    classifier = nltk.MaxentClassifier.train(train_set)
    pickle.dump(classifier, open(p, 'wb'))
#classifier = nltk.NaiveBayesClassifier.train(train_set) #If you need to test Naive Bayes as well
# print(nltk.classify.accuracy(classifier, test_set))

#Question Bank Creation
ques_bank   = open(FILENAME,'r',errors = 'ignore')
qb_text     = ques_bank.read()
qb_text     = qb_text.lower()
sent_tokens = nltk.sent_tokenize(qb_text)# converts to list of sentences 
word_tokens = nltk.word_tokenize(qb_text)# converts to list of words
qa_dict     = {} #The Dictionary to store questions and corresponding answers
q_list      = [] #List of all questions
s_count     = 0  #Sentence counter

#Extract questions and answers
#Answer is all the content between 2 questions [assumption]
while s_count < len(sent_tokens):
    result = classifier.classify(fetch_features(sent_tokens[s_count]))
    if("question" in result.lower()):
        next_question_id = s_count+1
        next_question = classifier.classify(fetch_features(sent_tokens[next_question_id]))
        while(not("question" in next_question.lower()) and next_question_id < len(sent_tokens)-1):
            next_question_id+=1
            next_question = classifier.classify(fetch_features(sent_tokens[next_question_id]))
        q_list.append(sent_tokens[s_count])
        end = next_question_id
        if(next_question_id-s_count > 5):
            end = s_count+5
        qa_dict.update({len(q_list)-1:[s_count+1,end]})
        s_count = next_question_id
    else:
        s_count+=1
        
u_input = input()
u_input = u_input.lower()
if(greet(u_input)!=None):
    print(greet(u_input))
else:
    print(match(u_input).strip().capitalize())
    q_list.remove(u_input)