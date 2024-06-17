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
      "offset": 1104
    }
  ]
},
    bytecode: base64ToUint8Array('GvAwAHQAAAIAAAAAAAAEQF3/wAEQ//8AGuxQAJEAArBdQ/AAE0EAQHZAAA1hQAQBUEew2BrpAAAa5RAAIPgzAFj74AJQ++AEdAAAcxpD0ABQR7FIckgAQChFBIB0AAAPYUQEAV1D8AEbQBQAEEEUAFBHsJga6QAAGuUQACD4MwBY++ACUPvgBHQAAGMaQ9AAUEexSHJIAEAoRQSAUEOxiHJIAEAoQRSAUEeyaHJIAEAoRQSAUEOweF1H8AkQRRDAckgAIChBFIBf7QAAXUPwBl/tAAEaQ7AAUEexOHJIABAoRQSAUEOxGBrpEAAa5QAAIPgzAFj74AJQ++AEdAAAahpD0ABQR7JoGkgAAFxP8Dh2TAAQXU/wCBNNMEB2TAAFXUkgAFBTschyTAAgKFEkwHQAAARcSSAAUFOxyHJMACAoUSTAUE+x6HJIACAoTUSAdAAAA1BPsehyUAAgKE0lAFBLsghyUAAgKEk1AFBPsihyUAAgKE0lAFBLsDhyUAAgKEkFAFBDsFhyUAAgKEE1AEBJFAAaQIAAX+0AVV1DsFUTQQBAdkAACVBDsChf7AAFUEUAD1xL8DheRSAAUEuySHJEABAoSQRAdAAAClBDsBBf7BACUEewIF/sAARQSQAIckwACChJFMBQS7JIckQAEChJBEBQQ7JYckQAEChBJEBdQ7BLE0EAAFxH8Dh2QAABGkQAACREAACVAAAflggAABrsUACRAACAGkOgABpHkAAaS+AAXE/wOHZMABBdT/AAE00wQHZMAAVdQQAAckwAQCjtBMAaQ7AAdAAABFxBAAByTABAKO0EwBpDsABQU7BAckwAQChRBMB0AAADUFOwQHJMAEAoUQTAckAAQChFRAAa9RAAkgAAgBr5IACYCAAAlwAAH0r4AACVAAA/lggAABrsUACRAAFoGkOgABpXkAAaU+AAUEewEHJIABAoRQSAUEuwMHJMABAoSRTAXUewBlBLsCByTAAQKEkEwFBDsEByTAAQKEEkwF/tEABf7AABUEOwUHJEABAoQ7RAUEew4HJIABAoRQSAUEOw4F1HsApdS7ALG0gUgBBFFIBf7RAfXUfwCF/tECBdR7AdXUuwIBBFFIBf7RAeXEfwOHZEACJdR7AgE0UQQHZEAA5dR7AfXUUQAFBLsUhyTAAgKEkUwFBHsPBQQQAIckgACChBFIBQQ7FIUEuwYHJEACAoSQRAdAAADV1HsB9cRRAAUEuxKHJMACAoSRTAUEew8FBBAAhySAAIKEEUgFBDsShQS7BgckQAIChJBEBQR7CAckAAIChFJAB0AAAMXUewH1BLsQhyTAAgKEkUwFBHsPBQQQAIckgACChBFIBQQ7EIUEewgHJIACAoRQSAUEOwoHJIACAoQRSAUEewwHJIACAoRQSAckAAIChVFAAa9VAAkgABaBr5QACYCAAAlwAAP0r4AAAAAAAAAAAAQAAAAAAAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAEAAAAAAAAAAAAAAAAAACAAAAAAAAADlA=='),
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
