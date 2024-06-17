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
      "offset": 392
    }
  ]
},
    bytecode: base64ToUint8Array('GvAwAHQAAAIAAAAAAAABiF3/wAEQ//8AGuxQAJEAATBhQAQBUEewcBrpAAAa5RAAIPgzAFj74AJQ++AEdAAAKRpD0ABQR7DwckgAQChFBIBQQ7BQXUfwBhBFEMBySAAgKEEUgF/tAABdQ/AEX+0AARpDsABQR7DQckgAEChFBIBQQ7CwGukQABrlAAAg+DMAWPvgAlD74AR0AAAfGkPQAFBHsPAaSAAAUE+wEHJQACAoTQUAUEOwMHJQACAoQSUAQE0UABpAgAATQQBAdkAAAlBDsOB0AAABUEOw4FxD8CgkQAAAlQAAD5YIAAAa7FAAGkOgABpHkAAaS+AAckwAQChFBMAa9RAAGvkgAJgIAACXAAAPSvgAAJUAAD+WCAAAGuxQAJEAAEAaQ6AAGkeQABpL4AByTAAQKO0EwBpPsABdTTAAUFOwEHJUABAoUQVAG0AQABBBNABQT7AgclAAIChNBQBQQ7AgckwAIChFBMAa9RAAkgAAQBr5IACYCAAAlwAAP0r4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAABMA=='),
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
