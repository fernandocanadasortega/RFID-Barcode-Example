# Barcode / RFID plug# Barcode / RFID plugin

Obtener lector de código de barras y RFID

## Instalación
El plugin se instala a través de npm: **npm i barcode-plugin**

## API

Para utilizar el plugin cuando ya ha sido instalado se debe importar en la clase de typescript en la que se quiera usar

<docgen-index>

* `import { BarcodePlugin } from "barcode-plugin";`

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### startScanner(...)
**Inicia un nuevo escaner, si hay algun escaner activo lo cierra**

```typescript
startScanner(options: { currentPda: string; newPda: string; wearable: string; }, callback: MyPluginCallback) => any
```

| Param          | Type                                                                   |
| -------------- | ---------------------------------------------------------------------- |
| **`options`**  | <code>{ currentPda: string; newPda: string; wearable: string; }</code>  **JSON con los datos de la PDA seleccionada** |
| **`callback`** | <code>(message: MyData \| null, err?: any) =&gt; void</code>  **Método que se encargará de recibir los datos que llegen del plugin**          |

**Returns:** <code>any</code>

--------------------


### closeScanner()
**Cierra el escaner activo actualmente**

```typescript
closeScanner() => any
```

**Returns:** <code>any</code>

--------------------

</docgen-api>


## Ejemplo de uso

```bash
  public scan() {
    try {
      this.storage.getStorage('scanners').then((scanners: any) => {
        if (scanners && scanners['currentScanner']) {
          BarcodePlugin.startScanner(
            {
              currentPda: scanners['lastScanner']["id"], newPda: scanners['currentScanner']["id"], wearable: scanners['wearable']
            }, this.getScannersData.bind(this)
          );
        }
      });
    }
    catch (error) { }
  }

  public closeScan() {
    BarcodePlugin.closeScanner();
  }
```

[Ejemplo completo](https://github.com/fernandocanadasortega/RFID-Barcode-Example/blob/master/src/app/pages/scanner/scanner.page.ts).

[Proyecto completo](https://github.com/fernandocanadasortega/RFID-Barcode-Example)
