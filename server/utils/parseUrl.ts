import { Prisma } from "@prisma/client";
import { isBoolean, isNumeric, isString } from "@/server/utils/other";
import { INIT_MODEL_PROPERTY,
    MethodError,
    SortOrder,
    WhereIntFilterKey,
    WhereSrtingFilterKey,
    anyFunction,
    keyStringMode,
    sortOrder
} from "@/type/intex";

// // В этом файле находяться функции для парсинга URL строки, в обьект для запроса к базе данных через Prisma
// // так же если есть неизвестные параметры или свойства, в ответе будет ощибка, с описанием ошибки и примера правильного запроса








// type handlerError = (value: string, addError: (mes: MethodError) => void, errMes?: string) => void
// const handleInvalidParamsError: handlerError = () => { addError({ message: `invalid params '${value}', must be ${errMes}`, type: 'error' }) }
// const handleInvalidValueError:handlerError = () => { addError({ message: `invalid value '${value}', must be ${errMes}`, type: 'error' }) }
// const handleUnknownValuesError: handlerError = () => { addError({ message: `unknown value '${value}', available values '${errMes}`, type: 'error' }) }
// const handleUnknownPropertyError: handlerError = () => { addError({ message: `unknown property '${value}', available property '${errMes}`, type: 'error' }) }
// const handleUnknownOperatorError: handlerError = () => { addError({ message: `unknown operator '${value}'`, type: 'error' }) }
// const handleUnknownParamsError: handlerError = () => { addError({ message: `unknown params '${value}'`, type: 'error' }) }


// function handleInOperations(key: string, value: any[], addParams: anyFunction, addError: anyFunction, errMes: string) {
//     value.length ? addParams(key, value) : handleInvalidValueError(value.join(' '), addError, errMes)

// }

// function handleModeOperation(key: string, value: any, addParams: anyFunction, addError: anyFunction) {
//     if (keyStringMode.includes(value as never)) {
//         addParams(key, value);
//     } else {
//         handleInvalidParamsError(value, addError, keyStringMode.join(','))
//     }
// }

// function handleOptionValue(value: string, key: string, option: { [x: string]: any }, addError: anyFunction, errMes: string) {
//     if (isNumeric(value)) {
//         option[key] = parseInt(value);
//     } else {
//         handleInvalidValueError(value, addError, errMes) 
//     }
// }

// function handleIncludeOptionItem(item: string[], option: { [x: string]: any }, addError: anyFunction) {
//     if (item.length !== 2) {
//         handleInvalidParamsError(item.join(' '), addError, "'s:45' or 's:23;t:12'");
//         return;
//     }

//     const [key, value] = item;

//     switch (key) {
//         case 's':
//             handleOptionValue(item[1], 'skip', option, addError, "'45' or 45");
//             break;
//         case 't':
//             handleOptionValue(item[1], 'take', option, addError, "'45' or 45");
//             break;
//         default:
//             handleUnknownParamsError(key, addError);
//     }
// }

// type getWhereParamsConsFn = (item: string[],
//     addParams: (key: string, value: any) => any,
//     addError: (mes: { message: string, type: 'error' }) => any,
//     checkForErrors: () => boolean
// ) => any
// export function getWhereParamsCons(str: string, fn: getWhereParamsConsFn) {
//     const methodError: MethodError[] = []
//     const findParams: { [x: string]: any } = {}
//     const parseStr = str.split(';').map(_ => _.split(':'))

//     const addParams = (key: string, value: any) => findParams[key] = value
//     const addError = (mes: MethodError) => methodError.push(mes)
//     const checkForErrors = () => methodError.length > 0;

//     if (parseStr.length && parseStr[0].length > 1) {
//         for (let i = 0, l = parseStr.length; i < l; i++) {
//             const item = parseStr[i];
//             fn(item, addParams, addError, checkForErrors)
//         }
//         return { data: findParams, error: methodError }
//     } else { return { data: str, error: methodError } }
// }


