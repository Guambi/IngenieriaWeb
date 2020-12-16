/**
 * Transaccion.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    n_transaccion: {
      type: 'number',
      required: true
    },

    descripcion: {
      type: 'string',
      required: true,
      maxLength: 500,
    },

    valor: {
      type: 'number',
      required: true,
    },

    fecha: {
      type: 'string', 
      columnType: 'datetime',
      required: true
    },

    n_tarjeta: {
      type: 'number',
      required: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    local: {
      model: 'local',
    },

    diferido: {
      model: 'diferido',
    },

    pago: {
      collection:'pago',
      via: 'transaccion'
    },

    preautorizacion: {
      model: 'preautorizacion',
    },

    estado_movimiento: {
      model: 'estadoMovimiento',
    },

    estado_cuenta: {
      model: 'estadoCuenta',
    },
  },

};

