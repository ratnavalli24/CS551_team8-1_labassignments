package com.example.sindhu.ase3;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

public class RegisterActivity extends AppCompatActivity {

    private EditText Name;
    private EditText Password;
    private EditText cpassword;
    private Button Register;
    private EditText age;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);

        Name = (EditText)findViewById(R.id.etname);
        Password = (EditText)findViewById(R.id.etpass);
        cpassword= (EditText) findViewById(R.id.etpassa);
        age= (EditText) findViewById(R.id.etage);
        Register=(Button) findViewById(R.id.breg);

        Register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent loginIntent=new Intent(RegisterActivity.this,FacebookActivity.class);
                startActivity(loginIntent);
            }
        });

    }
}
