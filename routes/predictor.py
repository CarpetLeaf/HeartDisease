import sys
from tensorflow.keras.models import load_model
import numpy as np
import os

if __name__ == "__main__":
    answers = [0, 1]

    # data_str = sys.argv[1]
    data_str = "1.0,1.0,1.0,31.0,1.0,1.0,2.0,1.0,1.0,0.0,0.0,1.0,1.0,4.0,0.0,0.0,0.0,1.0,10.0,5.0,8.0"
    data_arr_str = data_str.split(',')
    data = [float(x) for x in data_arr_str]

    # answer = data[0]
    # data = data[1:]
    data = np.array(data)
    data = data.reshape(1, 21)

    # print(data)
    model = load_model(os.path.dirname(__file__)+"\prototypeNN1.h5")
    prediction = model.predict(data)

    aiAnswer = np.argmax(prediction)

    # print('Answer: ' + str(answer))
    print('AI answer: ' + str(answers[aiAnswer]))
