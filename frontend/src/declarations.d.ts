declare module 'react' {
    namespace React {
        export interface FormEvent<T = any> {
            preventDefault(): void;
            target: T;
        }
        export type ReactNode = any;
        export type ChangeEvent<T = any> = any;
        export type MouseEvent<T = any> = any;
        export type KeyboardEvent<T = any> = any;
        export type FC<T = {}> = any;
        export type CSSProperties = any;
    }
    export function useState<T>(initialState: T | (() => T)): [T, (newState: T | ((prevState: T) => T)) => void];
    export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    export function useContext<T>(context: any): T;
    export function useMemo<T>(factory: () => T, deps?: any[]): T;
    export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: any[]): T;
    export function useRef<T>(initialValue: T): { current: T };
    export function useReducer<R extends (state: any, action: any) => any>(reducer: R, initialState: any, initializer?: (arg: any) => any): [any, any];
    export function useLayoutEffect(effect: () => void | (() => void), deps?: any[]): void;
    export function useDebugValue<T>(value: T, format?: (value: T) => any): void;
    export function createElement(type: any, props?: any, ...children: any[]): any;
    export const Fragment: any;
    export const StrictMode: any;
    export type FormEvent<T = any> = React.FormEvent<T>;
    export type ReactNode = React.ReactNode;
    const React: any;
    export default React;
}
declare module 'react-dom';
declare module 'react-dom/client' {
    export const createRoot: any;
}
declare module 'react/jsx-runtime';
declare module 'lucide-react';
declare module 'framer-motion';
declare module 'react-router-dom' {
    export function useNavigate(): any;
    export function useSearchParams(): [any, any];
    export function useParams<T = any>(): T;
    export const Link: any;
    export const BrowserRouter: any;
    export const Routes: any;
    export const Route: any;
}
declare module 'axios' {
    const axios: any;
    export default axios;
    export type AxiosResponse<T = any> = {
        data: T;
        status: number;
        statusText: string;
        headers: any;
        config: any;
    };
}
declare module 'leaflet' {
    const L: any;
    export default L;
}
declare module 'react-leaflet' {
    export const MapContainer: any;
    export const TileLayer: any;
    export const Marker: any;
    export const Popup: any;
    export const useMap: any;
}
