import * as codepipeline from '@aws-cdk/aws-codepipeline';
import * as codepipeline_actions from '@aws-cdk/aws-codepipeline-actions';
import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CdkPipeline, SimpleSynthAction } from "@aws-cdk/pipelines";
import { ServiceCatalogStack} from './service-catalog-stack';
import { ShellScriptAction } from '@aws-cdk/pipelines';

export class SmartFactoryStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, 'Pipeline', {
      // The pipeline name
      pipelineName: 'SFAppPipeline',
      cloudAssemblyArtifact,

      // Where the source can be found
      sourceAction: new codepipeline_actions.GitHubSourceAction({
      actionName: 'GitHub',
      output: sourceArtifact,
      oauthToken: SecretValue.secretsManager('GITHUB_TOKEN'),
      owner: 'deb82banerjee',
      repo: 'SmartFactory',
      branch: 'main'
    }),

    // How it will be built and synthesized
    synthAction: SimpleSynthAction.standardNpmSynth({
      sourceArtifact,
      cloudAssemblyArtifact,
      
      // We need a build step to compile the TypeScript Lambda
      buildCommand: 'npm run build'
    }),
 });
 pipeline.addApplicationStage(new ServiceCatalogStack(this, 'MyServiceCatalog'));
  }
}
