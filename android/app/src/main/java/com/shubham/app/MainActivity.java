package com.shubham.app;

import android.Manifest;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
     private static final int LOCATION_PERMISSION_REQUEST_CODE = 1001;

     @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        checkAndRequestPermissions();
    }

    private boolean checkAndRequestPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(this, Manifest.permission.ACCESS_COARSE_LOCATION) != PackageManager.PERMISSION_GRANTED ||
                ContextCompat.checkSelfPermission(this, Manifest.permission.FOREGROUND_SERVICE) != PackageManager.PERMISSION_GRANTED) {

                ActivityCompat.requestPermissions(this, new String[]{
                        Manifest.permission.ACCESS_FINE_LOCATION,
                        Manifest.permission.ACCESS_COARSE_LOCATION,
                        Manifest.permission.FOREGROUND_SERVICE,
                        Manifest.permission.FOREGROUND_SERVICE_LOCATION
                }, LOCATION_PERMISSION_REQUEST_CODE);

                return false; // Permissions not granted yet
            }
        }
        return true; // Permissions already granted
    }

//      @Override
// public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
//     super.onRequestPermissionsResult(requestCode, permissions, grantResults);
//     if (requestCode == LOCATION_PERMISSION_REQUEST_CODE) {
//         if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
//             startBackgroundService();
//         }
//     }
// }
}
