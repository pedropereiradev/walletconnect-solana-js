export const predicates = {
  'verification-predicate': {
    abi: {
  "encoding": "1",
  "types": [
    {
      "typeId": 0,
      "type": "b256",
      "components": null,
      "typeParameters": null
    },
    {
      "typeId": 1,
      "type": "bool",
      "components": null,
      "typeParameters": null
    }
  ],
  "functions": [
    {
      "inputs": [],
      "name": "main",
      "output": {
        "name": "",
        "type": 1,
        "typeArguments": null
      },
      "attributes": null
    }
  ],
  "loggedTypes": [],
  "messagesTypes": [],
  "configurables": [
    {
      "name": "SIGNER",
      "configurableType": {
        "name": "",
        "type": 0,
        "typeArguments": null
      },
      "offset": 1016
    }
  ]
},
    bytecode: base64ToUint8Array('GvAwAHQAAAIAAAAAAAAD6F3/wAEQ//8AGuxQAJEAAohdQ/AAE0EAQHZAAA1hQAQBUEewsBrpAAAa5RAAIPgzAFj74AJQ++AEdAAAXBpD0ABQR7EgckgAQChFBIB0AAAPYUQEAV1D8AEbQBQAEEEUAFBHsHAa6QAAGuUQACD4MwBY++ACUPvgBHQAAEwaQ9AAUEexIHJIAEAoRQSAUEOxYHJIAEAoQRSAUEeyQHJIAEAoRQSAUEOwUF1H8AkQRRDAckgAIChBFIBf7QAAXUPwBl/tAAEaQ7AAUEexEHJIABAoRQSAUEOw8BrpEAAa5QAAIPgzAFj74AJQ++AEdAAAUxpD0ABQR7JAGkgAAFxP8Dh2TAAQXU/wCBNNMEB2TAAFXUkgAFBTsaByTAAgKFEkwHQAAARcSSAAUFOxoHJMACAoUSTAUE+xwHJIACAoTUSAdAAAA1BPscByUAAgKE0lAFBLseByUAAgKEk1AFBPsgByUAAgKE0lAFBLsBByUAAgKEkFAFBDsDByUAAgKEE1AEBJFAAaQIAAX+0AUF1DsFATQQBAdkAAAlBDsiB0AAABUEOyIFxD8DgkQAAAlQAAH5YIAAAa7FAAkQAAgBpLoAAaT5AAGlPgAFxD8Dh2QAAQXUPwABNBAEB2QAAFXUEgAHJEAEAo7QRAGkuwAHQAAARcQSAAckQAQCjtBEAaS7AAUEewQHJAAEAoRSQAdAAAA1BHsEByQABAKEUkAHJAAEAoTRQAGvUwAJIAAIAa+UAAmAgAAJcAAB9K+AAAlQAAP5YIAAAa7FAAkQABaBpDoAAaV5AAGlPgAFBHsBBySAAQKEUEgFBLsDByTAAQKEkUwF1HsAZQS7AgckwAEChJBMBQQ7BAckwAEChBJMBf7RAAX+wAAVBDsFByRAAQKEO0QFBHsOBySAAQKEUEgFBDsOBdR7AKXUuwCxtIFIAQRRSAX+0QH11H8Ahf7RAgXUewHV1LsCAQRRSAX+0QHlxH8Dh2RAAiXUewIBNFEEB2RAAOXUewH11FEABQS7FIckwAIChJFMBQR7DwUEEACHJIAAgoQRSAUEOxSFBLsGByRAAgKEkEQHQAAA1dR7AfXEUQAFBLsShyTAAgKEkUwFBHsPBQQQAIckgACChBFIBQQ7EoUEuwYHJEACAoSQRAUEewgHJAACAoRSQAdAAADF1HsB9QS7EIckwAIChJFMBQR7DwUEEACHJIAAgoQRSAUEOxCFBHsIBySAAgKEUEgFBDsKBySAAgKEEUgFBHsMBySAAgKEUEgHJAACAoVRQAGvVQAJIAAWga+UAAmAgAAJcAAD9K+AAARwAAAAAAAAAAAABAAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAIAAAAAAAAAM8'),
  },

};

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}
