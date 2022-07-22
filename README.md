# Simple8js
Typescript implementation of the simple-8 algorithm for integer compression.  
Based on [this java implementation](https://github.com/burmanm/compression-int)

# Installation
Install the package using the npm install command:  
```$ npm install simple8js```
# Usage
The package has a simple compress/decompress usage
## Compress
```
  const data = [1n, 2n, 3n]
  const compressed: bigint[] = Simple8B.compress(data)
```

## Decompress
```
  const compressedData = [1n<<60n]
  const data: bigint[] = Simple8B.decompress(compressedData)
```

# License
MIT