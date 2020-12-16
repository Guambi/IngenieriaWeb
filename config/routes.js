/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝
  'GET /':                   { action: 'view-homepage-or-redirect' },
  'GET /welcome/:unused?':   { action: 'dashboard/view-welcome' },

  'GET /signup':             { action: 'entrance/view-signup' },

  //login admin
  'GET /login':              { action: 'entrance/view-login' },
  'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  'GET /password/new':       { action: 'entrance/view-new-password' },

  'GET /account':            { action: 'account/view-account-overview' },
  'GET /account/password':   { action: 'account/view-edit-password' },
  'GET /account/profile':    { action: 'account/view-edit-profile' },

  //Core Admin
  'GET /admin/estadoCuenta':       {action: 'admin/estado-cuenta'},
  'GET /admin/estadoMovimiento':       {action: 'admin/estado-movimiento'},
  'GET /admin/transaccion/:unused?':       {action: 'admin/transacion'},
  'GET /admin/cuentas/:unused?':       {action: 'admin/cuenta'},
  'GET /admin/locales/:unused?':       {action: 'admin/local'},
  'GET /admin/pagos':       {action: 'admin/pagos'},
  'GET /admin/reporte/:clase?':       {action: 'admin/reporte'},

  //Core crear
  'POST /admin/cuentas':       {action: 'admin/crear/cuenta'},
  'POST /admin/transaccion':       {action: 'admin/crear/transaccion'},
  'POST /admin/locales':       {action: 'admin/crear/local'},

  //Core editar
  'PUT /admin/cuentas':       {action: 'admin/crear/cuenta'},
  'PUT /admin/transaccion':       {action: 'admin/crear/transaccion'},
  'PUT /admin/locales':       {action: 'admin/editar/local'},

  //Core eliminar
  'POST /admin/cuentas/eliminar/:id':       {action: 'admin/eliminar/cuenta'},
  'POST /admin/transaccion/eliminar/:id':       {action: 'admin/eliminar/transaccion'},
  'POST /admin/locales/eliminar/:id':       {action: 'admin/eliminar/local'},

  //Core customer
  'GET /customerlogin':              { action: 'customer/entrance/view-login' },
  'GET /customer/dashboard':         {action: 'customer/dashboard'},
  'GET /customer/movimiento':         {action: 'customer/estado-movimiento'},
  'GET /customer/cuenta':         {action: 'customer/estado-cuenta'},
  'GET /customer/pagos':         {action: 'customer/pagos'},
  'POST /customer/pagos':         {action: 'customer/crear/pago'},
  'GET /customer/solicitud':         {action: 'customer/solicitud-core'},
  'POST /customer/solicitud':         {action: 'customer/core/solicitud'},
  'GET /customer/solicitudAprovada':         {action: 'customer/core/solicitud-aceptada'},
  'GET /customer/solicitudNegada':         {action: 'customer/core/solicitud-denegada'},

  // 'GET /password/forgot':    { action: 'entrance/view-forgot-password' },
  // 'GET /password/new':       { action: 'entrance/view-new-password' },

  //  ╔╦╗╦╔═╗╔═╗  ╦═╗╔═╗╔╦╗╦╦═╗╔═╗╔═╗╔╦╗╔═╗   ┬   ╔╦╗╔═╗╦ ╦╔╗╔╦  ╔═╗╔═╗╔╦╗╔═╗
  //  ║║║║╚═╗║    ╠╦╝║╣  ║║║╠╦╝║╣ ║   ║ ╚═╗  ┌┼─   ║║║ ║║║║║║║║  ║ ║╠═╣ ║║╚═╗
  //  ╩ ╩╩╚═╝╚═╝  ╩╚═╚═╝═╩╝╩╩╚═╚═╝╚═╝ ╩ ╚═╝  └┘   ═╩╝╚═╝╚╩╝╝╚╝╩═╝╚═╝╩ ╩═╩╝╚═╝
  '/logout':                  '/api/v1/account/logout',


  //  ╦ ╦╔═╗╔╗ ╦ ╦╔═╗╔═╗╦╔═╔═╗
  //  ║║║║╣ ╠╩╗╠═╣║ ║║ ║╠╩╗╚═╗
  //  ╚╩╝╚═╝╚═╝╩ ╩╚═╝╚═╝╩ ╩╚═╝
  // …


  //  ╔═╗╔═╗╦  ╔═╗╔╗╔╔╦╗╔═╗╔═╗╦╔╗╔╔╦╗╔═╗
  //  ╠═╣╠═╝║  ║╣ ║║║ ║║╠═╝║ ║║║║║ ║ ╚═╗
  //  ╩ ╩╩  ╩  ╚═╝╝╚╝═╩╝╩  ╚═╝╩╝╚╝ ╩ ╚═╝
  // Note that, in this app, these API endpoints may be accessed using the `Cloud.*()` methods
  // from the Parasails library, or by using those method names as the `action` in <ajax-form>.
  '/api/v1/account/logout':                           { action: 'account/logout' },
  'PUT   /api/v1/account/update-password':            { action: 'account/update-password' },
  'PUT   /api/v1/account/update-profile':             { action: 'account/update-profile' },
  'PUT   /api/v1/entrance/login':                        { action: 'entrance/login' },
  'POST  /api/v1/entrance/signup':                       { action: 'entrance/signup' },
  'POST  /api/v1/entrance/update-password-and-login':    { action: 'entrance/update-password-and-login' },


  //Proyecto Core
  'PUT   /api/v1/customer/entrance/login':                        { action: 'customer/entrance/login' },
  
};
