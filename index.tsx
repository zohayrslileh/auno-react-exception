import { Dispatch, Fragment, SetStateAction, createContext, useContext, useEffect, useState } from "react"

/**
 * Exception context
 * 
 */
const ExceptionContext = createContext<[Reference<unknown>[], Dispatch<SetStateAction<Reference<unknown>[]>>] | undefined>(undefined)

/**
 * Provider component
 * 
 * @returns
 */
export function Provider({ children }: ProviderProps) {

    /**
     * Exceptions
     * 
     */
    const [exceptions, setExceptions] = useState<Reference<unknown>[]>([])

    /**
     * Exception context provider
     * 
     */
    return <ExceptionContext.Provider value={[exceptions, setExceptions]}>

        {/** Children */}
        {children}

    </ExceptionContext.Provider>
}

/**
 * Customer component
 * 
 * @returns
 */
export function Customer({ onCatch }: CustomerProps) {

    /**
     * Exception context
     * 
     */
    const exceptionContext = useContext(ExceptionContext)

    // Check context provided
    if (!exceptionContext) throw new Error("Exception context has not provided")

    // Define exceptions & setExceptions
    const [exceptions, _setExceptions] = exceptionContext

    /**
     * Fragment
     * 
     */
    return <Fragment>

        {/** Exceptions */}
        {exceptions.length ? onCatch(exceptions.map(exception => exception.current)) : undefined}

    </Fragment>
}

/**
 * Throw component
 * 
 * @returns
 */
export function Throw({ exception }: ThrowProps) {

    /**
     * Exception context
     * 
     */
    const exceptionContext = useContext(ExceptionContext)

    // Check context provided
    if (!exceptionContext) throw new Error("Exception context has not provided")

    /**
     * When a change in dependencies is detected
     * 
     */
    useEffect(function () {

        // Define exceptions & setExceptions
        const [_exceptions, setExceptions] = exceptionContext

        // Create reference
        const reference: Reference<unknown> = { current: exception }

        // Append to exceptions
        setExceptions(exceptions => [...exceptions, reference])

        /**
         * When a change in dependencies
         * 
         */
        return function () {

            // Remove from exceptions
            setExceptions(exceptions => exceptions.filter(exception => exception !== reference))
        }

    }, [exception])

    return <Fragment />
}

/**
 * Exception
 * 
 */
export default { Provider, Customer, Throw }

/**
 * Provider Props
 * 
 */
interface ProviderProps {
    children: React.ReactNode
}

/**
 * Customer Props
 * 
 */
interface CustomerProps {
    onCatch: (exceptions: unknown[]) => React.ReactNode
}

/**
 * Throw Props
 * 
 */
interface ThrowProps {
    exception: unknown
}

/**
 * Reference
 * 
 */
interface Reference<Target> {
    current: Target
}