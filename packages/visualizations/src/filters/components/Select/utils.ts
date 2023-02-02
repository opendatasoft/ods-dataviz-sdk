export default function defaultValue<T>(value: T | undefined, fallback: T): T {
    if (value === undefined) return fallback;
    return value;
}
