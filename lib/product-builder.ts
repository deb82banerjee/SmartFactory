import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import {Stack} from "@aws-cdk/core";

export type ProductTemplate = {
  stack: typeof Stack;
  name: string;
};

export const getProductTemplate = (product: ProductTemplate) => {
  const app = new cdk.App({
    runtimeInfo: false,
    stackTraces: false,
    treeMetadata: false
  });

  const defEnv = {
    env: {
      account: '330255137460',
      region: 'us-east-2'
    }
  };

  new product.stack(app, product.name, defEnv);

  const synth = app.synth();
  const template = synth.getStackArtifact(product.name).template;
  const templateDir = './templates';

  if (!existsSync(templateDir)) {
    mkdirSync(templateDir);
  }
  
  const templatePath = `${templateDir}/${product.name}.template.json`;
  writeFileSync(templatePath, JSON.stringify(template, null, 2));

  return {
    template,
    templatePath
  };
}