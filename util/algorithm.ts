function map<T extends Map<string, string>>(mapped: T, callback: (origin: string) => string): T {
    for (const [key, value] of mapped) {
        mapped.set(key, callback(value))
    }
    return mapped
}

