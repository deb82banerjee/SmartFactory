import {Stage, StageProps, Construct} from '@aws-cdk/core';
import { ServiceCatalogStack } from './service-catalog-stack';

export class SFDevStage extends Stage {
    constructor(scope: Construct, id: string){
        super(scope, id);
        new ServiceCatalogStack(scope, "ServiceCatalogProduct");
    }
}