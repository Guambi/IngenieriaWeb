module.exports = {


  friendlyName: 'Solicitud',


  description: 'Solicitud core.',


  inputs: {
    transaccion: {
      required: true,
      type: 'number',
    },

    cuotas: {
      required: true,
      type: 'string',
    }
  },


  exits: {
    success: {
      description: 'La solicitud fue hecha',
    },

    empty: {
      statusCode: 409,
      description: 'Estan vacios los campos',
    },

  },

  fn: async function (inputs) {

    if(inputs.transaccion == "" || inputs.cuotas == "" ){
      throw 'empty';
    }

    let transaccion = await Transaccion.findOne({
      id: inputs.transaccion
    }).populate('local').populate('diferido');

    let requisitos = new Array();

    if(transaccion.diferido != null){
      requisitos.push('Ya esta diferido');
    }else{

      if(transaccion.valor < 150){
        requisitos.push('El valor debe ser minimo de 150');
      }else{

        if(transaccion.estado_cuenta != null || transaccion.preautorizacion != null){
          requisitos.push('La transaccion debe estar en Movimiento');
        }else{
  
          let pago = await Pago.findOne({
            transaccion: inputs.transaccion
          });
          if(pago.porcentaje_pagado <= 25){
            requisitos.push('Se debe adelantar el pago de alrededor del 25%');
          }else{
  
            if(transaccion.local.solo_corriente){
              requisitos.push('El local si acepta diferidos');
            }else{
  
              let cuenta = await Cuenta.findOne({
                id: this.req.me.id
              });
              if(cuenta.mora){
                requisitos.push('El cliente no puede estar en mora');
              }else{
  
                if(cuenta.refinanciacion){
                  requisitos.push('El cliente no puede estar refinanciado');
                }else{
                  
                  if(cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B'){

                    let porcentaje = 0;
                    if(inputs.cuotas == 3){
                      porcentaje = 2.71;
                    }else if(inputs.cuotas == 6){
                      porcentaje = 4.79
                    }
                    
                    let diferido = await Diferido.create({
                      cuota: inputs.cuotas,
                      porcentaje_diferido: porcentaje
                    }).fetch();

                    transaccion = await Transaccion.updateOne({
                      id: transaccion.id
                    }).set({
                      diferido: diferido.id
                    });
                    
                  }else{
                    requisitos.push('El cliente debe tener una buena calificacion');
                  }
                }
              }
            }
          }
        }
      }
    }

    // All done.

    if(requisitos.length > 0){
      return 0;
    }else{
      return 1;
    }
    

  }


};
