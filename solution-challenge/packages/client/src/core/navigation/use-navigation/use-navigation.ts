import { Location } from 'history';
import { parse, stringify } from 'query-string';
import { useNavigate, useLocation, useParams, NavigateFunction } from 'react-router';

type ParsedQuery = {
    [key: string]: string | string[] | null;
}

export type NavigationOptions = {
    replace?: boolean;
    preserveQuery?: boolean;
}

const getDefaultOptions = (): NavigationOptions => ({
    replace: false,
    preserveQuery: false,
});

interface NavigateParams { 
    path?: string,
    query: Record<string, number | string | string[] | boolean | undefined | null>;
    options?: NavigationOptions;
}

export type SCLocationState = | { 
    previousPath: string;
    previousLocation: Location;
} | undefined;

type SCLocation = Location & { state: SCLocationState; };

const navigate = (navigator: NavigateFunction, location: SCLocation) => ({
    path: newPath,
    query = {},
    options = getDefaultOptions(),
}: NavigateParams): void => {
    const { pathname, search } = location;

    const navigationPathname = newPath || pathname;
    const navigationQuery = options.preserveQuery ? {
        ...parse(search),
        ...query
    } : query;

    const navigationSearch = stringify(navigationQuery);

    navigator(`${navigationPathname}${navigationSearch}`, {
        replace: options.replace,
        state: {
            previousPath: pathname || '',
            previousLocation: location,
        }
    });
}
type ParamsType = { [key: string]: string };

export declare type UseNavigationHook = {
    location: SCLocation & {
        params: ParamsType;
        query: ParsedQuery;
    };
    navigate: ({ path, query, options}: NavigateParams) => void;
}

export const useNavigation = (): UseNavigationHook => {
    const history = useNavigate();
    const location = useLocation();
    const params = useParams() as ParamsType;
  
    return {
      location: {
        ...location,
        params,
        query: parse(location.search),
      },
      navigate: navigate(history, location)
    };
  };
  