// export function getWhereParamsForString(...arg: Parameters<getWhereParamsConsFn>) {
//     const [item, addParams, addError] = arg;

//     if (item.length !== 2) {
//         handleInvalidParamsError(item.join(' '), addError, 'gte:cats');
//         return;
//     }

//     const [key, value] = item;
    
//     if (!WhereSrtingFilterKey.includes(key as never)) {
//         handleUnknownOperatorError(key, addError);
//         return;
//     }

//     switch (key as WhereSrtingFilterKey) {
//         case 'equals':
//         case 'gt':
//         case 'gte':
//         case 'lt':
//         case 'lte':
//         case 'not':
//         case 'startsWith':
//         case 'endsWith':
//         case 'contains':
//             addParams(key, value);
//             break;
//         case 'in':
//         case 'notIn':
//             handleInOperations(key, value.split(','), addParams, addError, 'dog,cat,mouse');
//             break;
//         case 'mode':
//             handleModeOperation(key, value, addParams, addError);
//             break;
//         default:
//             handleUnknownParamsError(key, addError);
//             break;
//     }
// }

// export function getWhereParamsForInt(...arg: Parameters<getWhereParamsConsFn>) {
//     const [item, addParams, addError] = arg;

//     if (item.length !== 2) {
//         handleInvalidParamsError(item.join(' '), addError, 'gte:45');
//         return;
//     }

//     const [key, value] = item;

//     if (!WhereIntFilterKey.includes(key as never)) {
//         handleUnknownOperatorError(key, addError);
//         return;
//     }


//     switch (key as WhereIntFilterKey) {
//         case 'equals':
//         case 'gt':
//         case 'gte':
//         case 'lt':
//         case 'lte':
//         case 'not': {
//             const _value = parseFloat(value)
//             if (typeof _value === 'number') {
//                 addParams(key, _value)
//             }
//             break;
//         }
//         case 'in':
//         case 'notIn': 
//             handleInOperations(
//                 key,
//                 value.split(',').map(_ => parseFloat(_)).filter(_ => typeof _ === 'number'),
//                 addParams,
//                 addError,
//                 '1,2,34.5');
//         default:
//             handleUnknownParamsError(key, addError)
//             break;
//     }       
// }

// export function getWhereParamsForDate(...arg: Parameters<getWhereParamsConsFn>) {
//     const [item, addParams, addError] = arg;

//     if (item.length !== 2) {
//         handleInvalidParamsError(item.join(' '), addError, "'gte:Thu Aug 17 2023 00:33:24 GMT+0300' or 'gte:1692221629651'");
//         return;
//     }

//     const [key, value] = item;

//     if (!WhereSrtingFilterKey.includes(key as never)) {
//         handleUnknownOperatorError(key, addError);
//         return;
//     }
  
//     switch (key) {
//         case 'equals':
//         case 'gt':
//         case 'gte':
//         case 'lt':
//         case 'lte':
//         case 'not': {
//             const _value = new Date(isNumeric(value) ? parseInt(value) : value)
//             if (_value instanceof Date) {
//                 addParams(key, _value)
//             }
//             break;
//         }
//         case 'in':
//         case 'notIn':
//             handleInOperations(
//                 key,
//                 value.split(',').map(_ => new Date(isNumeric(_) ? parseInt(_) : _)).filter(_ => _ instanceof Date),
//                 addParams,
//                 addError,
//                 "'Thu Aug 17 2023 00:33:24 GMT+0300' or '1692221629651'");    
//         default: 
//             handleUnknownParamsError(key, addError)
//             break;
//     }
  
// }


// export function parceIncludeOption(value: string, addError: anyFunction) {
//     // const methodError: MethodError[] = [];
//     const option: { [x: string]: any } = {};
//     const data = value.split('_').slice(1).map(_ => _.split(';').map(e => e.split(':')))[0];
    
