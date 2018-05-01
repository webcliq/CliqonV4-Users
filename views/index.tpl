@include('partials/header.tpl')
</head>
<style>
.circle-text {
display: table-cell;
height: 60px; /*change this and the width for the size of your initial circle*/
width: 60px;
text-align: center;
vertical-align: middle;
border-radius: 50%;
background: #000;
color: #fff;
font: 42px "josefin sans", arial; /*change this for font-size and font-family*/
}
</style>
<body class="text-center">

    @include('partials/nav.tpl')

    <main role="main" class="container" id="tplcontent">

      <div class="">
      	<div class="row"><span class="circle-text">es</span>&nbsp;<span class="circle-text">en</span></div>
        <h1>Cliqon User Management Template</h1>
        <p class="lead">This is a demonstration template for the front end User management routines that would be used for Visitors, Users and Contacts</p>
      </div>

    </main><!-- /.container -->

    @include('partials/script.tpl')

</body>
</html>