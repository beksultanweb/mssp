declare module '*.module.scss' {
    const classes: { readonly [key: string]: string };
    export default classes;
}

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';