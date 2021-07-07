#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { SmartFactoryStack } from '../lib/smart-factory-stack';

const app = new cdk.App();
new SmartFactoryStack(app, 'SmartFactoryStack', {
  env:{
    account: "330255137460",
    region: "us-east-2"
  }
});
