---
sidebar_position: 2
---

# collection
The collection contract is designed to store and provision immutable arrays of things.  These can be particularly useful due to storage costs or
the need to quickly sample from a range of data (like a discrete probability distribution).

### Where Am I:
* **PrivateNet:** [Current Location](https://github.com/CityOfZion/props/blob/develop/sdk/src/Collection.ts#L50)
* **Testnet:** [`0x429ba9252c761b6119ab9442d9fbe2e60f3c6f3e`](https://dora.coz.io/contract/neo3/testnet_rc4/0x429ba9252c761b6119ab9442d9fbe2e60f3c6f3e)
* **Mainnet:** ['0xf05651bc505fd5c7d36593f6e8409932342f9085'](https://dora.coz.io/contract/neo3/mainnet/0xf05651bc505fd5c7d36593f6e8409932342f9085)

### Using the collection contract:
To use the collection contract, begin by adding the interface to your smart contract.  Below, we provide an example.  Make sure to also include the methods you would like to use. For `SCRIPT_HASH`, refer to the [Where am I?](#where-am-i) section.

```python
from boa3.builtin import contract

@contract({{SCRIPT_HASH}})
class Collection:

  @staticmethod
  def get_collection_element(collection:id: bytes, index: int) -> bytes:
      pass

  @staticmethod
  def sample_from_collection(collection_id: int) -> bytes:
      pass
```

### Creating a new collection:
To create a new collection, you can either use the contract interface on-chain or side-load via the [SDK](/docs/sdk/ts/classes/Collection#createcollection).




