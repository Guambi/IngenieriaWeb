module.exports = {


  friendlyName: 'Reporte',


  description: 'Reporte admin.',


  inputs: {
    clase: {
      type: 'string',
    }
  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-reporte'
    },
  },


  fn: async function (inputs) {

    var clase = inputs.clase;
    let transacciones = new Array();
    let todosTransacciones = await Transaccion.find().populate('local').populate('diferido').populate('estado_movimiento').populate('estado_cuenta');
    let todosClientes = await Cuenta.find().populate('cliente');
    if (clase == "mora") {

      todosTransacciones.forEach(trans => {
        let val;
        let cuentaid;
        let cuenta = null;
        if (trans.estado_movimiento != null) {
          cuentaid = trans.estado_movimiento.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuentaid) {
              if (cli.mora) {
                cuenta = cli;
              }

            }
          });
        }
        if (trans.estado_cuenta != null) {
          cuentaid = trans.estado_cuenta.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuentaid) {
              if (cli.mora) {
                cuenta = cli;
              }
            }
          });
        }


        // All done.

        sails.log.info(cuenta);

        if (cuenta != null) {
          let requisitos = new Array();

          if (trans.diferido != null) {
            requisitos.push('Ya esta diferido');
          } else {

            if (trans.valor < 150) {
              requisitos.push('El valor debe ser minimo de 150');
            } else {

              if (trans.estado_cuenta != null || transaccion.preautorizacion != null) {
                requisitos.push('La transaccion debe estar en Movimiento');
              } else {

                if (trans.local.solo_corriente) {
                  requisitos.push('El local si acepta diferidos');
                } else {

                  if (cuenta.mora) {
                    requisitos.push('El cliente no puede estar en mora');
                  } else {

                    if (cuenta.refinanciacion) {
                      requisitos.push('El cliente no puede estar refinanciado');
                    } else {

                      if (cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B') {

                      } else {
                        requisitos.push('El cliente debe tener una buena calificacion');
                      }
                    }
                  }
                }
              }
            }
          }

          if (requisitos.length > 0) {
            val = 'No';
          } else {
            val = 'Si';
          }

          transaccion = {
            transaccion: trans,
            local: trans.local,
            diferido: trans.diferido,
            cliente: cuenta,
            validacion: val
          }
          transacciones.push(transaccion);
          cuenta = null;
        }
      });

    } else if (clase == "refinanciacion") {

      todosTransacciones.forEach(trans => {
        let val;
        let cuentaid;
        let cuenta = null;
        if (trans.estado_movimiento != null) {
          cuentaid = trans.estado_movimiento.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuentaid) {
              if (cli.refinanciacion) {
                cuenta = cli;
              }

            }
          });
        }
        if (trans.estado_cuenta != null) {
          cuentaid = trans.estado_cuenta.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuentaid) {
              if (cli.refinanciacion) {
                cuenta = cli;
              }
            }
          });
        }


        // All done.

        sails.log.info(cuenta);

        if (cuenta != null) {
          let requisitos = new Array();

          if (trans.diferido != null) {
            requisitos.push('Ya esta diferido');
          } else {

            if (trans.valor < 150) {
              requisitos.push('El valor debe ser minimo de 150');
            } else {

              if (trans.estado_cuenta != null || transaccion.preautorizacion != null) {
                requisitos.push('La transaccion debe estar en Movimiento');
              } else {

                if (trans.local.solo_corriente) {
                  requisitos.push('El local si acepta diferidos');
                } else {

                  if (cuenta.mora) {
                    requisitos.push('El cliente no puede estar en mora');
                  } else {

                    if (cuenta.refinanciacion) {
                      requisitos.push('El cliente no puede estar refinanciado');
                    } else {

                      if (cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B') {

                      } else {
                        requisitos.push('El cliente debe tener una buena calificacion');
                      }
                    }
                  }
                }
              }
            }
          }

          if (requisitos.length > 0) {
            val = 'No';
          } else {
            val = 'Si';
          }

          transaccion = {
            transaccion: trans,
            local: trans.local,
            diferido: trans.diferido,
            cliente: cuenta,
            validacion: val
          }
          transacciones.push(transaccion);
          cuenta = null;
        }
      });
    } else if (clase == "corriente") {

      todosTransacciones.forEach(trans => {
        if (trans.diferido == null) {
          let val;
          let cuenta;
          if (trans.estado_movimiento != null) {
            cuenta = trans.estado_movimiento.cuenta;
            todosClientes.forEach(cli => {
              if (cli.id == cuenta) {
                cuenta = cli;
              }
            });
          }
          if (trans.estado_cuenta != null) {
            cuenta = trans.estado_cuenta.cuenta;
            todosClientes.forEach(cli => {
              if (cli.id == cuenta) {
                cuenta = cli;
              }
            });
          }

          let requisitos = new Array();

          if (trans.diferido != null) {
            requisitos.push('Ya esta diferido');
          } else {

            if (trans.valor < 150) {
              requisitos.push('El valor debe ser minimo de 150');
            } else {

              if (trans.estado_cuenta != null || transaccion.preautorizacion != null) {
                requisitos.push('La transaccion debe estar en Movimiento');
              } else {

                if (trans.local.solo_corriente) {
                  requisitos.push('El local si acepta diferidos');
                } else {

                  if (cuenta.mora) {
                    requisitos.push('El cliente no puede estar en mora');
                  } else {

                    if (cuenta.refinanciacion) {
                      requisitos.push('El cliente no puede estar refinanciado');
                    } else {

                      if (cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B') {

                      } else {
                        requisitos.push('El cliente debe tener una buena calificacion');
                      }
                    }
                  }
                }
              }
            }
          }

          if (requisitos.length > 0) {
            val = 'No';
          } else {
            val = 'Si';
          }

          transaccion = {
            transaccion: trans,
            local: trans.local,
            diferido: trans.diferido,
            cliente: cuenta,
            validacion: val
          }
          transacciones.push(transaccion);
        }

      });

    } else if (clase == "diferido") {

      todosTransacciones.forEach(trans => {
        if (trans.diferido != null) {
          let val;
          let cuenta;
          if (trans.estado_movimiento != null) {
            cuenta = trans.estado_movimiento.cuenta;
            todosClientes.forEach(cli => {
              if (cli.id == cuenta) {
                cuenta = cli;
              }
            });
          }
          if (trans.estado_cuenta != null) {
            cuenta = trans.estado_cuenta.cuenta;
            todosClientes.forEach(cli => {
              if (cli.id == cuenta) {
                cuenta = cli;
              }
            });
          }

          let requisitos = new Array();

          if (trans.diferido != null) {
            requisitos.push('Ya esta diferido');
          } else {

            if (trans.valor < 150) {
              requisitos.push('El valor debe ser minimo de 150');
            } else {

              if (trans.estado_cuenta != null || transaccion.preautorizacion != null) {
                requisitos.push('La transaccion debe estar en Movimiento');
              } else {

                if (trans.local.solo_corriente) {
                  requisitos.push('El local si acepta diferidos');
                } else {

                  if (cuenta.mora) {
                    requisitos.push('El cliente no puede estar en mora');
                  } else {

                    if (cuenta.refinanciacion) {
                      requisitos.push('El cliente no puede estar refinanciado');
                    } else {

                      if (cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B') {

                      } else {
                        requisitos.push('El cliente debe tener una buena calificacion');
                      }
                    }
                  }
                }
              }
            }
          }

          // All done.

          if (requisitos.length > 0) {
            val = 'No';
          } else {
            val = 'Si';
          }

          transaccion = {
            transaccion: trans,
            local: trans.local,
            diferido: trans.diferido,
            cliente: cuenta,
            validacion: val
          }
          transacciones.push(transaccion);
        }

      });

    } else {
      todosTransacciones.forEach(trans => {
        let val;
        let cuenta;
        if (trans.estado_movimiento != null) {
          cuenta = trans.estado_movimiento.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuenta) {
              cuenta = cli;
            }
          });
        }
        if (trans.estado_cuenta != null) {
          cuenta = trans.estado_cuenta.cuenta;
          todosClientes.forEach(cli => {
            if (cli.id == cuenta) {
              cuenta = cli;
            }
          });
        }

        let requisitos = new Array();

        if (trans.diferido != null) {
          requisitos.push('Ya esta diferido');
        } else {

          if (trans.valor < 150) {
            requisitos.push('El valor debe ser minimo de 150');
          } else {

            if (trans.estado_cuenta != null || transaccion.preautorizacion != null) {
              requisitos.push('La transaccion debe estar en Movimiento');
            } else {

              if (trans.local.solo_corriente) {
                requisitos.push('El local si acepta diferidos');
              } else {

                if (cuenta.mora) {
                  requisitos.push('El cliente no puede estar en mora');
                } else {

                  if (cuenta.refinanciacion) {
                    requisitos.push('El cliente no puede estar refinanciado');
                  } else {

                    if (cuenta.puntuacion == 'A' || cuenta.puntuacion == 'B') {

                    } else {
                      requisitos.push('El cliente debe tener una buena calificacion');
                    }
                  }
                }
              }
            }
          }
        }

        // All done.

        if (requisitos.length > 0) {
          val = 'No';
        } else {
          val = 'Si';
        }

        transaccion = {
          transaccion: trans,
          local: trans.local,
          diferido: trans.diferido,
          cliente: cuenta,
          validacion: val
        }
        transacciones.push(transaccion);
      });
    }

    return {
      transacciones: transacciones,
    };

  }

};

