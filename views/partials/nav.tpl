<!-- Nav.Tpl  -->

<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand redc" href="#"><img src="@($viewpath)img/logo.png" style="height: 50px;" title="Cliqon" /></a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        
        <ul class="navbar-nav mr-auto">
            
            <li class="nav-item active">
                <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>

            <li class="nav-item">
                <a class="nav-link menubutton" data-action="displayusers" href="#">Users</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdown01" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Actions</a>
                <div class="dropdown-menu" aria-labelledby="dropdown01">
                    <a class="dropdown-item menubutton" data-action="displaylogin" href="#">Login</a>
                    <a class="dropdown-item menubutton" data-action="displayregister" href="#">Register User</a>
                    <a class="dropdown-item menubutton" data-action="displayactivate" href="#">Reactivate User</a>
                    <a class="dropdown-item menubutton" data-action="forgotpassword" href="#">Forgotten Password</a>
                    <a class="dropdown-item menubutton" data-action="testemail" href="#">Test email</a>
                </div>
            </li>

            <li class="nav-item">
                <a class="nav-link menubutton" data-action="displayadmin" href="#">Administration</a>
            </li>
        </ul>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle capitalize" href="#" id="dropdown02" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">User</a>
                <div class="dropdown-menu left" aria-labelledby="dropdown02" style="margin-left: -100px;">
                    <a class="dropdown-item menubutton" data-action="displayprofile" href="#">Profile</a>
                    <a class="dropdown-item menubutton" data-action="changepassword" href="#">Change Password</a>
                    <a class="dropdown-item menubutton" data-action="logout" href="#">Logout</a>
                </div>
            </li>
        </ul>
    </div>
</nav>