import pandas as pd
import numpy as np
from sklearn.metrics import mean_absolute_error as mae
from sklearn.metrics import mean_squared_error as mse
from sklearn.metrics import r2_score as r2
import joblib

modelo_carregado = joblib.load("/content/fipe.pkl")

dados = {
    "year_of_reference": [2.022],
    "month_of_reference": [1.000],
    "fipe_code": [1.997],
    "brand": [8.200],
    "model": [6.168],
    "fuel": [2.0],
    "gear": [1.0],
    "engine_size": [1.0],
    "year_model": [2.9],
}
df = pd.DataFrame(dados)
df.head()
y_predict = modelo_carregado.predict(df)
print(y_predict)