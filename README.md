# ID Generator Pro 🚀

A powerful, lightweight, and cryptographically secure ID generator for both Node.js and the Browser.

## Features

- 🔐 **Secure**: Uses `crypto.getRandomValues` in the browser and `crypto.randomBytes` in Node.js.
- 📦 **Lightweight**: Zero dependencies, tiny footprint.
- 🛠 **Flexible**: Support for numeric, alpha, alphanumeric, and custom charsets.
- 🎨 **Customizable**: Add prefixes, suffixes, and custom lengths.
- TypeScript ready with full type support.

## Installation

```bash
npm install id-generator-pro
```

## Usage

### Basic Usage

```javascript
import { generateId } from 'id-generator-pro';

const id = generateId(); // e.g., 'aB3dE5fG7hI9jK1l' (default 16 chars)
const shortId = generateId(8); // e.g., 'xY1zA2bC'
```

### Advanced Usage

```javascript
const id = generateId({
  length: 12,
  type: 'numeric', // 'numeric' | 'alpha' | 'alphanumeric'
  prefix: 'user_',
  suffix: '_tmp'
});
// Result: 'user_123456789012_tmp'
```

### Presets

```javascript
import { userId, contentId, numericId, urlId } from 'id-generator-pro';

userId();    // 'user_...' (12 chars alphanumeric)
contentId(); // 'cnt_...' (16 chars alphanumeric)
numericId(); // '82930412' (8 chars numeric)
urlId();     // 'aB3dE5fG' (8 chars alphanumeric)
```

### Custom Charset

```javascript
const id = generateId({
  length: 5,
  charset: 'ABCDE'
});
// Result: 'BABCC'
```

## License

MIT
