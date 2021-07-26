const np = require('numpy');
const pd = require('node-pandas');
const sklearn = require('scikit-learn');

const Papers = pd.read_csv('datos_pro.csv');
const Papers1 = pd.DataFrame(Papers);
const Papers2 = Papers1.drop(['Fecha'], axis = 1);

const tit = Papers2.iloc['Fecha']
const tit1 = list(tit)

console.log(' ========================== PREDICCIÓN DE VENTAS ============================')