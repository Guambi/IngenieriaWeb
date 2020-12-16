const moment = require('moment');

module.exports = {


  friendlyName: 'Transaccion',


  description: 'Transaccion crear.',


  inputs: {
    descripcion: {
      type: 'string',
      required: true
    },
    valor: {
      type: 'number',
      required: true
    },
    tarjeta:{
      type: 'number',
      required: true
    },
    cuenta:{
      type: 'number',
      required: true
    },
    local:{
      type: 'number',
      required: true
    },
    cuota:{
      type: 'number',
      required: true
    },
  },


  exits: {
    success: {
      description: `The new local was created.`,
    },

    redirect: {
      responseType: 'redirect',
      description: 'Requesting user is logged in, so redirect to the internal welcome page.'
    },

    badParam: {
      description: `Params provided are wrong.`,
      responseType: 'invalidLocal'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    }
  },


  fn: async function (inputs, exits) {
    let n = Math.floor(Math.random()*3);
    let newTransaccion;
    if(n==0){
      newTransaccion = {
        n_transaccion: Math.floor(Math.random()*1000),
        descripcion: inputs.descripcion,
        valor: inputs.valor,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'), //fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
        n_tarjeta: inputs.tarjeta,
        local: inputs.local,
        diferido: null,
        preautorizacion: inputs.cuenta
      }
    }else if(n==1){
      newTransaccion = {
        n_transaccion: Math.floor(Math.random()*1000),
        descripcion: inputs.descripcion,
        valor: inputs.valor,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'), //fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
        n_tarjeta: inputs.tarjeta,
        local: inputs.local,
        diferido: null,
        estado_movimiento: inputs.cuenta
      }

    }else if(n==2){
      newTransaccion = {
        n_transaccion: Math.floor(Math.random()*1000),
        descripcion: inputs.descripcion,
        valor: inputs.valor,
        fecha: moment().format('YYYY-MM-DD HH:mm:ss'), //fecha.getFullYear()+"-"+(fecha.getMonth()+1)+"-"+fecha.getDate(),
        n_tarjeta: inputs.tarjeta,
        local: inputs.local,
        diferido: null,
        estado_cuenta: inputs.cuenta
      }
    }

    if(inputs.cuota>0){
      let porcentaje = 0;
      if(inputs.cuota == 3){
        porcentaje = 2.71;
      }else if(inputs.cuota == 6){
        porcentaje = 4.79
      }else if(inputs.cuota == 12){
        porcentaje = 9.02
      }
      let newDiferido = {
        cuota: inputs.cuota,
        porcentaje_diferido: porcentaje
      }         
      let diferido = await Diferido.create(newDiferido).fetch();

      newTransaccion.diferido = diferido.id;

      let transaccion = await Transaccion.create(newTransaccion).fetch();

      let pago = {
        porcentaje_pagado: 0,
        valor_pagado: 0,
        fondos_licitos: false,
        transaccion: transaccion.id
      }

      await Pago.create(pago);
    }else{
      var fecha = Date.now();
      
      let transaccion = await Transaccion.create(newTransaccion).fetch();
      let pago = {
        porcentaje_pagado: 0,
        valor_pagado: 0,
        fondos_licitos: false,
        transaccion: transaccion.id
      }

      await Pago.create(pago);

    }
    
    
    // All done.
    return exits.redirect('/admin/transaccion');


  }


};
