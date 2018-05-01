<!-- Profile.Tpl  -->
<h2 class="">User profile</h2>

<div id="clqtable" class="clqtable">

	<div class="clqtable-row pad">
		<div class="clqtable-hdrlabel">Description</div>
		<div class="clqtable-hdrlabel">Value</div>
	</div>

	<div class="clqtable-row pad">
		<div class="clqtable-label">User name</div>
		<div class="clqtable-cell">{{usr.c_username}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Full name</div>
		<div class="clqtable-cell">{{fullName}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Email</div>
		<div class="clqtable-cell">{{usr.c_email}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Group</div>
		<div class="clqtable-cell">{{usr.c_group}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Status</div>
		<div class="clqtable-cell">{{usr.c_status}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Address</div>
		<div class="clqtable-cell">{{fullAddress}}</div>
	</div>	

	<div class="clqtable-row pad">
		<div class="clqtable-label">Comments</div>
		<div class="clqtable-cell">{{usr.d_comments}}</div>
	</div>	
</div>