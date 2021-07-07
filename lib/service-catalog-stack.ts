import * as cdk from '@aws-cdk/core';
import * as servicecatalog from '@aws-cdk/aws-servicecatalog';
import { Asset } from '@aws-cdk/aws-s3-assets';
import { SimpleProductTemplate } from './simple-s3-stack'

import { getProductTemplate } from './product-builder';

export class ServiceCatalogStack extends cdk.Construct {
  private readonly portfolio: servicecatalog.CfnPortfolio;
  private readonly product: servicecatalog.CfnCloudFormationProduct;

  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const template = getProductTemplate(SimpleProductTemplate);

    const asset = new Asset(this, 'ServiceCatalogProductAsset', {
      path: template.templatePath
    });

    this.portfolio = new servicecatalog.CfnPortfolio(this,'ServiceCatalogPortfolio', {
        displayName: 'ServiceCatalogPortfolio_DisplayName',
        providerName: 'ServiceCatalogPortfolio_ProviderName'});

    new servicecatalog.CfnPortfolioPrincipalAssociation(this, 'PortfolioPrincipal', {
        principalArn: 'arn:aws:iam::330255137460:group/Admins',
        portfolioId: this.portfolio.ref,
        principalType: 'IAM'});
    new servicecatalog.CfnPortfolioPrincipalAssociation(this, 'PortfolioAdminPrincipal', {
      principalArn: 'arn:aws:iam::330255137460:group/Admins',
      portfolioId: this.portfolio.ref,
      principalType: 'IAM'
    });

    this.product = new servicecatalog.CfnCloudFormationProduct(this, 's3-product', {
      name: 'Simple S3 Product',
      description: 'This is an s3 product',
      owner: 'whoever',
      provisioningArtifactParameters: [
        {
          description: 'Product template description',
          name: '1.0',
          info: {
            LoadTemplateFromURL: asset.s3Url
          }
        }
      ]
    });

    new servicecatalog.CfnPortfolioProductAssociation(this, 'ServiceCatalogAssociation', {
      portfolioId: this.portfolio.ref,
      productId: this.product.ref
    });

  }
}