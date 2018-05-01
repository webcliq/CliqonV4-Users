<!-- Login.Tpl  -->

<form class="form-signin" id="loginform">
    <img class="mb-4" src="@($viewpath)img/logo.png" alt="" height="100">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>

    <label for="username" class="sr-only">User name</label>
    <input type="text" class="form-control" name="username" id="username" placeholder="User name" required autofocus />

    <label for="password" class="sr-only">Password</label>
    <input type="password" class="form-control mt10" name="password" id="password" placeholder="Password" required />

    <label for="langcd" class="sr-only">Language</label>
    <select id="langcd" name="langcd" class="custom-select">
        @foreach($idioms as $lcdcode => $lcdname)
        <option value="@($lcdcode)" @if($idiom == $lcdcode) selected @endif class="" >@($lcdname)</option>
        @endforeach
    </select>
    
    <div class="checkbox mb-3 mt10">
        <label>
            <input type="checkbox" name="rememberme" value="remember-me"> Remember me
        </label>
    </div>

    <button class="btn btn-primary btn-block" id="loginbutton" type="button">Login</button>
    <button class="btn btn-danger btn-block" id="forgotpassword" type="button">Forgot Password</button>
    <button class="btn btn-warning btn-block" id="register" type="button">Register</button>
</form>