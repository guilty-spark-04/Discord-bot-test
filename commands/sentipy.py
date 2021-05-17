
from textblob import TextBlob
from wordcloud import WordCloud
import pandas as pd
import numpy as np
import re
import matplotlib.pyplot as plt
plt.style.use("fivethirtyeight")
print("Child succesfully initiated, generating data")

with open('./commands/messages.txt','r',encoding="utf8") as fs:
    data = fs.read()
data = data.replace(',',' ')
with open('./commands/messages.txt','w',encoding="utf8") as fs:
    fs.write(data)
data = pd.read_csv('./commands/messages.txt',header =None)
data.columns = ['Messages']

allWords = ' '.join([msgs for msgs in data['Messages']])

wordCloud = WordCloud(width = 500, height = 300, random_state = 21, max_font_size = 110).generate(allWords)

plt.imshow(wordCloud,interpolation="bilinear")
plt.axis('off')
plt.savefig("./commands/wordcloud.jpg")
