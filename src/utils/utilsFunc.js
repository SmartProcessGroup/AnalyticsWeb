export function validarIP(ip) {
    // Se divide la dirección IP en sus cuatro partes
    const partesIP = ip.split(".");
  
    // Se comprueba que tenga cuatro partes
    if (partesIP.length !== 4) {
      return false;
    }
  
    // Se comprueba que cada parte sea un número entre 0 y 255
    for (const parte of partesIP) {
      const numero = parseInt(parte);
      if (isNaN(numero) || numero < 0 || numero > 255) {
        return false;
      }
    }
  
    // La dirección IP es válida
    return true;
  }