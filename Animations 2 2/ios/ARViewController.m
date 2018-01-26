//
//  ARViewController.m
//  Animations
//
//  Created by Rajeev on 24/01/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ARViewController.h"
#import <ARKit/ARKit.h>
@interface ARViewController ()
@property (weak, nonatomic) IBOutlet ARSCNView *sceneView;

@end

@implementation ARViewController

- (instancetype)init
{
  self = [super initWithNibName:@"ARViewController" bundle:nil];
  if (self != nil)
  {
    // Further initialization if needed
  }
  return self;
}

- (instancetype)initWithNibName:(NSString *)nibName bundle:(NSBundle *)bundle
{
  NSAssert(NO, @"Initialize with -init");
  return nil;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view from its nib.
  
  //self.sceneView.debugOptions = [ARSCNDebugOptions.showWorldOrigin, ARSCNDebugOptions.showFeaturePoints];
  if (@available(iOS 11.0, *)) {
    ARWorldTrackingConfiguration* configuration  = [[ARWorldTrackingConfiguration alloc] init];
    [self.sceneView.session runWithConfiguration:configuration];
    [self.sceneView setAutoenablesDefaultLighting:true];
  } else {
    // Fallback on earlier versions
  }
  
  
  
}
-(IBAction)closeARKit:(id)sender{
  [self dismissViewControllerAnimated:false completion:nil];
}

-(void)viewDidAppear:(BOOL)animated{
  [super viewDidAppear:animated];
  
  SCNNode* sun = [SCNNode nodeWithGeometry:[SCNSphere sphereWithRadius:0.35]];
  
  SCNNode*earthParent = [[SCNNode alloc] init];
  SCNNode*venusParent = [[SCNNode alloc] init];
  SCNNode*moonParent = [[SCNNode alloc] init];
  
  sun.geometry.firstMaterial.diffuse.contents = [UIImage imageNamed:@"Sun diffuse"];
  sun.position = SCNVector3Make(0, 0, -1);
  earthParent.position = SCNVector3Make(0, 0, -1);
  venusParent.position = SCNVector3Make(0, 0, -1);
  moonParent.position = SCNVector3Make(1.2, 0, 0);
  
  [self.sceneView.scene.rootNode addChildNode:sun];
  [self.sceneView.scene.rootNode addChildNode:earthParent];
  [self.sceneView.scene.rootNode addChildNode:venusParent];
  
  
  SCNNode* earth = [self planet:[SCNSphere sphereWithRadius:0.2] diffuse:[UIImage imageNamed:@"Earth day"] specular:[UIImage imageNamed:@"Earth Specular"] emission:[UIImage imageNamed:@"Earth Emission"] normal:[UIImage imageNamed:@"Earth Normal"] position:SCNVector3Make(1.2, 0, 0)];
  
  SCNNode* venus = [self planet:[SCNSphere sphereWithRadius:0.2] diffuse:[UIImage imageNamed:@"Venus Surface"] specular:nil emission:[UIImage imageNamed:@"Venus Atmosphere"] normal:nil position:SCNVector3Make(0.7, 0, 0)];
  
  SCNNode* moon = [self planet:[SCNSphere sphereWithRadius:0.1] diffuse:[UIImage imageNamed:@"moon Diffuse"] specular:nil emission:nil normal:nil position:SCNVector3Make(0, 0, -0.4)];
  
 
  SCNAction*sunAction = [self Rotation:8.0];
  SCNAction*earthParentRotation = [self Rotation:14.0];
  SCNAction*venusParentRotation = [self Rotation:10.0];
  SCNAction*earthRotation = [self Rotation:8.0];
  SCNAction*moonRotation = [self Rotation:8.0];
  SCNAction*venusRotation = [self Rotation:8.0];
   
  [earth runAction:earthRotation];
  [venus runAction:venusRotation];
  [earthParent runAction:earthParentRotation];
  [venusParent runAction:venusParentRotation];
  [moonParent runAction:moonRotation];
  
  [sun runAction:sunAction];
  [earthParent addChildNode:earth];
  [earthParent addChildNode:moonParent];
  
  [venusParent addChildNode:venus];
  [earth addChildNode:moon];
  [moonParent addChildNode:moon];
  }

-(SCNAction*)Rotation:(NSTimeInterval)time{
  CGFloat yRotation = [self DegreesToRadians:360.0];
  SCNAction* action = [SCNAction rotateByX:0 y:yRotation z:0 duration:time];
  return [SCNAction repeatActionForever:action];
}


-(SCNNode*)planet:(SCNGeometry*)geometry diffuse:(UIImage*)diffuse specular:(UIImage*)specular emission:(UIImage*)emission normal:(UIImage*)normal position:(SCNVector3)position{
  SCNNode* planet = [SCNNode nodeWithGeometry:geometry];
  planet.geometry.firstMaterial.diffuse.contents = diffuse;
   planet.geometry.firstMaterial.specular.contents = specular;
   planet.geometry.firstMaterial.emission.contents = emission;
   planet.geometry.firstMaterial.normal.contents = normal;
  
  planet.position = position;
  
  
  return planet;
}

-(CGFloat)DegreesToRadians:(CGFloat)degrees
{
  return degrees * M_PI / 180;
};



- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
