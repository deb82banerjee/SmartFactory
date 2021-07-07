import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as SmartFactory from '../lib/smart-factory-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new SmartFactory.SmartFactoryStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
