<!-- Register.Tpl  -->
<h2 class="">Register</h2>

<form id="dataform">

    <input type="hidden" v-model="row.c_type" />
    <input type="hidden" v-model="row.id" />
    <input type="hidden" v-model="row.c_level" />
    <input type="hidden" v-model="row.c_status" />
    <input type="hidden" v-model="row.c_group" />
    <input type="hidden" v-model="row.d_langcd" />
    <input type="hidden" v-model="row.d_avatar" />

    <div class="form-row">
        <div class="form-group col-md-4">
            <label for="d_firstname">First name</label>
            <input type="text" id=d_firstname" class="form-control" placeholder="" v-model="row.d_firstname" required autofocus>
        </div>
        <div class="form-group col-md-4">
            <label for="d_midname">Middle name</label>
            <input type="text" id="d_midname" class="form-control" placeholder="" v-model="row.d_midname">
        </div>
        <div class="form-group col-md-4">
            <label for="d_lastname">Last name</label>
            <input type="text" id="d_lastname" class="form-control" placeholder="" v-model="row.d_lastname" required>
        </div>
    </div>

    <div class="form-row">
        <div class="form-group col-md-2">
            <label for="c_username">Username</label>
            <input type="text" id="c_username" class="form-control isunique" placeholder="" v-model="row.c_username" required>
        </div>
        <div class="form-group col-md-6">
            <label for="c_email">Email</label>
            <input type="email" id="c_email" class="form-control isunique" placeholder="" v-model="row.c_email">
        </div>
    </div>

    <div class="form-row" v-if="row.id == 0">
        <div class="form-group col-md-3">
            <label for="c_password_confirm">Password</label>
            <input type="password" id="c_password_confirm" class="form-control" placeholder="**********" required>
        </div>
        <div class="form-group col-md-3">
            <label for="c_password">Confirm</label>
            <input type="password" id="c_password" class="form-control" placeholder="**********" v-model="row.c_password">
        </div>
    </div>

    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="d_addr1">Address</label>
            <input type="text" id="d_addr1" class="form-control" placeholder="Line 1" v-model="row.d_addr1" required>
        </div>
        <div class="form-group col-md-6">
            <label for="d_addr2">Line 2</label>
            <input type="text" id="d_addr2" class="form-control" placeholder="Line 2" v-model="row.d_addr2">
        </div>
    </div>

    <div class="form-row">
        <div class="form-group col-md-2">
            <label for="d_postcode">Post Code</label>
            <input type="text" id="d_postcode" class="form-control" placeholder="" v-model="row.d_postcode" required>
        </div>
        <div class="form-group col-md-4">
            <label for="">Town or City</label>
            <input type="text" id="d_city" class="form-control" placeholder="" v-model="row.d_city" required>
        </div>
        <div class="form-group col-md-3">
            <label for="d_region">Region</label>
            <input type="text" id="d_region" class="form-control" placeholder="" v-model="row.d_region" required>
        </div>
        <div class="form-group col-md-3">
            <label for="d_country">Country</label>
            <input type="text" id="d_country" class="form-control" placeholder="" v-model="row.d_country" required>
        </div>
    </div>

    <div class="form-group">
        <label for="d_comments">Comments</label>
        <textarea id="d_comments" class="form-control" placeholder="" v-model="row.d_comments"></textarea>
    </div>  

    <!-- If - Else on whether Insert or Update  -->
    <button v-if="row.id == 0" type="button" class="btn btn-primary" v-on:click="submitbutton">Register</button>
    <button v-else type="button" class="btn btn-primary" v-on:click="submitbutton">Update</button>
    <!-- End if Else  -->
    <button type="button" class="btn btn-success" v-on:click="previewbutton">Preview</button>
    <button type="button" class="btn btn-danger" v-on:click="resetbutton">Clear</button>
</form>