//     if (data) {
//         data.forEach(item => {
//             handleIncludeOptionItem(item, option, addError);
//         });
//     }
    
//     return { data: option };
// }


// type parceIncludeParams = <T extends { [k:string]: any }>(value: string, includeElemSelectParams: T, addError: anyFunction, checkForErrors: () => boolean) => any
// export function parceIncludeParams(...arg: Parameters<parceIncludeParams>) {
//     const [value, key, addError, checkForErrors] = arg
//     const _value = value.split(',')
//     const elemRelationKey = Object.keys(key) as (keyof typeof key)[]
//     let includeParams = {}

//     _value.forEach(str => {
//         const keyElem = elemRelationKey.find(key => str.startsWith(key as string));
//         if (!keyElem) return handleUnknownOperatorError(str, addError)

//         const otherOption = parceIncludeOption(str, addError);
//         if (checkForErrors()) return

//         includeParams = { ...includeParams, [keyElem]: { ...key[keyElem], ...otherOption.data } };
//     });

//     return { data: includeParams }
// }

// type parceOrderByParams = (value: string, propArr: (string | number | Date)[], addError: anyFunction) => any
// export function parceOrderByParams(...arg: Parameters<parceOrderByParams>) {

//     const [value, propArr, addError] = arg
//     const orderByParams: { [k: string]: any } = {}
//     const data = value.split(';').map(_ => _.split(':'))

//     data.forEach(item => {
//         if (item.length !== 2) return handleInvalidParamsError(item.join(' '), addError, "'id:asc' or 'id:asc;name:desc'");
            
//         const [key, value] = item;

//         if (!propArr.includes(key)) return handleUnknownPropertyError(key, addError, propArr.join(','))
//         if (!sortOrder.includes(value as SortOrder)) return handleUnknownValuesError(value, addError, sortOrder.join(','))
        
//         orderByParams[key] = value
//     });

//     return { data: orderByParams }
// }




// type ParseOtherArgs = 'take' | 'skip'
// const parseOtherArgsArr: ParseOtherArgs[] = ['take','skip']

// type parseOtherArgs = (key: ParseOtherArgs, value: string, addError: anyFunction) =>any
// export function parseOtherArgs(...arg: Parameters<parseOtherArgs>) {
//     const [key, value, addError] = arg
//     const otherParams: { [k: string]: any } = {}
    
//     if (!parseOtherArgsArr.includes(key)) return handleUnknownPropertyError(key addError, parseOtherArgsArr.join(','))
    
//     const resChe = checkStrBoolean(value)
//     const _value = resChe && isNumeric(value) ? parseInt(value as string) : undefined
//     otherParams[key] = _value
   
//     return { data: otherParams }
// }



// type parseSearchParams<T extends string, K extends string> = { OR: { [P in T]: { [L in K ]: string } }[] }
// export function parseSearchParams<T extends string>(value:string, propNameForSearch: T[]): parseSearchParams<T, keyof Required<Pick<Prisma.StringFilter, 'contains'|'mode'>>>  {
//     const _value = propNameForSearch.map(_ => ({ [_]: { contains: value,  mode: 'insensitive', }}))
//     return { OR: _value as never }
// }



// type HandlerParams = (
//     INT_KEY: string[],
//     STRING_KEY: string[],
//     DATE_KEY: string[],
//     key: string,
//     value: string,
//     addParams: (key: string, value: any) => void,
//     addError: (mes: MethodError) => void,
//     checkForErrors: () => boolean
// ) => any
// type HandlerParamsParams = Parameters<HandlerParams>
// type HandlerParamsParamsBasic = [HandlerParamsParams[3],HandlerParamsParams[4],HandlerParamsParams[5],HandlerParamsParams[6],HandlerParamsParams[7]]

// function handleCheckedError(res: { error: MethodError[]; }, addError: anyFunction, checkForErrors: () => boolean) {
//     if (res.error.length) {
//         res.error.forEach((err) => addError(err));
//     }
//     return checkForErrors()
// }


