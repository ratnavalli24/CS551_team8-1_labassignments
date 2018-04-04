package com.example.sindhu.ase3;

import android.content.Intent;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.facebook.AccessToken;
import com.facebook.CallbackManager;
import com.facebook.FacebookCallback;
import com.facebook.FacebookException;
import com.facebook.login.LoginResult;
import com.facebook.login.widget.LoginButton;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FacebookAuthProvider;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

public class FacebookActivity extends AppCompatActivity {

    private CallbackManager mCallbackManager;

    private FirebaseAuth mAuth;

    private static final String  TAG = "FACELOG";


    private EditText UserName;
    private EditText Pass;
    private Button Login;
    private TextView Register;
    private int counter = 5;

    @Override
    protected void onCreate(Bundle savedInstanceState) {



        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_facebook);



        UserName = (EditText)findViewById(R.id.etuname);
        Pass = (EditText)findViewById(R.id.etpasswrd);
        Login = (Button) findViewById(R.id.bSignin);
        Register =(TextView)findViewById(R.id.etreg);


        Login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                validate(UserName.getText().toString(), Pass.getText().toString());
            }
        });
                    Register.setOnClickListener(new View.OnClickListener() {
                        @Override
                        public void onClick(View view) {
                            Intent registerIntent=new Intent(FacebookActivity.this,RegisterActivity.class);
                            FacebookActivity.this.startActivity(registerIntent);
                        }
                    });


        mAuth = FirebaseAuth.getInstance();


        mCallbackManager = CallbackManager.Factory.create();
        LoginButton loginButton = findViewById(R.id.login_button);
        loginButton.setReadPermissions("email", "public_profile");
        loginButton.registerCallback(mCallbackManager, new FacebookCallback<LoginResult>() {
            @Override
            public void onSuccess(LoginResult loginResult) {
                Log.d(TAG, "facebook:onSuccess:" + loginResult);
                handleFacebookAccessToken(loginResult.getAccessToken());
            }

            @Override
            public void onCancel() {
                Log.d(TAG, "facebook:onCancel");
                // ...
            }

            @Override
            public void onError(FacebookException error) {
                Log.d(TAG, "facebook:onError", error);
                // ...
            }
        });

// ...


    }
    private void validate(String userUsername, String userPassword){
        if((userUsername.equals("Sindhu")) && (userPassword.equals("1234"))){
            Intent intent = new Intent(FacebookActivity.this, GFirebaseActivity.class);
            startActivity(intent);
        }else {
            counter--;

            if(counter==0){
                Login.setEnabled(false);
            }
        }
    }
    @Override
    public void onStart() {
        super.onStart();

        FirebaseUser currentUser = mAuth.getCurrentUser();

        if(currentUser != null) {
            updateUI();
        }
    }

    private void updateUI() {

        Toast.makeText(FacebookActivity.this, "You are Logged in", Toast.LENGTH_LONG).show();

        Intent accountIntent = new Intent(FacebookActivity.this, GFirebaseActivity.class);
        startActivity(accountIntent);
        finish();
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);


        mCallbackManager.onActivityResult(requestCode, resultCode, data);
    }

    private void handleFacebookAccessToken(AccessToken token) {
        Log.d(TAG, "handleFacebookAccessToken:" + token);

        AuthCredential credential = FacebookAuthProvider.getCredential(token.getToken());
        mAuth.signInWithCredential(credential)
                .addOnCompleteListener(this, new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {

                            Log.d(TAG, "signInWithCredential:success");
                            FirebaseUser user = mAuth.getCurrentUser();

                            updateUI();
                        } else {

                            Log.w(TAG, "signInWithCredential:failure", task.getException());
                            Toast.makeText(FacebookActivity.this, "Authentication failed.",
                                    Toast.LENGTH_SHORT).show();

                            updateUI();
                        }

                        // ...
                    }
                });
    }


}
