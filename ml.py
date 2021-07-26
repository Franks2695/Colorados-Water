#!/usr/bin/python
# -*- coding: utf-8 -*-

# Copyright (c) 2014 Andy Lewis                                               #
# --------------------------------------------------------------------------- #
# This program is free software; you can redistribute it and/or modify it     #
# under the terms of the GNU General Public License version 2 as published by #
# the Free Software Foundation, Inc., 59 Temple Place, Suite 330, Boston,     #
# MA 02111-1307 USA                                                           #
# This program is distributed in the hope that it will be useful, but WITHOUT #
# ANY WARRANTY. See the GNU General Public License for more details.          #

import math

from browser import doc
import browser.html as html
import browser.svg as svg

# PROYECTO INTEGRADOR

from ast import Str
import re
import numpy as np
import math
import pandas as pd
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from matplotlib import cm
import random
from sklearn import linear_model, metrics
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

Papers = pd.read_csv('datos_pro.csv') 
Papers = pd.DataFrame(Papers)
Papers1 = Papers.drop(['Fecha'], axis = 1)
#print(Papers)

tit = Papers1.iloc[:,4].values
tit = list(tit)

# LIMPIEZA DE DATOS
def control (Matriz):
    n6 = []
    n7 = []
    for i in Matriz:
        leer = str([i])
        # Eliminar carateres
        n1 = re.sub('[^a-zA-Z \n\.]+',' ', leer)
        # Minusculas
        n2 = n1.lower()
        n3 = n2.split()
        n6.append(n2)  
    
    return n6

titulos = control(tit)
#print(titulos)

######################################## PROBLEMAS DE MACHINE LEARNING 

########### TAREAS DE REGRESIÓN

###### PREDICCIÓN DE VENTAS
print(' ========================== PREDICCIÓN DE VENTAS ============================')
cant_datos = 162
d = Papers1.head(cant_datos)
#print(d) 
train = 0.7
test = 1-train

Papers2 = Papers1.drop(['Prod_Disponibles','Tipo'],1)
#df_shuffled = Papers2.sample(frac=1, random_state=8).reset_index(drop=True) 

suma = (Papers2['Cantidad_Ventas'] + Papers2['Monto_Compras'])
dataX =  pd.DataFrame()
dataX["suma"] = suma
XY_train = np.array(dataX)
z_train = Papers2['Monto_Ventas'].values

# Split-out validation dataset
X_train, X_test, y_train, y_test = train_test_split(XY_train, z_train, test_size = 0.3, random_state=0) #20

print()
regr2 = linear_model.LinearRegression()
regr2.fit(X_train, y_train)

# EVALUACIÓN DE RENDIMIENTO
y_pred = regr2.predict(X_test)
print()
print('EVALUACIÓN DE RENDIMIENTO REGRESIÓN:')
print()
print("Presición del modelo:", regr2.score(X_train, y_train))
print('MAE: ', metrics.mean_absolute_error(y_test, y_pred))
print('MSE: ', metrics.mean_squared_error(y_test, y_pred))
print('RMSE: ', np.sqrt(metrics.mean_squared_error(y_test, y_pred)))
print('R2: ', metrics.r2_score(y_test, y_pred))
print()
print()

val1 = int(input('Ingrese cantidad de ventas:'))
val2 = float(input('Ingrese monto de compras:'))
z_Dosmil = regr2.predict([[val1 + val2]])
print('PREDICCIÓN MONTO VENTAS: ', float(z_Dosmil))
print()


###### PREDICCIÓN DE COMPRAS
print(' ========================== PREDICCIÓN DE COMPRAS ============================')
d1 = Papers1.head(cant_datos)
#print(d) 
train1 = 0.7
test1 = 1-train1

print()

### Training
#tra1 = cant_datos*train1
suma1 = (Papers2['Cantidad_Ventas'] + Papers2['Monto_Ventas'])
dataX1 =  pd.DataFrame()
dataX1["suma"] = suma1
XY_train1 = np.array(dataX1)
z_train1 = Papers2['Monto_Compras'].values

# Split-out validation dataset
X_train1, X_test1, y_train1, y_test1 = train_test_split(XY_train1, z_train1, test_size = 0.3, random_state = 20)

print()
regr22 = linear_model.LinearRegression()
regr22.fit(X_train1, y_train1)

# EVALUACIÓN DE RENDIMIENTO
y_pred1 = regr22.predict(X_test1)
print()
print('EVALUACIÓN DE RENDIMIENTO REGRESIÓN:')
print()
print("Presición del modelo:", regr22.score(X_train1, y_train1))
print('MAE: ', metrics.mean_absolute_error(y_test1, y_pred1))
print('MSE: ', metrics.mean_squared_error(y_test1, y_pred1))
print('RMSE: ', np.sqrt(metrics.mean_squared_error(y_test1, y_pred1)))
print('R2: ', metrics.r2_score(y_test1, y_pred1))
print()
print()

val11 = int(input('Ingrese cantidad de ventas:'))
val22 = float(input('Ingrese monto de ventas:'))
z_Dosmil1 = regr2.predict([[val11 + val22]])
print('PREDICCIÓN MONTO COMPRAS: ', float(z_Dosmil1))
 