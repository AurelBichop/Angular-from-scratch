export type ProviderMetadata = {
    /**
     * Name Service
     */
    provide: string;

    /**
     * Function return an instance of service
     */
    construct: Function;
}
export type ProvidersMetadata = ProviderMetadata[];

export type ServiceInstance = {
    /**
     * Name of the service we contain
     */
    name: string;

    /**
     * Instance of services
     */
    instance: any;
};
export type ServicesInstances = ServiceInstance[];

export type Module = {
    /**
     * Array that must contain the classes of my directives
     */
    declarations: any[];

    /**
     * Array that contains the service definitions for my directives
     */
    providers?: ProvidersMetadata
}

export type DirectiveMetadata = {
    /**
     * css selector that explains the elements to select for the directives
     */
    selector: string;

    /**
     * Lists of providers that the directive specifies
     */
    providers?: ProvidersMetadata;

}