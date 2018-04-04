package com.example.sindhu.ase3;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.util.SparseArray;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;

import com.google.android.gms.vision.Frame;
import com.google.android.gms.vision.text.TextBlock;
import com.google.android.gms.vision.text.TextRecognizer;
import com.google.firebase.database.DataSnapshot;
import com.google.firebase.database.DatabaseError;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.database.ValueEventListener;

public class GFirebaseActivity extends AppCompatActivity {

    private Button Logout;

    private TextView MsgTxt;
    ImageView imageView;
    Button btnProcess;
    TextView txtResult;

    private FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
    private DatabaseReference mRootReference = firebaseDatabase.getReference();
    private DatabaseReference mchildReference = mRootReference.child("message");



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_gfirebase);

        imageView = (ImageView)findViewById(R.id.image_view);
        btnProcess = (Button)findViewById(R.id.button_process);
        txtResult = (TextView)findViewById(R.id.textview_result);
        final Bitmap bitmap = BitmapFactory.decodeResource(
                getApplicationContext().getResources(),
                R.drawable.text_recognition
        );
        imageView.setImageBitmap(bitmap);
        btnProcess.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                TextRecognizer textRecognizer = new TextRecognizer.Builder(getApplicationContext()).build();
                if (!textRecognizer.isOperational())
                    Log.e("ERROR", "Detector dependencies are not yet availble");
                else {
                    Frame frame = new Frame.Builder().setBitmap(bitmap).build();
                    SparseArray<TextBlock> items = textRecognizer.detect(frame);
                    StringBuilder stringBuilder = new StringBuilder();
                    for (int i = 0; i < items.size(); ++i) {
                        TextBlock item = items.valueAt(i);
                        stringBuilder.append("\n");
                    }
                    txtResult.setText(stringBuilder.toString());
                }
            }
        });
        MsgTxt = (TextView)findViewById(R.id.firebase_text);
        MsgTxt.setText("Message appear Here...");

        Logout = (Button) findViewById(R.id.lpLogout);

        Logout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                startActivity(new Intent(GFirebaseActivity.this, FacebookActivity.class));

            }
        });

    }

    @Override
    protected void onStart() {
        super.onStart();

        mchildReference.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {

                String message = dataSnapshot.getValue(String.class);
                MsgTxt.setText(message);

            }

            @Override
            public void onCancelled(DatabaseError databaseError) {

            }
        });
    }

}