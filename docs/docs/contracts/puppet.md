---
sidebar_position: 4
---

# puppet
The puppet contract is a NEP-11 compliant NFT contract which uses the [collection](./collection.md), [dice](./dice.md), and [generator](./generator.md) contracts
to procedurally generate utility NFTs entirely on-chain.

### Where Am I:
* **PrivateNet:** [Current Location](https://github.com/CityOfZion/props/blob/develop/sdk/src/Puppet.ts#L50)
* **Testnet:** [`0x97857c01d64f846b5fe2eca2d09d2d73928b3f43`](https://dora.coz.io/contract/neo3/testnet_rc4/0x97857c01d64f846b5fe2eca2d09d2d73928b3f43)
* **Mainnet:** [`0x76a8f8a7a901b29a33013b469949f4b08db15756`](https://dora.coz.io/contract/neo3/mainnet/0x76a8f8a7a901b29a33013b469949f4b08db15756)

### Using the puppet contract:
To use the puppet contract, begin by adding the interface to your smart contract.  Below, we provide an example.  Make sure to also include the methods you would like to use. For `SCRIPT_HASH`, refer to the [Where am I?](#where-am-i) section.

```python
from boa3.builtin import contract

@contract({{SCRIPT_HASH}})
class Puppet:

    @staticmethod
    def get_puppet_json(token_id: bytes) -> Dict[str, Any]:
        pass

```





