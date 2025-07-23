import db from '../config/db';
import Product from '../models/Producto.mo';

async function clearDatabase() {
  try {
    await db.authenticate();
    await Product.destroy({ where: {} }); // Borra todos los productos
    console.log('Base de datos limpiada');
    process.exit(0);
  } catch (error) {
    console.error('Error al limpiar la base de datos', error);
    process.exit(1);
  }
}

const args = process.argv.slice(2);
if (args.includes('--clear')) {
  clearDatabase();
} else {
  console.log('No se especificó --clear');
  process.exit(0);
}
