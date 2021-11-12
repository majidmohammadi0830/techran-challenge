export const nameof = <T>(name: keyof T) => name;
export const hasValue = (val: any) => val != undefined || val != null;
export const capitalizeFirstLetter = (val: string) => val.charAt(0).toUpperCase() + val.slice(1);