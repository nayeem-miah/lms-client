/**
 * Generates a unique device ID and stores it in localStorage
 * If a device ID already exists, it returns the existing one
 */
export const getDeviceId = (): string => {
    if (typeof window === 'undefined') {
        // Server-side rendering - return a temporary ID
        return 'server-' + Math.random().toString(36).substring(2, 15);
    }

    const DEVICE_ID_KEY = 'lms_device_id';

    // Check if device ID already exists
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);

    if (!deviceId) {
        // Generate a new device ID
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 15);
        const browserInfo = navigator.userAgent.substring(0, 10).replace(/[^a-z0-9]/gi, '');

        deviceId = `web-${browserInfo}-${timestamp}-${randomStr}`;

        // Store it in localStorage
        localStorage.setItem(DEVICE_ID_KEY, deviceId);
    }

    return deviceId;
};

/**
 * Clears the stored device ID (useful for logout or testing)
 */
export const clearDeviceId = (): void => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('lms_device_id');
    }
};
