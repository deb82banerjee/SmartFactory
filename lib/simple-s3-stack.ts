import * as cdk from '@aws-cdk/core';
import * as s3 from '@aws-cdk/aws-s3';
import { ProductTemplate } from "./product-builder";

export class SimpleBucketStack extends cdk.Stack {
    public readonly s3Bucket: s3.Bucket;

    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        this.s3Bucket = new s3.Bucket(this, 'MyBucket', {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
    }
}

export const SimpleProductTemplate: ProductTemplate = {
    stack: SimpleBucketStack,
    name: 'S3Product'
};