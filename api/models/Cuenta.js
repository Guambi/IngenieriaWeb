/**
 * Cuenta.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    n_cuenta: {
      type: 'number',
      required: true,
      unique: true,
      example: '000121213131'
    },

    clave: {
      type: 'number',
      required: true,
      example: '123456'
    },

    puntuacion: {
      type: 'string',
      required: true,
      maxLength: 1,
      example: 'A'
    },

    mora: {
      type: 'boolean',
      required: true
    },

    refinanciacion: {
      type: 'boolean',
      required: true
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    cliente: {
      model: 'cliente',
      unique: true,
      required: true
    },

    estado_movimiento: {
      collection:'estadomovimiento',
      via: 'cuenta'
    },

    estado_cuenta: {
      collection:'estadocuenta',
      via: 'cuenta'
    },

    preautorizacion: {
      collection:'preautorizacion',
      via: 'cuenta'
    },

  },

};