// function handleIntProperty(...arg: HandlerParamsParamsBasic) {
//     const [key, value, addParams, addError, checkForErrors] = arg
//     const res = getWhereParamsCons(value, getWhereParamsForInt);

//     if (handleCheckedError(res, addError, checkForErrors)) return

//     addParams('where', { [key]: res.data === value ? Number(res.data) : res.data });
// }

// function handleStringProperty(...arg: HandlerParamsParamsBasic) {
//     const [key, value, addParams, addError, checkForErrors] = arg
//     const res = getWhereParamsCons(value, getWhereParamsForString);

//     if (handleCheckedError(res, addError, checkForErrors)) return

//     addParams('where', { [key]: res.data });
// }

// function handleDateProperty(...arg: HandlerParamsParamsBasic) {
//     const [key, value, addParams, addError, checkForErrors] = arg
//     const res = getWhereParamsCons(value, getWhereParamsForDate);

//     if (handleCheckedError(res, addError, checkForErrors)) return

//     addParams('where', { [key]: res.data === value ? new Date(parseInt(res.data)) : res.data });
// }

// function handleCharacteristicProperty(...arg: [HandlerParamsParams[3],HandlerParamsParams[4],HandlerParamsParams[5]]) {
//     const [key, value, addParams] = arg

//     const name = key.replace('chr-', '').split('_').join(" ");
//     const arrValue = value.split(',').map((val) => ({
//         characteristic: { some: { content: { some: { name: name, value: { contains: val.split('__').join(' '), 'mode': 'insensitive' } } } } }
//     }));
//     addParams('where', { OR: arrValue });
// }

// function handleUnknownProperty(...arg: HandlerParamsParamsBasic) {
//     const [key, value, addParams, addError] = arg
//     if (key.startsWith('chr-')) {
//         handleCharacteristicProperty(key, value, addParams);
//     } else {
//         handleUnknownOperatorError(key, addError)
//     }
// }

// export function handleDefaultCase<T extends string>(...arg: HandlerParamsParams) {
//     const [INT,STRING, DATE, key, value, addParams, addError, checkForErrors] = arg
//     if (INT.includes(key as T)) {
//         handleIntProperty(key, value, addParams, addError, checkForErrors);
//     } else if (STRING.includes(key as T)) {
//         handleStringProperty(key, value, addParams, addError, checkForErrors);
//     } else if (DATE.includes(key as T)) {
//         handleDateProperty(key, value, addParams, addError, checkForErrors);
//     } else {
//         handleUnknownProperty(key, value, addParams, addError, checkForErrors);
//     }
// }

// export function handleUniqueCase(query: { [k: string]: any }) {
//     const findParams = {
//         where: { id: 0 },
//         select: undefined
//     }
//     for (const key in query) {
//         if (Object.prototype.hasOwnProperty.call(query, key)) {
//             const value = query[key];
//             switch (key) {
//                 case 'id':{
//                     if (!isNumeric(value)) return handleInvalidValueError(value, addError, '45')

//                     findParams.where.id = parseInt(value as string) as never
//                     break;
//                 }
//                 case 'fullinfo': 
//                     findParams.select = MODEL_DATA.FULL_KEY as never
//                     break;
//                 default: 
//                     return handleUnknownOperatorError(key, addError)
//             }
//         }
//     }
//     return { params: findParams, error: methodError, unique: true }
// }

// export interface MODEL_DATA {
//     FULL_KEY: { [k:string]: any },
//     INT_KEY: string[],
//     STRING_KEY: string[],
//     DATE_KEY: string[],
//     RELATION_KEY: string[],
//     ORDERBY_KEY: string[],
//     RELATION_SELECT: { [k:string]: string } 
// }

