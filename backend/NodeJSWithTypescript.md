# Configurar Node.js con TypeScript y nodemon:

1. Iniciar un proyecto de Node.js y TypeScript:
   ```bash
   npm init -y
   ```
2. Instalar typescript, ts-node, y nodemon:
   ```bash
   npm install typescript ts-node nodemon --save-dev
   ```
3. Crear un archivo de configuración TypeScript (tsconfig.json):
   Puedes generar uno automáticamente ejecutando:

```bash
npx tsc --init 4. Actualizar tsconfig.json (opcional, según tus necesidades):
```

# Ajusta la configuración según tus preferencias.

1. Configurar scripts en package.json:
   ```json
   "scripts": {
   "dev": "nodemon --exec ts-node src/app.ts",
   "build": "tsc"
   }
   ```
2. Crear archivos TypeScript en la carpeta src/:
   Por ejemplo, src/app.ts.

3. Ejecutar el script de desarrollo:

```bash
 npm run dev
```

Este comando utilizará nodemon para ejecutar ts-node y supervisar cambios en tiempo real.

# Notas adicionales:

- Compilación manual (si es necesario):

Puedes ejecutar npm run build si necesitas compilar manualmente y crear la carpeta dist/ con los archivos JavaScript.

- Configuración adicional (si es necesario):

Puedes ajustar la configuración en tsconfig.json o nodemon.json según tus necesidades específicas.
Instalar tipos para Node.js (si es necesario):

```bash
npm install @types/node --save-dev
```

Siguiendo estos pasos, deberías tener una configuración básica para desarrollar aplicaciones Node.js con TypeScript y nodemon. El comando npm run dev será tu principal herramienta durante el desarrollo, ya que nodemon se encargará de reiniciar automáticamente tu aplicación cuando detecte cambios.
