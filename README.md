# thingsboard-download
Download button for community edition Thingsboard tables and charts

Written by Mark Stanley, October 2022

## Purpose
Adds a "Download" button to a Thingsboard time series widget, which allows you to save table data as a csv file on your computer.

## How to use
The code in action.js has been written as a custom action for use in a Thingsboard community edition widget.
You can use it to create a Download button for say a time-series table widget.  
You do this by creating a custom action in the widget - I suggest a widget header button, and the download or share icon.
Review and if you are happy with how it works, paste the code in action.js into the custom action text box.

## What the end-user should see
Now when you view the widget in the dashboard you should see your new icon.
If you click the icon it will generate a .csv file of the data in the table and download it via the browser.

## Support
No support and no guarantee of it working is offered.  If you want to suggest improvements, please do so by raising an issue.
If you want to improve the code yourself - brilliant! 

## Known limitations
* Only tested with time-series table Card widget, and time-series charts.
* Works for a table with a single entity, with a single device, and 1 or more fields.  For example it works nicely with a single weather station that shows temperature, humidity, air pressure, sunlight, rainfall, etc.  However it will not work in a table comparing the temperature of 2 or more sensors.
