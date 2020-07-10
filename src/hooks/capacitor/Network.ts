import { Plugins, NetworkStatus } from '@capacitor/core';
import { useState, useEffect, useCallback } from 'react';
const { Network, Toast } = Plugins;
export const useNetworkHook = () => {
    const [status, updateStatus] = useState<NetworkStatus>()
    const checkNetworkStatus = useCallback(() => {
        Network.getStatus()
            .then(data => {
                updateStatus(data)
            })
            .catch(e => {
                console.log(e)
            })
    }, [])
    useEffect(() => {
        checkNetworkStatus()
        const handler = Network.addListener('networkStatusChange', (status) => {
            checkNetworkStatus()
        });
        return () => handler.remove();
    }, [checkNetworkStatus])
    const connected = status ? status.connected: undefined
    useEffect(() => {
        if (connected === undefined) return
        const message = connected ? 'Online' : 'Offline'
        Toast.show({
            text: `Network is ${message}`
        })
    }, [connected])
    return {
        status
    }
}