var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.allBics = [];

Bicicleta.add = function(aBici) {
    Bicicleta.allBics.push(aBici);
}

Bicicleta.findById = function(aBiciId) {
    var aBici = Bicicleta.allBics.find(x => x.id == aBiciId);
    if (aBici) return aBici;
    throw new Error(`No existe una bicicleta con el id ${aBiciId}`);
}

Bicicleta.removeById = function(aBiciId) {
    for(var i = 0; i < Bicicleta.allBics.length; i++) {
        if (Bicicleta.allBics[i].id == aBiciId) {
            Bicicleta.allBics.splice(i, 1);
            break;
        }
    }
}

var a = new Bicicleta(1, 'Rojo', 'Urbana', [14.0723, -87.1921]);
var b = new Bicicleta(2, 'Blanco', 'Deppet', [14.0750, -87.1950]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;