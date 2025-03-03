# @auno/react-exception
A lightweight React component for centralized exception handling and display.

## Features

- 🌍 Global error handling through React Context
- 🔒 Type-safe error management
- 🧩 Component-based error throwing and catching
- ✨ Clean and declarative error handling
- 🚀 Zero dependencies
- ⚡ Lightweight and performant
- 🔄 Real-time error updates

## Installation

```bash
# npm
npm install @auno/react-exception
```

```bash
# yarn
yarn add @auno/react-exception
```

```bash
# pnpm
pnpm add @auno/react-exception
```

```bash
# bun
bun add @auno/react-exception
```

## Usage

### Basic Setup
```tsx
import Exception from "@auno/react-exception"

export default function App() {

    return <Exception.Provider>

        {/* Error display component */}
        <Exception.Customer onCatch={([exception]) => <b>{String(exception)}</b>} />

        {/* Your app components */}
        <Dashboard />

    </Exception.Provider>
}
```

### Throwing Errors
```tsx
import { Throw } from "@auno/react-exception"
import { useState, useEffect } from "react"

export default function Dashboard() {

    const [error, setError] = useState()

    useEffect(function() {

        // Simulate an error
        setTimeout(() => setError(new Error("Something went wrong")), 5000)
        
    }, [])

    // Throw the error to be caught by Exception.Customer
    if (error) return <Throw exception={error} />

    return <h1>Dashboard</h1>
}
```

## Components

### Provider
Wraps your application and manages the error state:
```tsx
<Exception.Provider>
    {/* Your app components */}
</Exception.Provider>
```

### Customer
Catches and displays errors:
```tsx
<div className="error-display">
    <Exception.Customer onCatch={exceptions => exceptions.map(error => <b>{String(error)}</b>)} />
</div>
```

### Throw
Throws errors into the context:
```tsx
<Throw exception={new Error("Custom error message")} />
```

## TypeScript Support
Fully written in TypeScript with complete type definitions.

## License
MIT

## Author
zohayrslileh - [GitHub](https://github.com/zohayrslileh/auno-react-exception)