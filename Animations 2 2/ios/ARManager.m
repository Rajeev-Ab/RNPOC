//
//  ARManager.m
//  Animations
//
//  Created by Rajeev on 24/01/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "ARManager.h"
#import "AppDelegate.h"
#import "ARViewController.h"
#define SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(v)  ([[[UIDevice currentDevice] systemVersion] compare:v options:NSNumericSearch] != NSOrderedAscending)
@implementation ARManager
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(showARKit) {
  
  if (SYSTEM_VERSION_GREATER_THAN_OR_EQUAL_TO(@"11.0")) {
    // code here
    dispatch_async(dispatch_get_main_queue(), ^{
      AppDelegate* appDelegate = (AppDelegate*) [UIApplication sharedApplication].delegate;
      ARViewController* controller = [[ARViewController alloc] init];
      [appDelegate.window.rootViewController presentViewController:controller animated:false completion:nil];
    });
  }
  
}
@end
