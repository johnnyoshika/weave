export class LocalStorageBackedLRU<T extends {} = {}> {
    public set(key: string, value: T): boolean {
        this.del(key);
        const valStr = JSON.stringify(value);
        let setDone = false;
        let hasError = false;
        while (!setDone && !hasError) {
            try {
                localStorage.setItem(key, valStr);
                setDone = true;
            } catch (e) {
                if (isQuotaExceededError(e)) {
                    // Try to free up some space
                    if (localStorage.length > 0) {
                        this.removeLeastRecentlyUsed();
                    } else {
                        console.error('Unable to save to localStorage. Memory limit exceeded, even after freeing up space.');
                        hasError = true;
                    }
                } else {
                    console.error('Unexpected error saving to localStorage', e);
                    hasError = true;
                }
            }
        }

        return setDone;

    }
    
    private removeLeastRecentlyUsed(): void {
        const key = localStorage.key(0)
        if (key) {
            console.log("Evicting key", key)
            this.del(key)
        }
    }


    public get(key: string): T | null {
        const valStr = localStorage.getItem(key);
        if (!valStr) return null;
        const value = JSON.parse(valStr);
        this.del(key);
        this.set(key, value);
        return value;
    }

    public del(key: string): void {
        const itemStr = localStorage.getItem(key);
        if (itemStr) {
            localStorage.removeItem(key);
        }
    }

    public has(key: string): boolean {
        return localStorage.getItem(key) !== null;
    }

    public reset(): void {
        localStorage.clear();
    }
    
}

function isQuotaExceededError(e: any): boolean {
    let quotaExceeded = false;
    if (e) {
        if (e.code) {
            switch (e.code) {
                case 22:
                    quotaExceeded = true;
                    break; // Chrome
                case 1014:
                    // Firefox
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e.number === -2147024882) {
            // Internet Explorer 8
            quotaExceeded = true;
        }
    }
    return quotaExceeded;
}