// export type initFindParams = (
//     key: string,
//     value: string,
//     addParams: (key: "include" | "where" | "orderBy" | "take" | "skip", value: any) => any,
//     addError: (mes: MethodError) => any,
//     checkForErrors: () => boolean,
// ) => any

// interface FindParams {
//     where: { [key: string]: any },
//     select?: { [key: string]: any },
//     take?: number,
//     skip?: number,
//     orderBy?: { [key: string]: 'asc' | 'desc' },
//     include?: { [key: string]: boolean }
// }

// export function handleQueryParams(
//     query: { [k: string]: string },
//     handleParceFullParams: initFindParams,
//     MODEL_DATA: MODEL_DATA
// ): { params: FindParams, error: MethodError[], unique: boolean } {

//     const methodError: MethodError[] = []
//     const addError = (data: MethodError) => methodError.push(data)
//     const checkForErrors = () => methodError.length > 0
    
//     if ('unique' in query) {
        
//     } else {
//         const findParams = {
//             where: { 'AND': [] },
//             take: 12,
//             skip: 0,
//             orderBy: {},
//             include: Object.fromEntries(MODEL_DATA.RELATION_KEY.map(_ => [_, false])) 
                
//         }
       
//         function addParams(key: keyof FindParams, value: any) {
//             if (Object.keys(findParams).includes(key)) {
//                 if (key === 'where') {
//                     findParams.where.AND.push(value)
//                 } else {
//                     findParams[key] = value
//                 }
//             }
//         }
    
//         for (const key in query) {
//             if (Object.prototype.hasOwnProperty.call(query, key)) {
//                 const value = query[key];
//                 handleParceFullParams(key, value, addParams, addError, checkForErrors)
//             }
//         }
//         return { params: findParams, error: methodError, unique: false }
//     }
// }





//  эта функция нужна для получение данных о модели на фронте, какие доступны свойтсва у модели для для запроса
// свойтсва отсортированы по типу: Int, String, Date, Relation(связи с другими моделями)
export function INIT_MODEL_DATA<T extends Prisma.ModelName>(
    key: INIT_MODEL_PROPERTY<T>['key'],
    propRelation: Array<INIT_MODEL_PROPERTY<T>['propRelation']>,
    propDateTime: Array<INIT_MODEL_PROPERTY<T>['propDateTime']>,
    propInt: Array<INIT_MODEL_PROPERTY<T>['propInt']>,
    propStr: Array<INIT_MODEL_PROPERTY<T>['propStr']>,
    propElem: Array<INIT_MODEL_PROPERTY<T>['propElem']>,
): {
    key: typeof key,
    keyWork: INIT_MODEL_PROPERTY<T>['keyWork'],
    propElem: typeof propElem
    propInt: typeof propInt,
    propStr: typeof propStr,
    propDateTime: typeof propDateTime,
    propRelation: typeof propRelation
} 
{
    const keyWork = key.charAt(0).toUpperCase() + key.slice(1) as Uncapitalize<T>
    return { key, keyWork, propElem, propInt, propStr, propDateTime, propRelation }
}


export function checkValidImageData<T extends { link: string, main: boolean }>(data: T | T[]): boolean  {
    let res
    if (Array.isArray(data)) {
        const findRes = data.find(_ => !('link' in _ && 'main' in _ && isString(_.link) && isBoolean(_.main)))
        res = (findRes ? false : data.find(_ => _.main === true ? true : false))
        
    } else {
        res = ('link' in data && 'main' in data && isString(data.link) && isBoolean(data.main) && data.main === true)
    }
    return res ? true : false
}

export const RelationProp = {
    create: undefined,
    connectOrCreate: undefined,
    connect: undefined
}

export function initRelationData<T extends string>(data: T[]): { [P in T]: typeof RelationProp } {
    return Object.fromEntries(data.map(_=> [_,{ ...RelationProp}])) as { [P in T]: typeof RelationProp }
}

const res = initRelationData(['auu', 'asf', 'asf'])
