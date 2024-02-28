import { MethodError, SortOrder, WhereDateFilterKey, WhereIntFilterKey, WhereSrtingFilterKey, anyFunction, sortOrder } from "@/type/intex"
import { checkStrBoolean } from "./other"
import { Prisma } from "@prisma/client"

interface MODEL_DATA {
    FULL_KEY: { [k:string]: any },
    INT_KEY: string[],
    STRING_KEY: string[],
    DATE_KEY: string[],
    RELATION_KEY: string[],
    ORDERBY_KEY: string[],
    RELATION_SELECT: { [k:string]: string },
    SEARCH_KEY: string[]
}

export type HandlerParams = (
    key: string,
    value: string,
    addParams: (key: string, value: any) => void,
) => any

export type HandlerParamsParams = Parameters<HandlerParams>

export type initFindParams = (
    key: string,
    value: string,
    addParams: (key: "include" | "where" | "orderBy" | "take" | "skip", value: any) => any,
    addError: (mes: MethodError) => any,
    checkForErrors: () => boolean,
    handleDefaultCase: (...arg: HandlerParamsParams) => any
    
) => any
// handlePropertyType: (...arg: any[]) => any
export default (query: { [k:string]: string }, MODEL_DATA: MODEL_DATA) => {

    type PRISMA_SEARCH_PARAMS = { params: { [k: string]:any } | null, error: null | Array<MethodError>, unique: null | boolean }
    const PRISMA_SEARCH_PARAMS: PRISMA_SEARCH_PARAMS = { params: null, error: null, unique: null }
    let searchParams = {}
    const methodError: MethodError[] = []
    const addError = (data: MethodError) => methodError.push(data)
    const checkForErrors = () => methodError.length > 0

    function addParams(key: keyof FindParams, value: any) {
        if (Object.keys(searchParams).includes(key)) {
            if (key === 'where') {
                searchParams.where.AND.push(value)
            } else {
                searchParams[key] = value
            }
        }
    }

    type handlerError = (value: string, errMes?: string) => void
    const handleInvalidParamsError: handlerError = (value,errMes) => { addError({ message: `invalid params '${value}', must be ${errMes}`, type: 'error' }) }
    const handleInvalidValueError:handlerError = (value,errMes) => { addError({ message: `invalid value '${value}', must be ${errMes}`, type: 'error' }) }
    const handleUnknownValuesError: handlerError = (value,errMes) => { addError({ message: `unknown value '${value}', available values '${errMes}`, type: 'error' }) }
    const handleUnknownPropertyError: handlerError = (value,errMes) => { addError({ message: `unknown property '${value}', available property '${errMes}`, type: 'error' }) }
    const handleUnknownOperatorError: handlerError = (value,errMes) => { addError({ message: `unknown operator '${value}'`, type: 'error' }) }
    const handleUnknownParamsError: handlerError = (value,errMes) => { addError({ message: `unknown params '${value}'`, type: 'error' }) }

    function handleInOperations(key: string, value: any[], addParams: anyFunction, errMes: string) {
        value.length ? addParams(key, value) : handleInvalidValueError(value.join(' '), errMes)
    
    }
    
    function handleModeOperation(key: string, value: any, addParams: anyFunction) {
        if (keyStringMode.includes(value as never)) {
            addParams(key, value);
        } else {
            handleInvalidParamsError(value, keyStringMode.join(','))
        }
    }
    
    function handleOptionValue(value: string, key: string, option: { [x: string]: any }, errMes: string) {
        if (isNumeric(value)) {
            option[key] = parseInt(value);
        } else {
            handleInvalidValueError(value, errMes) 
        }
    }
    
    function handleIncludeOptionItem(item: string[], option: { [x: string]: any }) {
        if (item.length !== 2) {
            handleInvalidParamsError(item.join(' '), "'s:45' or 's:23;t:12'");
            return;
        }
    
        const [key, value] = item;
    
        switch (key) {
            case 's':
                handleOptionValue(item[1], 'skip', option, "'45' or 45");
                break;
            case 't':
                handleOptionValue(item[1], 'take', option, "'45' or 45");
                break;
            default:
                handleUnknownParamsError(key);
        }
    }

    
    type getWhereParamsConsFn = (item: string[],addParams: (key: string, value: any) => any) => any
    function getWhereParamsForString(...arg: Parameters<getWhereParamsConsFn>) {
        const [item, addParams] = arg;
    
        if (item.length !== 2) {
            handleInvalidParamsError(item.join(' '), 'gte:cats');
            return;
        }
    
        const [key, value] = item;
        
        if (!WhereSrtingFilterKey.includes(key as never)) {
            handleUnknownOperatorError(key);
            return;
        }
    
        switch (key as WhereSrtingFilterKey) {
            case 'equals':
            case 'gt':
            case 'gte':
            case 'lt':
            case 'lte':
            case 'not':
            case 'startsWith':
            case 'endsWith':
            case 'contains':
                addParams(key, value);
                break;
            case 'in':
            case 'notIn':
                handleInOperations(key, value.split(','), addParams, 'dog,cat,mouse');
                break;
            case 'mode':
                handleModeOperation(key, value, addParams);
                break;
            default:
                handleUnknownParamsError(key);
                break;
        }
    }
    
    function getWhereParamsForInt(...arg: Parameters<getWhereParamsConsFn>) {
        const [item, addParams] = arg;
        
        if (item.length !== 2) {
            handleInvalidParamsError(item.join(' '), 'gte:45');
            return;
        }
    
        const [key, value] = item;
        
        
        if (!WhereIntFilterKey.includes(key as never)) {
            handleUnknownOperatorError(key);
            return;
        }
        
        
        switch (key as WhereIntFilterKey) {
            case 'equals':
            case 'gt':
            case 'gte':
            case 'lt':
            case 'lte':
            case 'not': {
                const _value = parseFloat(value)
                if (typeof _value === 'number') {
                    addParams(key, _value)
                }
                break;
            }
            case 'in':
            case 'notIn': 
                handleInOperations(
                    key,
                    value.split(',').map(_ => parseFloat(_)).filter(_ => typeof _ === 'number'),
                    addParams,'1,2,34.5');
                break;
            default:
                handleUnknownParamsError(key)
                break;
        }       
    }
    
    function getWhereParamsForDate(...arg: Parameters<getWhereParamsConsFn>) {
        const [item, addParams] = arg;
    
        if (item.length !== 2) {
            handleInvalidParamsError(item.join(' '), "'gte:Thu Aug 17 2023 00:33:24 GMT+0300' or 'gte:1692221629651'");
            return;
        }
    
        const [key, value] = item;
    
        if (!WhereDateFilterKey.includes(key as never)) {
            handleUnknownOperatorError(key);
            return;
        }
      
        switch (key) {
            case 'equals':
            case 'gt':
            case 'gte':
            case 'lt':
            case 'lte':
            case 'not': {
                const _value = new Date(isNumeric(value) ? parseInt(value) : value)
                if (isNaN(_value.getTime()))
                    return handleInvalidValueError(value, "'Thu Aug 17 2023 00:33:24 GMT+0300' or '1692221629651'")

                addParams(key, _value)
                break;
            }
            case 'in':
            case 'notIn':
                handleInOperations(
                    key,
                    value.split(',').map(_ => new Date(isNumeric(_) ? parseInt(_) : _)).filter(_ => !isNaN(_.getTime())),
                    addParams,"'Thu Aug 17 2023 00:33:24 GMT+0300' or '1692221629651'");
                break;
            default: 
                handleUnknownParamsError(key)
                break;
        }
      
    }

    
    function getWhereParamsCons(str: string, fn: getWhereParamsConsFn) {

        const findParams: { [x: string]: any } = {}
        const parseStr = str.split(';').map(_ => _.split(':'))
    
        const addParams = (key: string, value: any) => findParams[key] = value
    
        if (parseStr.length && parseStr[0].length > 1) {
            for (let i = 0, l = parseStr.length; i < l; i++) {
                const item = parseStr[i];
                fn(item, addParams)
            }
            return { data: findParams, error: methodError }
        } else { return { data: str, error: methodError } }
    }

    function parceIncludeOption(value: string,) {
        const option: { [x: string]: any } = {};
        const data = value.split('_').slice(1).map(_ => _.split(';').map(e => e.split(':')))[0];
        
        if (data) {
            data.forEach(item => {
                handleIncludeOptionItem(item, option);
            });
        }
        
        return { data: option };
    }
    
    
    type parceIncludeParams = <T extends { [k:string]: any }>(value: string, includeElemSelectParams: T) => any
    function parceIncludeParams(...arg: Parameters<parceIncludeParams>) {
        const [value, key] = arg
        const _value = value.split(',')
        const elemRelationKey = Object.keys(key) as (keyof typeof key)[]
        let includeParams = {}
    
        _value.forEach(str => {
            const keyElem = elemRelationKey.find(key => str.startsWith(key as string));
            if (!keyElem) return handleUnknownOperatorError(str)
    
            const otherOption = parceIncludeOption(str);
            if (checkForErrors()) return
    
            includeParams = { ...includeParams, [keyElem]: { ...key[keyElem], ...otherOption.data } };
        });
    
        return { data: includeParams }
    }
    
    type parceOrderByParams = (value: string, propArr: (string | number | Date)[]) => any
    function parceOrderByParams(...arg: Parameters<parceOrderByParams>) {
    
        const [value, propArr] = arg
        const orderByParams: { [k: string]: any } = {}
        const data = value.split(';').map(_ => _.split(':'))
    
        data.forEach(item => {
            if (item.length !== 2) return handleInvalidParamsError(item.join(' '), "'id:asc' or 'id:asc;name:desc'");
                
            const [key, value] = item;
    
            if (!propArr.includes(key)) return handleUnknownPropertyError(key, propArr.join(','))
            if (!sortOrder.includes(value as SortOrder)) return handleUnknownValuesError(value, sortOrder.join(','))
            
            orderByParams[key] = value
        });
    
        return { data: orderByParams }
    }

    type ParseOtherArgs = 'take' | 'skip'
    const parseOtherArgsArr: ParseOtherArgs[] = ['take','skip']

    type parseOtherArgs = (key: ParseOtherArgs, value: string) =>any
    function parseOtherArgs(...arg: Parameters<parseOtherArgs>) {
        const [key, value] = arg
        const otherParams: { [k: string]: any } = {}

        if (!parseOtherArgsArr.includes(key)) return handleUnknownPropertyError(key, parseOtherArgsArr.join(','))

        const resChe = checkStrBoolean(value)
        const _value = resChe && isNumeric(value) ? parseInt(value as string) : undefined
        otherParams[key] = _value
    
        return { data: otherParams }
    }


    type parseSearchParams<T extends string, K extends string> = { OR: { [P in T]: { [L in K ]: string } }[] }
    function parseSearchParams<T extends string>(value:string, propNameForSearch: T[]): parseSearchParams<T, keyof Required<Pick<Prisma.StringFilter, 'contains'|'mode'>>>  {
        const _value = propNameForSearch.map(_ => ({ [_]: { contains: value,  mode: 'insensitive', }}))
        return { OR: _value as never }
    }


   
    function handleIntProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = getWhereParamsCons(value, getWhereParamsForInt);
    
        if (checkForErrors()) return
    
        addParams('where', { [key]: res.data === value ? Number(res.data) : res.data });
    }
    
    function handleStringProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = getWhereParamsCons(value, getWhereParamsForString);
    
        if (checkForErrors()) return
    
        addParams('where', { [key]: res.data });
    }
    
    function handleDateProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = getWhereParamsCons(value, getWhereParamsForDate);
    
        if (checkForErrors()) return
    
        addParams('where', { [key]: res.data === value ? new Date(parseInt(res.data)) : res.data });
    }

    function handleSearchProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = parseSearchParams(value, MODEL_DATA.SEARCH_KEY)
        if (res.OR.length) {
            addParams('where', res)
        }
    }

    function handleOrderByProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = parceOrderByParams(value, MODEL_DATA.ORDERBY_KEY)
        if (checkForErrors()) return

        addParams('orderBy', res.data)
    }

    function handleSizeProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg

        const otherKey: { [k: string]: ParseOtherArgs } = {
            'page': 'skip',
            'limit': 'take'
        }
        const res = parseOtherArgs(otherKey[key], value)
        if (checkForErrors()) return

        addParams(otherKey[key], res.data[otherKey[key]])
    }

    function handleIncludeProperty(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        const res = parceIncludeParams(value, MODEL_DATA.RELATION_SELECT)
        if (checkForErrors()) return

        addParams('include', res.data)
    }

    function handleDefaultCase<T extends string>(...arg: HandlerParamsParams) {
        const [key, value, addParams] = arg
        switch (true) {
            case MODEL_DATA.INT_KEY.includes(key as T):
                handleIntProperty(key, value, addParams);
                break;
            case MODEL_DATA.STRING_KEY.includes(key as T):
                handleStringProperty(key, value, addParams);
                break;
            case MODEL_DATA.DATE_KEY.includes(key as T):
                handleDateProperty(key, value, addParams);
                break;
            case key === 'search':
                handleSearchProperty(key, value, addParams);
                break;
            case key === 'orderBy':
                handleOrderByProperty(key, value, addParams);
                break;
            case key === 'limit':
            case key === 'page':
                handleSizeProperty(key, value, addParams);
                break;
            case key === 'include':
                handleIncludeProperty(key, value, addParams);
                break;
            default:
                handleUnknownOperatorError(key)
                // handleUnknownProperty(key, value, addParams);
                break;
        }
    }


    function handleUniqueCase() {
        searchParams = {
            where: { id: 0 },
            select: undefined
        }
        for (const key in query) {
            if (Object.prototype.hasOwnProperty.call(query, key)) {
                const value = query[key];
                switch (key) {
                    case 'id':{
                        if (!isNumeric(value)) return handleInvalidValueError(value, '45')
    
                        searchParams.where.id = parseInt(value as string) as never
                        break;
                    }
                    case 'fullinfo': 
                        searchParams.select = MODEL_DATA.FULL_KEY as never
                        break;
                }
            }
        }
    }


    function returnParseData() {
        PRISMA_SEARCH_PARAMS.error = JSON.parse(JSON.stringify(methodError))
        PRISMA_SEARCH_PARAMS.params = JSON.parse(JSON.stringify(searchParams))
        return PRISMA_SEARCH_PARAMS 
    }

    
    
    interface FindParams {
        where: { [key: string]: any },
        select?: { [key: string]: any },
        take?: number,
        skip?: number,
        orderBy?: { [key: string]: 'asc' | 'desc' },
        include?: { [key: string]: boolean }
    }

    function handleQueryParams(handleParseFullParams: initFindParams) {
        if ('unique' in query) {
            handleUniqueCase()
            PRISMA_SEARCH_PARAMS.unique = true
        } else {
            PRISMA_SEARCH_PARAMS.unique = false
            searchParams = {
                where: { 'AND': [] },
                take: 12,
                skip: 0,
                orderBy: {},
                include: Object.fromEntries(MODEL_DATA.RELATION_KEY.map(_ => [_, false])) 
                    
            }
           
            for (const key in query) {
                if (Object.prototype.hasOwnProperty.call(query, key)) {
                    const value = query[key];
                    handleParseFullParams(key, value, addParams, addError, checkForErrors, handleDefaultCase)
                }
            }
        }
        
        return returnParseData()
    }
    
    return { handleQueryParams }
}