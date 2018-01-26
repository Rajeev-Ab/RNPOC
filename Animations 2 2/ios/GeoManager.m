//
//  GeoManager.m
//  Animations
//
//  Created by Rajeev on 24/01/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "GeoManager.h"
#import <Foundation/Foundation.h>
#import <CoreLocation/CoreLocation.h>


@interface GeoManager()<CLLocationManagerDelegate>
@property(nonatomic,retain)CLLocationManager* locationManager;
@property(nonatomic,retain)NSArray* geofenceArray;
@property(nonatomic,assign)int radius;
@end

@implementation GeoManager
RCT_EXPORT_MODULE()


RCT_EXPORT_METHOD(populateGeofenceList:(NSArray*)geofenceArray radius:(int)radius){
  self.geofenceArray = geofenceArray;
  self.radius = radius;
}
RCT_EXPORT_METHOD(stopGeofencing){
  
  for (int index = 0 ; index < [self.geofenceArray count]-1;index++) {
    NSDictionary* location = [self.geofenceArray objectAtIndex:index];
    int key = (int) [location objectForKey:@"key"];
    CLLocationDegrees lattiude = [[location objectForKey:@"latitude"] doubleValue];
    CLLocationDegrees longitude = [[location objectForKey:@"longitude"] doubleValue];
    
    CLLocationCoordinate2D center = CLLocationCoordinate2DMake(lattiude,
                                                               longitude);
    CLRegion *region = [[CLCircularRegion alloc]initWithCenter:center
                                                        radius:self.radius
                                                    identifier:[NSString stringWithFormat:@"%d",key]];
    
    [self.locationManager stopMonitoringForRegion:region];
  }
  
}
RCT_EXPORT_METHOD(beginGeofencing){
  
  if ( self.locationManager == nil){
  self.locationManager = [CLLocationManager new];
  }
  self.locationManager.delegate = self;
  if ([self.locationManager respondsToSelector:@selector(requestAlwaysAuthorization)]) {
    [self.locationManager requestAlwaysAuthorization];
  } else {
    [self setUpGeofences];
  }
}
-(void)setUpGeofences{
 // CGFloat lattitude = [[geofenceArray objectAtIndex:0] objectAtIndex:@"latitude"];
  
  for (int index = 0 ; index < [self.geofenceArray count]-1;index++) {
    NSDictionary* location = [self.geofenceArray objectAtIndex:index];
    int key = (int) [location objectForKey:@"key"];
    CLLocationDegrees lattiude = [[location objectForKey:@"latitude"] doubleValue];
    CLLocationDegrees longitude = [[location objectForKey:@"longitude"] doubleValue];
    
    CLLocationCoordinate2D center = CLLocationCoordinate2DMake(lattiude,
                                                               longitude);
    CLRegion *region = [[CLCircularRegion alloc]initWithCenter:center
                                                        radius:self.radius
                                                    identifier:[NSString stringWithFormat:@"%d",key]];
  
    [self.locationManager startMonitoringForRegion:region];
  }
  

  
 
}
#pragma MARK:- CLLOcationManager Delegate
- (void)locationManager:(CLLocationManager *)manager
didStartMonitoringForRegion:(CLRegion *)region{
  
}
-(void)locationManager:(CLLocationManager *)manager didFailWithError:(NSError *)error{
  
}
-(void)locationManager:(CLLocationManager *)manager didEnterRegion:(CLRegion *)region{
  
  UILocalNotification* localNotification = [[UILocalNotification alloc] init];
  localNotification.fireDate = [NSDate date];
  localNotification.alertBody = @"Geofence Alert";
  localNotification.alertTitle = @"you enter in region";
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  localNotification.applicationIconBadgeNumber = [[UIApplication sharedApplication] applicationIconBadgeNumber] + 1;
  
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
  
}
-(void)locationManager:(CLLocationManager *)manager didExitRegion:(CLRegion *)region{
  UILocalNotification* localNotification = [[UILocalNotification alloc] init];
  localNotification.fireDate = [NSDate date];
  localNotification.alertBody = @"Geofence Alert";
  localNotification.alertTitle = @"you exited from region";
  localNotification.timeZone = [NSTimeZone defaultTimeZone];
  localNotification.applicationIconBadgeNumber = [[UIApplication sharedApplication] applicationIconBadgeNumber] + 1;
  
  [[UIApplication sharedApplication] scheduleLocalNotification:localNotification];
}
@end
