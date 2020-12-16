module.exports = {


  friendlyName: 'Crear Cuenta',


  description: 'Cuenta crear.',


  inputs: {
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    nombre: {
      type: 'string',
      required: true
    },
    cedula: {
      type: 'number',
      required: true
    },
    edad: {
      type: 'number',
      required: true
    },
    trabajo: {
      type: 'string',
      required: true
    },
    casa: {
      type: 'string',
      required: true
    },
  },

  exits: {
    success: {
      description: `The new customer was created.`,
    },

    redirect: {
      responseType: 'redirect',
      description: ''
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

    let newClient = {
      emailAddress: inputs.email,
      password: await sails.helpers.passwords.hashPassword(inputs.password),
      fullName: inputs.nombre,
      cedula: inputs.cedula,
      edad: inputs.edad,
      lugar_trabajo: inputs.trabajo,
      dirrecion: inputs.casa
    }

    let cliente = await Cliente.create(newClient).intercept('E_UNIQUE', 'emailAlreadyInUse')
    .intercept({name: 'UsageError'}, 'invalid').fetch();

    var n = Math.floor(Math.random()*4);

    let puntuacion;
    if(n == 0){
      puntuacion = 'A';
    }else if(n == 1){
      puntuacion = 'B';
    }else if(n == 2){
      puntuacion = 'C';
    }else if(n == 3){
      puntuacion = 'D';
    }

    n = Math.floor(Math.random()*2);
    let mora;
    if(n == 0){
      mora = true;
    }else{
      mora = false;
    }

    n = Math.floor(Math.random()*2);
    let ref;
    if(n == 0){
      ref = true;
    }else{
      ref = false;
    }

    let newAccount = {
      n_cuenta: Math.floor(Math.random()*10000000000),
      clave: Math.floor(Math.random()*1000),
      puntuacion: puntuacion,
      mora: mora,
      refinanciacion: ref,
      cliente: cliente.id
    }

    let cuenta = await Cuenta.create(newAccount).fetch();

    let movimiento = {
      estado_de_corte: '2020-11-26',
      cuenta: cuenta.id
    }
    await EstadoMovimiento.create(movimiento);

    let estadoCuenta = {
      fecha_maximo_pago: '2020-11-15',
      cuenta: cuenta.id
    }
    await EstadoCuenta.create(estadoCuenta);

    return exits.redirect('/admin/cuentas');

  }

};
