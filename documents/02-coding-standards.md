# Coding Standards and Patterns

## Table of Contents
- [General Guidelines](#general-guidelines)
- [File Structure](#file-structure)
- [Naming Conventions](#naming-conventions)
- [TypeScript Guidelines](#typescript-guidelines)
- [React Patterns](#react-patterns)
- [State Management](#state-management)
- [Testing Standards](#testing-standards)
- [Documentation Standards](#documentation-standards)

## General Guidelines

### Code Formatting
- Use Prettier for automatic code formatting
- Use ESLint for code quality
- Maximum line length: 100 characters
- Indentation: 2 spaces
- Use semicolons at the end of statements
- Use single quotes for strings

```typescript
// ✅ Good
const userName = 'John Doe';
const userAge = 25;

// ❌ Bad
const userName = "John Doe"
const userAge=25
```

### File Organization
```typescript
// 1. Imports
import React from 'react';
import { useRouter } from 'next/router';

// 2. Types/Interfaces
interface Props {
  title: string;
}

// 3. Constants
const MAX_ITEMS = 10;

// 4. Component/Function
export function Component({ title }: Props) {
  // Implementation
}
```

## File Structure

### Component File Structure
```typescript
/components
  /atoms
    /Button
      Button.tsx
      Button.test.tsx
      Button.styles.ts
      index.ts
  /molecules
    /SearchBar
      SearchBar.tsx
      SearchBar.test.tsx
      SearchBar.styles.ts
      index.ts
  /organisms
    /Header
      Header.tsx
      Header.test.tsx
      Header.styles.ts
      index.ts
```

### Feature Module Structure
```typescript
/features
  /project-management
    /components
    /hooks
    /services
    /types
    /utils
    index.ts
```

## Naming Conventions

### Files and Directories
```
components/Button.tsx           // Component files: PascalCase
hooks/useAuth.ts               // Hook files: camelCase with 'use' prefix
utils/formatDate.ts            // Utility files: camelCase
types/Project.types.ts         // Type files: PascalCase with .types suffix
constants/api.constants.ts     // Constants files: camelCase with .constants suffix
```

### Component Naming
```typescript
// ✅ Good
export function UserProfile() {}
export function ProjectList() {}

// ❌ Bad
export function userProfile() {}
export function project_list() {}
```

### Variable Naming
```typescript
// Constants
const MAX_RETRY_ATTEMPTS = 3;
const API_BASE_URL = 'https://api.example.com';

// Variables
const firstName = 'John';
const isLoading = true;
const handleSubmit = () => {};
```

## TypeScript Guidelines

### Type Definitions
```typescript
// Use interfaces for objects
interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Use type for unions and intersections
type UserRole = 'admin' | 'user' | 'guest';
type UserWithPermissions = User & { permissions: string[] };

// Use enums for fixed sets of values
enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}
```

### Generic Types
```typescript
// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{renderItem(item)}</li>
      ))}
    </ul>
  );
}
```

## React Patterns

### Component Patterns

#### 1. Compound Components
```typescript
const Form = {
  Root: ({ children }: PropsWithChildren) => {},
  Field: ({ name, label }: FieldProps) => {},
  Submit: ({ text }: SubmitProps) => {},
};

// Usage
<Form.Root>
  <Form.Field name="email" label="Email" />
  <Form.Submit text="Submit" />
</Form.Root>
```

#### 2. Render Props
```typescript
interface DataFetcherProps<T> {
  url: string;
  children: (data: T) => React.ReactNode;
}

function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  // Implementation
  return children(data);
}
```

#### 3. Higher-Order Components
```typescript
function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <LoginPage />;
    return <WrappedComponent {...props} />;
  };
}
```

### Hook Patterns

#### 1. Custom Hooks
```typescript
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

#### 2. Data Fetching Hooks
```typescript
function useQuery<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Implementation

  return { data, error, isLoading };
}
```

## State Management

### Local State
```typescript
function Component() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prev => prev + 1);
  
  return <button onClick={increment}>{count}</button>;
}
```

### Context State
```typescript
// Context definition
interface AppState {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

// Provider
function AppProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  return (
    <AppContext.Provider value={{ theme, setTheme }}>
      {children}
    </AppContext.Provider>
  );
}
```

## Testing Standards

### Component Testing
```typescript
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Hook Testing
```typescript
describe('useAuth', () => {
  it('provides authentication state', () => {
    const { result } = renderHook(() => useAuth());
    expect(result.current.isAuthenticated).toBeDefined();
  });
});
```

## Documentation Standards

### Component Documentation
```typescript
interface ButtonProps {
  /** The variant style of the button */
  variant: 'primary' | 'secondary';
  /** The size of the button */
  size: 'sm' | 'md' | 'lg';
  /** Click handler */
  onClick?: () => void;
  /** Button contents */
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="md">
 *   Click me
 * </Button>
 * ```
 */
export function Button({ variant, size, onClick, children }: ButtonProps) {
  // Implementation
}
```

### Function Documentation
```typescript
/**
 * Formats a date string into a localized format
 * 
 * @param date - The date to format
 * @param locale - The locale to use for formatting
 * @returns Formatted date string
 * 
 * @example
 * ```ts
 * formatDate('2024-03-21', 'en-US')
 * // Returns: "March 21, 2024"
 * ```
 */
function formatDate(date: string, locale: string): string {
  // Implementation
}
``` 